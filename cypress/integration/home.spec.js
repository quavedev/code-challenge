import { TEXTS } from '../../shared/constants';

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Check integrity', () => {
    it('h1 is correct', () => {
      cy.queryByText(TEXTS.HOME_TITLE).should('exist');
    });
  });
});
