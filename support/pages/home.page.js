const BasePage = require('./base.page');

class HomePage extends BasePage {
    get searchBar() { return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]'); }
    get menuButton() { return $('//android.view.ViewGroup[@content-desc="Mis listas"]'); }


    async tapSearchBar() {
        await this.click(this.searchBar);
    }

    async openMenu() {
        await this.click(this.menuButton);
    }
}

module.exports = new HomePage();