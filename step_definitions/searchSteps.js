const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require('../support/pages/home.page');
const SearchPage = require('../support/pages/search.page');

Given('I am logged in to the application', async () => {
    await HomePage.verifyHomeScreen();
});

Given('I am on the home screen', async () => {
    await HomePage.verifyHomeScreen();
});

When('I tap on the search bar', async () => {
    await HomePage.tapSearchBar();
});

When('I enter search term {string}', async (term) => {
    await SearchPage.enterSearchTerm(term);
});

When('I submit the search', async () => {
    await SearchPage.submitSearch();
});

When('I submit an empty search', async () => {
    await SearchPage.submitSearch();
});

Then('I should see a list of products containing {string}', async (term) => {
    await SearchPage.verifySearchResults(term);
});

Then('the search results count should be greater than {int}', async (count) => {
    await SearchPage.verifySearchResultsCount(count);
});

Then('I should see a message {string}', async (message) => {
    await SearchPage.verifyEmptySearchMessage(message);
});