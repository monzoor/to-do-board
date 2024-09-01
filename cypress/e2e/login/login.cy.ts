import { URLS } from "../../constants/urls";

describe("Login Test", () => {
  it("should log in successfully with valid credentials", () => {
    // Visit the login page
    cy.visit(URLS.LOGIN);

    // Enter username and password
    cy.get('input[name="email"]').type("user1@user.com");
    cy.get('input[name="password"]').type("password");

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected to the dashboard
    cy.url().should("include", URLS.DASHBOARD);
    cy.contains("Logout").should("be.visible");
  });

  it("should show an error message with invalid credentials", () => {
    // Visit the login page
    cy.visit(URLS.LOGIN);

    // Enter invalid username and password
    cy.get('input[name="email"]').type("asd@s.com");
    cy.get('input[name="password"]').type("invalidPassword");

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains("Invalid credentials. Please try again.").should("be.visible");
  });

  it("should show an error message with empty credentials", () => {
    // Visit the login page
    cy.visit(URLS.LOGIN);

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });
});
