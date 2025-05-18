@first @login
Feature: Login Functionality

  Scenario: Successful login with valid credentials
    Given I am on the login screen
    When I enter valid username "fecorras1791@gmail.com" and password "Juliana/30*"
    And I tap the login button
    Then I should be redirected to the home screen
    And I should see a welcome message containing "Welcome, testuser"

  Scenario: Failed login with invalid credentials
    Given I am on the login screen
    When I enter invalid username "fecorras1791@gmail.com" and password "Juliana/30*"
    And I tap the login button
    Then I should see an error message "Ha ocurrido un error, revisa que tú email y contraseña sean correctos!"