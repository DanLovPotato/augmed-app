describe("User journey testing", () => {
  const loginLink = "http://localhost:3000/login";

  const test = {
    email: "user@example.com",
    password: "&2vVTx=J",
  };

  it("Login and review a case then submit the answer", () => {
    cy.intercept("POST", "/api/auth/login",
        {
          statusCode: 200,
          headers: {
            Authorization: `Bearer ${Math.random().toString(16)}`
          }
        }
    );
    cy.intercept("GET", "/api/cases", {
      statusCode: 200,
      fixture: "home/ValidCaseList.json",
    });

    cy.visit(loginLink);

    // Login
    cy.auth(test.email, test.password);
    cy.getByTestId("auth-submit-button").click();

    // Enter home page
    cy.url().should("include", "/");
    cy.contains("Case: 112022").should("be.visible");
    cy.get(".caseCard").should("have.length", 5);

    // Click first card
    cy.intercept("GET", "/api/case-reviews/1", {
      statusCode: 200,
      fixture: "case/caseReview.json",
    });
    cy.get(".caseCard").first().click()

    // Enter case review page
    cy.url().should("include", "/case-review/1");
    cy.contains("Case 1").should("be.visible");
    cy.contains("sunwukong").should("be.visible");
    cy.getByTestId("BACKGROUND").should("be.visible");
    cy.getByTestId("BACKGROUND").within(() => {
      cy.getByTestId("Patient Demographics").should("be.visible");
    })
    cy.getByTestId("PATIENT COMPLAINT").should("be.visible");
    cy.getByTestId("PATIENT COMPLAINT").within(() => {
      cy.getByTestId("Chief Complaint").should("be.visible");
    })
    cy.getByTestId("PHYSICAL EXAMINATION").should("exist");
    cy.getByTestId("PHYSICAL EXAMINATION").within(() => {
      cy.getByTestId("Body measure").should("exist");
    })

    // Go to Answer Page
    cy.intercept('GET', '/api/config/answer', {
      statusCode: 200,
      fixture: 'answer/answerConfig.json'
    });
    cy.contains("Go to Answer Page").click()
    cy.url().should("include", "/answer/1");

    // Submit answer
    const title = "Patient Name";
    const formattedTitle = title.replace(/ /g, "-");
    const inputId = `input-${formattedTitle}`;

    cy.get(`#${inputId}`)
        .should('be.visible')
        .type('Hello, world!'); // Typing text into the TextField

    cy.intercept('POST', '/api/answer/*', {
      statusCode: 200,
      fixture: 'answer/saveAnswer.json'
    });
    cy.get("#answer-submit-btn").click()
    cy.url().should('include', '/');
  });
});
