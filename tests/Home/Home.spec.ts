import {Browser, BrowserContext, chromium, Page} from "playwright";
import Home from '../../pages/Home.page';
import * as data from '../../data/qa.json';

describe('Home', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let home: Home;

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false,
            slowMo: 50
        });
        context = await browser.newContext();
        page = await context.newPage();
        home =  new Home(page);
    })

    beforeEach(async () => {
        await page.goto(data.baseUrl);
        await page.waitForLoadState();
    })

    afterAll( async () => {
        await page.close();
        await context.close();
        await browser.close();
    });

    it('ZED-5 - Home is showing the LOGO on the top navigation bar and redirects respectively', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
        await home.startWithMetamask();
        expect(await home.getPageUrl()).toContain('home');
    })

    it('ZED-6 - Home is showing the Racing Dropdown List on the top navigation bar with the corresponding sub-links and redirects respectively', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-7 - Home is showing the Breeding Menu Option on the top navigation bar and redirects respectively', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-21 - Home is showing the MarketPlace Menu Option on the top navigation bar and redirects respectively', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-22 - Home is showing the Learn Dropdown List on the top navigation bar with the corresponding sub-links and redirects respectively', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-23 - Home is showing the What\'s New? Menu Option on the top navigation bar and redirects respectively', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-24 - Home is showing/loading the Streaming Video', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-25 - Home is showing the UP and COMING section with at least 3 Races in Card Containers', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-26 - Home is showing the UP and COMING section with More Races button at the bottom of the section and respective redirect', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-27 - Home is showing the On Sale Section with a list of Horses shown in Card Containers with their respective price per animal', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-28 - Home is showing the On Sale Section with an Explore Market Botton at the bottom of the section and respective redirect', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-29 - Home is showing the Create your free stable section with START button on the right side of the content', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-30 - Home is showing In Stud section with a list of horses', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-31 - Home is showing In Stud section with More Breeding Button at the bottom of the section and respective redirects', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-32 - Home is showing the Go Up icon on the website right corner and hits the action after the user clicks on', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-97 - Home is showing up the modal with a warning message when the Metamask Extension has not been installed @fast', async() => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
        await home.startWithMetamask();
        await page.waitForSelector('//*[@id="login-modal"]/h1');
        expect(await page.textContent('//*[@id="login-modal"]/h1')).toContain(`HAVE YOU INSTALLED METAMASK?`);
        expect(await page.textContent('//*[@id="login-modal"]/p[1]')).toContain(`ZED has detected that your browser does not have MetaMask installed. MetaMask is widely used by many blockchain applications in order to keep your information secure.`);
        expect(await page.innerText('//*[@id="login-modal"]/p[2]')).toContain(`What is MetaMask? Head over to our  FAQ`);
        expect(await page.textContent('//*[@id="login-modal"]/a')).toContain(`Install Metamask`);
        await page.click('//*[@id="login-modal"]/img[1]');
        expect(await home.getPageUrl()).toContain('home');
    })

});
