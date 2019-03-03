import { titleEle, addTicketBtn, filterInput, ticketListContainer } from '../support/ticket-list.po';

describe('ticket list page', () => {
    
    beforeEach(() => cy.visit('/'));

    it('should display the ticket list title', () => {
        titleEle().contains('Tickets');
    });

    it('should have offer a way to add new tickets', () => {
        addTicketBtn().should('exist');
    })

    it('should allow users to filter tickets', () => {
        filterInput().type('arm')
            .wait(600)
            .then(fn => {
                ticketListContainer().find('li').should('have.length', 1);
            })

    })

});