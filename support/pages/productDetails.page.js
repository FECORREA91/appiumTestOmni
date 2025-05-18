const BasePage = require('./base.page');

class ProductDetailsPage extends BasePage {
    get productImage() { return $('//android.view.ViewGroup[@content-desc="Exclusivo Jumbo App, -38%, Mabe, Nevera Mabe No Frost RMA313FXCT 313 Litr..., 1 un,  , $ 1.599.716, $ 2.621.900"]/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ImageView'); }
    get productTitle() { return $('//android.widget.TextView[@text="Nevera Mabe No Frost RMA313FXCT 313 Litr..."]'); }
    get productPrice() { return $('//android.widget.TextView[@text="$ 1.599.716"]'); }

    async verifyProductDetailsScreen() {
        await this.waitForElement(this.productImage);
        await this.waitForElement(this.productTitle);
        await this.waitForElement(this.productPrice);
    }

    async verifyImageDisplayInLandscape() {
        const imageSize = await this.productImage.getSize();
        expect(imageSize.width).toBeGreaterThan(imageSize.height);
    }

    async verifyAllElementsDisplayed() {
        await this.verifyProductDetailsScreen();
    }
}

module.exports = new ProductDetailsPage();