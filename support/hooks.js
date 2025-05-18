const { Before, After } = require('@cucumber/cucumber');
const LoginPage = require('../support/pages/login.page');

Before(async () => {
    const acceptCookiesBtn = await $('//android.widget.Button[@text="Entendido"]');
    if (await acceptCookiesBtn.isDisplayed()) {
        await acceptCookiesBtn.click();
    }
});

After(async () => {
    if (await LoginPage.profileIcon.isDisplayed()) {
        await LoginPage.logout(); 
    }
});