const BrowserSession = require('../browser/session');

class PageActions {

    async setValue(element, value) {
        return (await BrowserSession.pageOperation()).type(element, value);
    }

    async clickOnElement(element) {
        return (await BrowserSession.pageOperation()).click(element);
    }

    async clickOnCheckBox(element) {
        return (await BrowserSession.pageOperation).check(element, true);
    }

    async navigatePromise() {
        return (await BrowserSession.pageNavigationPromise());
    }
}

module.exports = new PageActions