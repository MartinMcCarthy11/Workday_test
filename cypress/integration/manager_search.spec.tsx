describe('Test toggle and Show/Hide Feature', () => {
	it('Go to page', () => {
		cy.visit('http://localhost:3000/');
	});

	it('Checks if on page', () => {
		cy.get('[data-testid=search-bar-test-id]').should('exist');
	});

	it('Selects input and results are  displayed', () => {
		cy.get('[id="searchBarId"]').click();
		cy.get('[data-testid= search-results-container-testid').should(
			'be.visible'
		);
		cy.get('[data-testid=search-results-ul-testid')
			.children()
			.should('have.length', 9);
	});

	it('Clicks outside of input and results should be hidden', () => {
		cy.get('body').click(0, 0);
		cy.get('[data-testid= search-results-container-testid').should(
			'not.be.visible'
		);
	});

	it('Selects input and types "Alta" 1 result should be displayed', () => {
		cy.get('[id="searchBarId"]').clear();
		cy.get('[id="searchBarId"]').click().type('alta');
		cy.get('[data-testid= search-results-container-testid').should(
			'be.visible'
		);
		cy.get('[data-testid=search-results-ul-testid')
			.children()
			.should('have.length', 1);
		cy.get('[data-testid=search-results-ul-testid').contains(
			'Alta Maxwell'
		);
	});

	it('Selects input and types "tmc" 1 result should be displayed', () => {
		cy.get('[id="searchBarId"]').clear();
		cy.get('[id="searchBarId"]').click().type('tmc');
		cy.get('[data-testid= search-results-container-testid').should(
			'be.visible'
		);
		cy.get('[data-testid=search-results-ul-testid')
			.children()
			.should('have.length', 1);
		cy.get('[data-testid=search-results-ul-testid').contains(
			'Harriet McKinney'
		);
	});

	it('Selects input and types "d b" 1 result should be displayed', () => {
		cy.get('[id="searchBarId"]').clear();
		cy.get('[id="searchBarId"]').click().type('d b');
		cy.get('[data-testid= search-results-container-testid').should(
			'be.visible'
		);
		cy.get('[data-testid=search-results-ul-testid')
			.children()
			.should('have.length', 1);
		cy.get('[data-testid=search-results-ul-testid').contains(
			'Donald Butler'
		);
	});

	it('Selects input and types "Alta". Clicks on result', () => {
		cy.get('[id="searchBarId"]').clear();
		cy.get('[id="searchBarId"]').click().type('alta');
		cy.get('[data-testid= search-results-container-testid').should(
			'be.visible'
		);
		cy.get('[data-testid=search-results-ul-testid')
			.children()
			.first()
			.click();
		cy.get('[id="searchBarId"]').should('have.value', 'Alta Maxwell');
	});

	it('Selects input and presses down arrow', () => {
		cy.get('[id="searchBarId"]').clear();
		cy.get('[id="searchBarId"]').click().type('{downarrow}');
		cy.get('[id="searchBarId"]').click().type('{downarrow}');
		cy.get('[id="searchBarId"]').click().type('{downarrow}');
		cy.get('[id="searchBarId"]').click().type('{enter}');
		cy.get('[id="searchBarId"]').should('have.value', 'Eugene Wong');
	});
});
