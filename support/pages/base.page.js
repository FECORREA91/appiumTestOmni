class BasePage {
    async open() {
        // Implement app launch logic if needed
    }

    async waitForElement(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }

    async click(element) {
        await this.waitForElement(element);
        await element.click();
    }

    async setValue(element, value) {
        await this.waitForElement(element);
        await element.setValue(value);
    }

    async getText(element) {
        await this.waitForElement(element);
        return element.getText();
    }

    async isDisplayed(element) {
        try {
            return await element.isDisplayed();
        } catch (e) {
            return false;
        }
    }
}

module.exports = BasePage;