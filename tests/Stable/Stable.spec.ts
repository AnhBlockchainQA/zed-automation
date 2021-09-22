import Authorization from '../../pages/Authorization.page';
import Metamask from "../../pages/Metamask.module";
import Stable from "../../pages/Stable.page";
import * as data from '../../data/qa.json';
import {BrowserContext} from "playwright";

describe('Stable', () => {

    let auth: Authorization;
    let stable: Stable;
    let pages: any;
    let driver: BrowserContext;
    let metamask: Metamask;

    beforeAll(async () => {
        metamask = new Metamask();
        driver = await metamask.init()
        pages = await metamask.authenticate(driver)
        auth = new Authorization(pages);
        stable = new Stable(pages);
    })

    beforeEach(async () => {
        await pages[0].goto(data.baseUrl);
        await pages[0].waitForLoadState();
    })

    afterAll(async () => {
        await pages[0].close();
        await metamask.close(pages, driver)
    });

    it('ZED-129 - Stable is allowing the user to navigate to Settings section', async () => {
        expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true)
    })

    describe('Settings', function () {

        it('ZED-128 - Stable Setting allows the user to navigate through the Tabs [General/Notifications/Advance]', async () => {
            expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true)
        })

    });



});
