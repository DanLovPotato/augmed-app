describe("Physicians can go to forgot password page and sumit email.", () => {
    const loginPage ="http://localhost:3000/login"

    const test = {
        email: {
            invalid: "@example.com",
            valid: "user@example.com",
        },
    };

    it("Physicians could go to forgot password page through login page.", () => {
       cy.visit(loginPage)

        cy.contains("a", "Forgot Password?").should("exist")
        cy.getByTestId("forgot-password").click();
        cy.url().should("include", "/forgot-password");

        cy.getByTestId("email-input").should("be.visible")

        cy.contains("button","Request a Reset Link").should("exist")
    });


    it("Physicians could input the email address and email show have valid check", () => {
        const expectedMessage = "Invalid email address. Please correct it and try again."
        cy.visit(loginPage)
        cy.getByTestId("forgot-password").click();

        cy.getByTestId("email-input").type(test.email.invalid)
        cy.contains(expectedMessage).should('not.exist')
        cy.getByTestId("auth-submit-button").click()
        cy.contains(expectedMessage).should('exist')
    });


    it("Physicians could see the message when they are not in pilot group", () => {
        const expectedMessage = "It seems that you are not invited to Pilot group. Please contact dhep.lab@gmail.com"

        cy.intercept('POST', '/api/auth/reset-password-request', {
            statusCode: 500,
            fixture: 'signup/UserNotInPilot.json'
        })
        cy.visit(loginPage)
        cy.getByTestId("forgot-password").click();

        cy.inputEmail(test.email.valid)
        cy.getByTestId("auth-submit-button").click()

        cy.contains(expectedMessage).should('exist')
    });

    it("Physicians could see the message when they are not sign up yet", () => {
        const expectedMessage = "Email hasn’t sign up, please sign up.";

        cy.intercept("POST", "/api/auth/reset-password-request", {
            statusCode: 500,
            fixture: "login/UserEmailIsNotSignup.json",
        }).as("UserEmailIsNotSignup");

        cy.visit(loginPage)
        cy.getByTestId("forgot-password").click();
        cy.inputEmail(test.email.valid);
        cy.getByTestId("auth-submit-button").click();

        cy.contains(expectedMessage).should("exist");
    });


    it("Physicians could request reset link successfully", () => {
        const expectedMessage = "The reset password link is sent to your email.";

        cy.intercept('POST', '/api/auth/reset-password-request', {statusCode: 200})

        cy.visit(loginPage)
        cy.getByTestId("forgot-password").click();
        cy.inputEmail(test.email.valid)
        cy.getByTestId("auth-submit-button").click()

        cy.contains(expectedMessage).should("exist");

    });

})
