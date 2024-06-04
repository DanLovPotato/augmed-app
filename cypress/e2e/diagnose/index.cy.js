describe("Physicians can submit a case", () => {
    const diagnosePageLink = "http://localhost:3000/diagnose/d523b88ae897538795ccfdb7c978b38f";
  
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem("token", Math.random().toString(16));
      });
      cy.visit(diagnosePageLink);

      cy.get("#diagnose-submit-btn").as('submitBtn');
    });
  
    it("should save case diagnose successly", () => {
        cy.get('@submitBtn').should('be.disabled');

        cy.get('#diagnosis-1').within(() => {
            cy.get('input[name="diagnosis"]').type('some diagnosis');
            cy.get('textarea[name="rationale"]').type('some rationale');

            cy.get('.MuiSlider-rail').click("center", {force: true});
        });

        cy.get('@submitBtn').should('not.be.disabled');

        cy.intercept('POST', '/api/diagnose/*', {
            statusCode: 500,
            fixture: 'diagnose/noAccessToCaseReview.json'
        });

        cy.get('@submitBtn').click();
        cy.url().should('include', '/diagnose');
        cy.contains('No access to review case.');


        cy.intercept('POST', '/api/diagnose/*', {
            statusCode: 200,
            fixture: 'diagnose/saveDiagnose.json'
        });
        cy.intercept("GET", "/api/cases", {
          statusCode: 200,
          fixture: "home/EmptyCaseList.json",
        });

        cy.get('@submitBtn').click();
        cy.url().should('include', '/'); 
    });

  });
  