import {Page} from "playwright";

class Stable {

    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    objects = {
        btnStart: '#app .app-content .header-desktop .start-part button',
    }

    btnStart = async () => await this.page.$('#app .app-content .header-desktop .start-part button');

    async getPageTitle() {
        return await this.page.title();
    }

    async getPageUrl() {
        return this.page.url();
    }

}

export default Stable
