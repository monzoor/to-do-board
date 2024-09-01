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

  it("should open the create ticket modal", () => {
    // Assert that the create ticket modal is opened
    cy.get("[data-testid=ticket-cta]").click();
    cy.contains("Create Ticket").should("be.visible");
  });

  it("should open the create category modal", () => {
    // Assert that the create ticket modal is opened
    cy.get("[data-testid=category-cta]").click();
    cy.contains("Create Ticket").should("be.visible");
  });

  // add drag and drop test
  it("should drag and drop a ticket", () => {
    var dataTransfer = new DataTransfer();

    // Assert that the ticket is dragged and dropped
    cy.get("[data-testid=ticket]")
      .first()
      .trigger("dragstart", { dataTransfer });
    cy.get("[data-testid=category]").last().trigger("drop", { dataTransfer });
    cy.setCookie("moved", "true");
    cy.get("[data-testid=category]").last().should("have.length", 1);
  });
});
