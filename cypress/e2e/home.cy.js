/* global cy context */
import { Texts } from '../../infra/constants';

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Check integrity', () => {
    it('Check in title is correct', () => {
      cy.findByText(Texts.HOME_TITLE).should('exist');
    });
  });
});
