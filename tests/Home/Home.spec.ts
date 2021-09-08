import {Browser, BrowserContext, chromium, Page} from "playwright";
import Home from '../../pages/Home.page';
import * as data from '../../data/qa.json';
// import {expect} from "@playwright/test";

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
        const ele = await home.imgZedLogo()
        // expect(await ele.screenshot()).toMatchSnapshot('zed.png');
        expect(await ele?.isVisible()).toBe(true)
        const eleLink = await home.lknImgZedLogo()
        await eleLink.click()
        expect(await eleLink.getAttribute('href')).toBe('/');
    })

    it('ZED-6 - Home is showing the Racing Dropdown List on the top navigation bar with the corresponding sub-links and redirects respectively', async () => {

        // Racing Main Nav Text
        const racing = await home.lblNavRacing()
        expect(await racing.innerText()).toContain('RACING')

        // Racing Nav Link
        const racingLink = await home.lknRacing()
        expect(await racingLink.getAttribute('href')).toContain('/racing/events')
        await racing.click()
        expect(await home.getPageUrl()).toContain('/racing/events')

        // Racing DDL Options
        const ddlRacing = await home.ddlNavRacing()
        await ddlRacing.click()

        // Event Link
        const events = await home.lknEvents()
        expect(await events.getAttribute('href')).toContain('/racing/events')
        expect(await events.isVisible()).toBe(true)
        await events.click()
        expect(await home.getPageUrl()).toContain('/racing/events');

        // Next Run Link
        await ddlRacing.click()
        const nextRun = await home.lknNextRun()
        expect(await nextRun.getAttribute('href')).toContain('/racing/upcoming')
        expect(await nextRun.isVisible()).toBe(true)
        await nextRun.click()
        expect(await home.getPageUrl()).toContain('/racing/upcoming');

        // Results Link
        await ddlRacing.click()
        const results = await home.lknResults()
        expect(await results.getAttribute('href')).toContain('/racing/results')
        expect(await results.isVisible()).toBe(true)
        await results.click()
        expect(await home.getPageUrl()).toContain('/racing/results');

        // Winnings Link
        await ddlRacing.click()
        const winnings = await home.lknWinnings()
        expect(await winnings.getAttribute('href')).toContain('/racing/winnings')
        expect(await winnings.isVisible()).toBe(true)
        await winnings.click()
        expect(await home.getPageUrl()).toContain('/racing/winnings/start');
    })

    it('ZED-7 - Home is showing the Breeding Menu Option on the top navigation bar and redirects respectively', async () => {
        const breeding = await home.lknNavBreeding()
        expect(await breeding.getAttribute('href')).toContain('/stud')
        const lblBreeding = await home.lblNavBreeding()
        expect(await lblBreeding.isVisible()).toBe(true)
        await lblBreeding.click()
        expect(await home.getPageUrl()).toContain('/stud');
    })

    it('ZED-21 - Home is showing the MarketPlace Menu Option on the top navigation bar and redirects respectively', async () => {
        const marketplace = await home.lknNavMarketplace()
        expect(await marketplace.getAttribute('href')).toContain('/marketplace')
        const lblMarketplace = await home.lblNavMarketplace()
        expect(await lblMarketplace.isVisible()).toBe(true)
        await lblMarketplace.click()
        expect(await home.getPageUrl()).toContain('/marketplace');
    })

    it('ZED-22 - Home is showing the Learn Dropdown List on the top navigation bar with the corresponding sub-links and redirects respectively', async () => {
        // Learn Main Nav Text
        const learn = await home.lblNavLearn()
        expect(await learn.innerText()).toContain('LEARN')

        // Learn Nav Link
        const racingLink = await home.lknNavLearn()
        expect(await racingLink.getAttribute('href')).toContain('/genesis')
        await learn.click()
        expect(await home.getPageUrl()).toContain('/genesis')

        // Learn DDL Options
        const ddlLearn = await home.ddlNavLearn()
        await ddlLearn.click()

        // Genesis Link
        const genesis = await home.lknLearnGenesisRaceHorses()
        expect(await genesis.getAttribute('href')).toContain('/genesis')
        expect(await genesis.isVisible()).toBe(true)
        await genesis.click()
        expect(await home.getPageUrl()).toContain('/genesis');

        // Roster Link
        await ddlLearn.click()
        const roster = await home.lknLearnRoster()
        expect(await roster.getAttribute('href')).toContain('/roster')
        expect(await roster.isVisible()).toBe(true)
        await roster.click()
        expect(await home.getPageUrl()).toContain('/roster');

        // Help Link
        await ddlLearn.click()
        const help = await home.lknLearnHelp()
        expect(await help.getAttribute('href')).toContain('https://help.zed.run/help')
        expect(await help.isVisible()).toBe(true)
        const [multipage] = await Promise.all([
            context.waitForEvent("page"),
            await help.click()
        ])
        await multipage.waitForLoadState();
        const windows = page.context().pages();
        await windows[1].bringToFront();
        const back = await windows[1].waitForSelector('//a[contains(text(),\'Back to ZED\')]');
        expect(await back.isVisible()).toBe(true)
        await windows[1].close()
        await windows[0].bringToFront()

        // Getting Started Link
        await ddlLearn.click()
        const gettingStarted = await home.lknLearnGettingStarted()
        expect(await gettingStarted.getAttribute('href')).toContain('https://guide.zed.run')
        expect(await gettingStarted.isVisible()).toBe(true)
        const [multipage2] = await Promise.all([
            context.waitForEvent("page"),
            await gettingStarted.click()
        ])
        await multipage2.waitForLoadState();
        const windows2 = page.context().pages();
        await windows2[1].bringToFront();
        expect(windows2[1].url()).toContain('https://guide.zed.run/')
        await windows2[1].close()
        await windows2[0].bringToFront()

        // Product Portal Link
        await ddlLearn.click()
        const productPortal = await home.lknLearnProductPortal()
        expect(await productPortal.getAttribute('href')).toContain('https://product.zed.run/tabs/4-under-development')
        expect(await productPortal.isVisible()).toBe(true)
        const [multipage3] = await Promise.all([
            context.waitForEvent("page"),
            await productPortal.click()
        ])
        await multipage3.waitForLoadState();
        const windows3 = page.context().pages();
        await windows3[1].bringToFront();
        expect(windows3[1].url()).toContain('https://product.zed.run/tabs/15-under-consideration/tabs/4-under-development')
        await windows3[1].close()
        await windows3[0].bringToFront()
    })

    it('ZED-23 - Home is showing the What\'s New? Menu Option on the top navigation bar and redirects respectively', async () => {
        const whatsNew = await home.lknNavWhatsNew()
        expect(await whatsNew.getAttribute('href')).toContain('https://announcekit.co/zed-run/product-updates')
        const lblWhatsNew = await home.lblNavWhatsNew()
        expect(await lblWhatsNew.isVisible()).toBe(true)
        await lblWhatsNew.click()
    })

    xit('ZED-24 - Home is showing/loading the Streaming Video', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-25 - Home is showing the UP and COMING section with at least 3 Races in Card Containers', async () => {
        const sectionTitle = await home.lblH3UpAndUpcoming()
        const length = await page.$$eval(home.objects.divCardsUpAndUpcoming, (items) => items.length);
        expect(length === 3).toBeTruthy();
        expect(await sectionTitle.innerText()).toContain('UP AND COMING')
    })

    it('ZED-26 - Home is showing the UP and COMING section with More Races button at the bottom of the section and respective redirect', async () => {
        const btnMoreRaces = await home.btnUpAndUpcomingMoreRaces()
        expect(await btnMoreRaces.innerText()).toContain('More Races')
        expect(await btnMoreRaces.getAttribute('href')).toContain('/racing/events')
        await btnMoreRaces.click()
        expect(await home.getPageUrl()).toContain('/racing/events');
    })

    it('ZED-27 - Home is showing the On Sale Section with a list of Horses shown in Card Containers with their respective price per animal', async () => {
        const onSaleTitle = await home.lblH3TitleOnSaleSection()
        expect(await onSaleTitle.innerText()).toContain('On Sale')
        const soldOutShadow = await home.divSoldOutOnSaleSection()
        if (await soldOutShadow.isVisible()){
            await page.waitForSelector(home.objects.divOnSaleCardPlaceHolders)
            const OnSaleCards = await page.$$eval(home.objects.divOnSaleCardPlaceHolders, (items) => items.length);
            expect(OnSaleCards === 5).toBeTruthy();
            const soldOutContent = await home.divSoldOutMessageOnSaleSection()
            expect(await soldOutContent.isVisible()).toBeTruthy()
            expect(await soldOutContent.$$eval('p', nodes => nodes.map(n => n.innerText))).toEqual(['The last drop sold out super fast but don\'t worry the next pack of horses are dropping soon. Visit our Discord for updates.']);
            expect(await soldOutContent.$$eval('a', nodes => nodes.map(n => n.href))).toEqual(['https://discord.gg/zedrun']);
        } else {
            // Add the logic when the sold out is not there.
            console.log('No implemented yet!')
        }
    })

    it.skip('ZED-28 - Home is showing the On Sale Section with an Explore Market Botton at the bottom of the section and respective redirect', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-29 - Home is showing the Create your free stable section with START button on the right side of the content', async () => {
        const lblCreateFreeStable = await home.lblH2UpAndUpcomingCreateFreeStable()
        expect(await lblCreateFreeStable.isVisible()).toBe(true)
        const lblCreateFreeStableLegend = await home.lblPUpAndUpcomingCreateFreeStableLegend()
        expect(await lblCreateFreeStableLegend.isVisible()).toBe(true)
        const btnStart = await home.btnStartUpAndUpcomingCreateFreeStable()
        expect(await btnStart.innerText()).toContain('START')
        await btnStart.click()
        expect(await home.getPageUrl()).toContain('/home/start');
    })

    it.skip('ZED-30 - Home is showing In Stud section with a list of horses', async () => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    it('ZED-31 - Home is showing In Stud section with More Breeding Button at the bottom of the section and respective redirects', async () => {
        const btnMoreBreeding = await home.btnMoreBreeding()
        expect(await btnMoreBreeding.innerText()).toContain('More Breeding')
        expect(await btnMoreBreeding.getAttribute('href')).toContain('/stud')
        await btnMoreBreeding.click()
        expect(await home.getPageUrl()).toContain('/stud');
    })

    it('ZED-32 - Home is showing the Go Up icon on the website right corner and hits the action after the user clicks on', async () => {
        const cookies = await home.btnAcceptCookies()
        await cookies.click()
        await page.keyboard.press("PageDown")
        await page.waitForLoadState()
        await page.waitForTimeout(1000)
        const scrollUp = await home.btnScrollUp()
        expect(await scrollUp.isHidden()).toBe(false)
        await scrollUp.click()
        await page.waitForTimeout(1000)
        expect(await scrollUp.isHidden()).toBe(true)
    })

    it('ZED-97 - Home is showing up the modal with a warning message when the Metamask Extension has not been installed @fast', async() => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
        await home.startWithMetamask();
        // await page.waitForSelector('//*[@id="login-modal"]/h1');
        const modalTitle = await home.lblH1TitleModalNonExtension()
        expect(await modalTitle.textContent()).toContain(`HAVE YOU INSTALLED METAMASK?`);
        const modalLegend = await home.lblPLegendModalNonExtension()
        expect(await modalLegend.textContent()).toContain(`ZED has detected that your browser does not have MetaMask installed. MetaMask is widely used by many blockchain applications in order to keep your information secure.`);
        const modalQuestion = await home.lblPLegendQuestionModalNonExtension()
        expect(await modalQuestion.innerText()).toContain(`What is MetaMask? Head over to our  FAQ`);
        const installMeta = await home.lknInstallMetamaskModalNonExtension()
        expect(await installMeta.textContent()).toContain(`Install Metamask`);
        const installMetaImg = await home.imgInstallMetamaskModalNonExtension()
        await installMetaImg.click();
        expect(await home.getPageUrl()).toContain('home');
    })

});
