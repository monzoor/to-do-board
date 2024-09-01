import { URLS } from "../../constants/urls";

describe("Signup Test", () => {
  it("should sign up successfully with valid credentials", () => {
    // Visit the signup page
    cy.visit(URLS.SIGNUP);

    // Enter username and password
    cy.get('input[name="username"]').type("user2");
    cy.get('input[name="email"]').type("user2@user.com");
    cy.get('input[name="password"]').type("password");

    // Click the signup button
    cy.get('button[type="submit"]').click();

    // Assert that the user is redirected to the dashboard
    cy.url().should("include", URLS.LOGIN);
  });

  it("should show an error message with user already exists", () => {
    // Visit the signup page
    cy.visit(URLS.SIGNUP);

    // Enter invalid username and password
    cy.get('input[name="username"]').type("user");
    cy.get('input[name="email"]').type("user1@user.com");
    cy.get('input[name="password"]').type("password");

    // Click the signup button
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains("Email already exists").should("be.visible");
  });

  it("should show an error message with empty credentials", () => {
    // Visit the signup page
    cy.visit(URLS.SIGNUP);

    // Click the signup button
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains("Username is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password must be at least 3 characters long").should(
      "be.visible",
    );
  });
});
