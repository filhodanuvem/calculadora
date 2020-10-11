describe("Calculadora should do the math", () => {
    const ensureMath = (value1, value2, operator, expectedResult) => {
        cy.visit("/");
        `${value1}`.split('').forEach((number) => {
            cy.get('[value="'+number+'"]').click()
        });
        cy.get('[value="'+operator+'"]').click();
        `${value2}`.split('').forEach((number) => {
            cy.get('[value="'+number+'"]').click()
        });
        cy.get('[value="="]').click();
        cy.get('#tel').contains(expectedResult);
    }

    it("should sum correctly", () => {
        ensureMath(3, 2, '+', 5)
    });

    it("should subtract correctly", () => {
        ensureMath(3, 2, '-', 1)
    });

    it("should multiply correctly", () => {
        ensureMath(3, 2, 'x', 6)
    });

    it("should divide correctly", () => {
        ensureMath(14, 2, '/', 7)
    });

    it('uses a number should show it in the screen', () => {
        cy.visit("/");
        cy.get('[value="2"]').click()
        cy.get('[value="3"]').click()
        cy.get('#tela').should('have.text', '23')
    });

    it('uses an operator should clear the screen', () => {
        cy.visit("/");
        cy.get('[value="2"]').click()
        cy.get('[value="+"]').click();
        cy.get('#tela').should('be.empty')
    });

    it('should not be able to use equal without values', () => {
        cy.visit("/");
        cy.get('[value="2"]').click();
        cy.get('[value="="]').should('be.disabled');
        cy.get('[value="+"]').click();
        cy.get('[value="="]').should('be.disabled');
        cy.get('[value="2"]').click();
        cy.get('[value="="]').should('not.be.disabled');
    });
});