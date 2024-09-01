import { URLS } from "../../constants/urls";

describe("Navigation", () => {
  it("should navigate to login screen initial", () => {
    // Start from the index page
    cy.visit(URLS.DASHBOARD);
    cy.url().should("include", URLS.LOGIN);
  });

  it("should navigate to signup screen", () => {
    cy.visit(URLS.SIGNUP);
    cy.url().should("include", URLS.SIGNUP);
  });

  it("should navigate to login screen", () => {
    cy.visit(URLS.LOGIN);
    cy.url().should("include", URLS.LOGIN);
  });
});
