import { getTitle } from '../support/app.po';

describe('Hello Nx', () => {
  beforeEach(() => cy.visit('/'));

  it('should display "Ticktes"', () => {
    getTitle().contains('Tickets');
  });
});
