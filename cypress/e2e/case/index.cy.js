describe("User journey testing", () => {
  const loginLink = "http://localhost:3000/login";

  const test = {
    email: "user@example.com",
    password: "&2vVTx=J",
  };

  it("Login and review a case then submit the diagnose", () => {
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

    // Go to diagnose
    cy.contains("Go to Diagnose").click()
    cy.url().should("include", "/diagnose/1");

    // Submit diagnose
    cy.get('#diagnosis-1').within(() => {
      cy.get('input[name="diagnosis"]').type('some diagnosis');
      cy.get('textarea[name="rationale"]').type('some rationale');
      cy.get('.MuiSlider-rail').click("center", {force: true});
    });
    cy.intercept('POST', '/api/diagnose/1', {
      statusCode: 200,
      fixture: 'diagnose/saveDiagnose.json'
    });
    cy.get("#diagnose-submit-btn").click()
    cy.url().should('include', '/');
  });
});
