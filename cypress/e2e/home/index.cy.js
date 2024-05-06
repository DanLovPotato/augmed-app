describe("Physicians can go to home screen with token", () => {
  const homeLink = "http://localhost:3000/";

  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", "mock_token");
    });
    cy.visit(homeLink);
  });

  it("displays loading state when cases are being fetched", () => {
    cy.get(".MuiCircularProgress-root").should("be.visible");
  });

  it("displays empty state when there are no cases", () => {
    cy.intercept("GET", "/api/cases", {
      statusCode: 200,
      fixture: "home/EmptyCaseList.json",
    });
    cy.contains(
      "There is no available task for you now. Please contact dhep.lab@gmail.com to get new tasks. Or try to refresh the page.",
    ).should("be.visible");
  });

  it("displays error state when there is an unexpected error", () => {
    cy.intercept("GET", "/api/cases", { statusCode: 500 }).as("getCaseList");
    cy.wait("@getCaseList");
    cy.contains("There is an unexpected error. Please check your internet and try again.").should("be.visible");
  });

  it("Physicians could access the home page viewing the pending cases.", () => {
    cy.intercept("GET", "/api/cases", {
      statusCode: 200,
      fixture: "home/ValidCaseList.json",
    });
    cy.contains("Case: 112022").should("be.visible");
    cy.get(".caseCard").should("have.length", 5);
  });
});
