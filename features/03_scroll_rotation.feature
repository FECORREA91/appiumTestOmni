@third @scroll
Feature: Scroll and Rotation Functionality

  Scenario: Scroll through product list
    Given I am on the products list screen
    When I scroll down the product list
    Then I should load more products
    And the product count should increase

  Scenario: Verify layout after rotation
    Given I am on the product details screen
    When I rotate the device to landscape mode
    Then the product image should be properly displayed
    When I rotate the device back to portrait mode
    Then all elements should be properly displayed