export const titleEle = () => cy.get('h1.mat-display-1');
export const addTicketBtn = () => cy.get('#btn-add-ticket', { timeout: 10000 });
export const filterInput = () => cy.get('#filter-input', { timeout: 10000 });
export const ticketListContainer = () => cy.get('#ticket-list-container', { timeout: 10000 });