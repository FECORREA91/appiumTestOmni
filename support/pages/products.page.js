const BasePage = require('./base.page');

class ProductsPage extends BasePage {
    get productList() { return $('//android.widget.ScrollView[@resource-id="productList"]'); }
    get productItems() { return $$('//android.widget.TextView[@resource-id="productName"]'); }
    initialProductCount = 0;

    async verifyProductsListScreen() {
        await this.waitForElement(this.productList);
        this.initialProductCount = await this.productItems.length;
    }

    async scrollDown() {
        const { height } = await driver.getWindowRect();
        const startY = height * 0.8;
        const endY = height * 0.2;
        const x = (await this.productList.getLocation()).x + (await this.productList.getSize()).width / 2;
        
        await driver.touchPerform([
            { action: 'press', options: { x, y: startY } },
            { action: 'wait', options: { ms: 500 } },
            { action: 'moveTo', options: { x, y: endY } },
            { action: 'release' }
        ]);
    }

    async verifyMoreProductsLoaded() {
        await driver.pause(2000); // Wait for loading
        const currentCount = await this.productItems.length;
        expect(currentCount).toBeGreaterThan(this.initialProductCount);
    }

    async verifyProductCountIncreased() {
        const currentCount = await this.productItems.length;
        expect(currentCount).toBeGreaterThan(this.initialProductCount);
    }
}

module.exports = new ProductsPage();