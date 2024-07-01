describe("Physicians can submit a case", () => {
    const diagnosePageLink = "http://localhost:3000/diagnose/3afcc7edc5525eb6868a1362f648d922";
  
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem("token", Math.random().toString(16));
      });
      cy.visit(diagnosePageLink);

      cy.get("#diagnose-submit-btn").as('submitBtn');
    });
  
    it("should save case diagnose successfully", () => {

        cy.intercept('GET', '/api/config/answer', {
            statusCode: 200,
            fixture: 'diagnose/answerConfig.json'
        });
        cy.get('@submitBtn').should('be.disabled');

        const title = "Patient Name";
        const formattedTitle = title.replace(/ /g, "-");
        const inputId = `input-${formattedTitle}`;

        cy.get(`#${inputId}`)
            .should('be.visible')
            .type('Hello, world!'); // Typing text into the TextField

        cy.get(`#${inputId}`).should('have.value', 'Hello, world!');
        cy.get('@submitBtn').should('not.be.disabled');


        cy.get('@submitBtn').click();
        cy.url().should('include', '/diagnose');


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
  