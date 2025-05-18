const BasePage = require('./base.page');

class CategoriesPage extends BasePage {
    get categoryItems() { return $$('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup'); }
    get productItems() { return $$('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.TextView'); }

    async verifyCategoriesScreen() {
        await this.waitForElement(this.categoryItems[0]);
    }

    async selectCategory(categoryName) {
        const categories = await this.categoryItems;
        for (const category of categories) {
            const text = await this.getText(category);
            if (text === categoryName) {
                await this.click(category);
                return;
            }
        }
        throw new Error(`Category "${categoryName}" not found`);
    }

    async verifyCategoryProducts(categoryName) {
        await this.waitForElement(this.productItems[0]);
        // Additional verification if needed
    }
}

module.exports = new CategoriesPage();