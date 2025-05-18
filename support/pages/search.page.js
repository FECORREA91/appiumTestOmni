const BasePage = require('./base.page');

class SearchPage extends BasePage {
    get searchInput() { return $('//android.widget.EditText[@resource-id="searchInput"]'); }
    get searchButton() { return $('//android.widget.Button[@text="SEARCH"]'); }
    get searchResults() { return $$('//android.widget.TextView[@resource-id="productName"]'); }
    get emptySearchMessage() { return $('//android.widget.TextView[@resource-id="emptySearchMessage"]'); }

    async enterSearchTerm(term) {
        await this.setValue(this.searchInput, term);
    }

    async submitSearch() {
        await this.click(this.searchButton);
    }

    async verifySearchResults(term) {
        const results = await this.searchResults;
        for (const result of results) {
            const text = await this.getText(result);
            expect(text.toLowerCase()).toContain(term.toLowerCase());
        }
    }

    async verifySearchResultsCount(minCount) {
        const results = await this.searchResults;
        expect(results.length).toBeGreaterThan(minCount);
    }

    async verifyEmptySearchMessage(message) {
        const text = await this.getText(this.emptySearchMessage);
        expect(text).toContain(message);
    }
}

module.exports = new SearchPage();