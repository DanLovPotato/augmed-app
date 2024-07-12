describe("Physicians can go to reset password page and sumit new password.", () => {
    const resetPasswordPage ="http://localhost:3000/reset-password/1"

    const test = {
        password: {
            valid: "&2vVTx=J",
        },

    };

    it("Physicians could go to reset password page .", () => {
       cy.visit(resetPasswordPage)

        cy.getByTestId("new-password-input")
        cy.getByTestId("confirm-password-input")
        cy.contains("button","Reset").should("exist")
            });


    it("Physicians could reset password successfully", () => {
        const expectedMessage = "Password Successfully Updated!"

        cy.intercept('POST', '/api/auth/reset-password', {
            statusCode: 200,
        })

        cy.visit(resetPasswordPage)
        cy.resetPassword(test.password.valid)
        cy.getByTestId("submit-button").click();

        cy.contains(expectedMessage).should('exist')
    });


})
