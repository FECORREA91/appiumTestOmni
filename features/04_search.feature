@fourth @search
Feature: Search Functionality

  Scenario: Search for a product
    Given I am logged in to the application
    And I am on the home screen
    When I tap on the search bar
    And I enter search term "smartphone"
    And I submit the search
    Then I should see a list of products containing "smartphone"
    And the search results count should be greater than 0

  Scenario: Empty search
    Given I am logged in to the application
    And I am on the home screen
    When I tap on the search bar
    And I submit an empty search
    Then I should see a message "Please enter a search term"