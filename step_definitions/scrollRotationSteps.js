const { Given, When, Then } = require('@cucumber/cucumber');
const ProductsPage = require('../support/pages/products.page');
const ProductDetailsPage = require('../support/pages/productDetails.page');

Given('I am on the products list screen', async () => {
    await ProductsPage.verifyProductsListScreen();
});

When('I scroll down the product list', async () => {
    await ProductsPage.scrollDown();
});

Then('I should load more products', async () => {
    await ProductsPage.verifyMoreProductsLoaded();
});

Then('the product count should increase', async () => {
    await ProductsPage.verifyProductCountIncreased();
});

Given('I am on the product details screen', async () => {
    await ProductDetailsPage.verifyProductDetailsScreen();
});

When('I rotate the device to landscape mode', async () => {
    await driver.rotate('LANDSCAPE');
});

Then('the product image should be properly displayed', async () => {
    await ProductDetailsPage.verifyImageDisplayInLandscape();
});

When('I rotate the device back to portrait mode', async () => {
    await driver.rotate('PORTRAIT');
});

Then('all elements should be properly displayed', async () => {
    await ProductDetailsPage.verifyAllElementsDisplayed();
});