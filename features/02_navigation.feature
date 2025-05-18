@second @navigation
Feature: Navigation Functionality

  Scenario: Navigate through main menu
    Given I am logged in to the application
    When I tap on the menu button
    And I select "Categories" from the menu
    Then I should be on the categories screen
    When I select "Electronics" category
    Then I should see products from "Electronics" category

  Scenario: Back navigation
    Given I am on the categories screen
    When I navigate back
    Then I should be on the home screen