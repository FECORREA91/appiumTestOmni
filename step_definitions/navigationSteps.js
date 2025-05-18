const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require('../support/pages/home.page');
const MenuPage = require('../support/pages/menu.page');
const CategoriesPage = require('../support/pages/categories.page');

When('I tap on the menu button', async () => {
    await HomePage.openMenu();
});

When('I select {string} from the menu', async (option) => {
    await MenuPage.selectMenuOption(option);
});

Then('I should be on the categories screen', async () => {
    await CategoriesPage.verifyCategoriesScreen();
});

When('I select {string} category', async (category) => {
    await CategoriesPage.selectCategory(category);
});

Then('I should see products from {string} category', async (category) => {
    await CategoriesPage.verifyCategoryProducts(category);
});

When('I navigate back', async () => {
    await driver.back();
});

Then('I should be on the home screen', async () => {
    await HomePage.verifyHomeScreen();
});