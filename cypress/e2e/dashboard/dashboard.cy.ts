import { URLS } from "../../constants/urls";

describe("Dashboard Test", () => {
  beforeEach(() => {
    cy.setCookie("authToken", "mock-token-123456");
    cy.visit(URLS.DASHBOARD);
  });

  it("should visit the dashboard with a valid authToken", () => {
    // Assert that the dashboard page is loaded
    cy.url().should("include", URLS.DASHBOARD);
    cy.contains("Logout").should("be.visible");
  });

  it("should display the categories and tickets", () => {
    // Assert that the categories and tickets are displayed
    cy.get("[data-testid=category]").should("have.length", 2);
    cy.get("[data-testid=ticket]").should("have.length", 3);
  });

  it("should open the ticket details modal", () => {
    // Assert that the ticket details modal is opened
    cy.get("[data-testid=ticket]").first().click();
    cy.contains("Ticket Details").should("be.visible");
  });
});
