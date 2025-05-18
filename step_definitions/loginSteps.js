const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../support/pages/login.page');
const HomePage = require('../support/pages/home.page');

Given('I am on the login screen', async () => {
    await LoginPage.open();
});

When('I enter valid username {string} and password {string}', async (username, password) => {
    await LoginPage.login(username, password);
});

When('I enter invalid username {string} and password {string}', async (username, password) => {
    await LoginPage.login(username, password);
    await LoginPage.accept();
});

When('I tap the login button', async () => {
    await LoginPage.submit();
});

Then('I should be redirected to the home screen', async () => {
    await HomePage.verifyHomeScreen();
});

Then('I should see an error message {string}', async (message) => {
    await expect(LoginPage.errorMessage).toHaveTextContaining(message);
});