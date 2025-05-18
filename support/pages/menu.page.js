const BasePage = require('./base.page');

class MenuPage extends BasePage {
    get menuOptions() { return $$('//android.widget.TextView[@resource-id="menuOption"]'); }

    async selectMenuOption(optionText) {
        const options = await this.menuOptions;
        for (const option of options) {
            const text = await this.getText(option);
            if (text === optionText) {
                await this.click(option);
                return;
            }
        }
        throw new Error(`Menu option "${optionText}" not found`);
    }
}

module.exports = new MenuPage();