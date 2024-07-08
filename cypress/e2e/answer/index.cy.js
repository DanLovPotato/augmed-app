describe("Physicians can submit a case", () => {
    const answerPageLink = "http://localhost:3000/answer/3afcc7edc5525eb6868a1362f648d922";
  
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem("token", Math.random().toString(16));
      });
      cy.visit(answerPageLink);

      cy.get("#answer-submit-btn").as('submitBtn');
    });
  
    it("should save case answer successfully", () => {

        cy.intercept('GET', '/api/config/answer', {
            statusCode: 200,
            fixture: 'answer/answerConfig.json'
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
        cy.url().should('include', '/answer');


        cy.intercept('POST', '/api/answer/*', {
            statusCode: 200,
            fixture: 'answer/saveAnswer.json'
        });
        cy.intercept("GET", "/api/cases", {
          statusCode: 200,
          fixture: "home/EmptyCaseList.json",
        });

        cy.get('@submitBtn').click();
        cy.url().should('include', '/'); 
    });

  });
  