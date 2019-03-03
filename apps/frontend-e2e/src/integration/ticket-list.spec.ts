import { getTitle } from '../support/ticket-list.po';

describe('ticket list page', () => {
    
    beforeEach(() => cy.visit('/'));

    it('should display the ticket list title', () => {
        getTitle().contains('Tickets');
    });

});