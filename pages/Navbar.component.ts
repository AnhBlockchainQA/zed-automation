import { Page } from 'playwright';

class Navbar {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    objects = {
        btnStart: '//div[contains(text(),\'start\')]',
        btnStartHeader: '//h1[text()=\'OWN. RACE. EARN.\']/following-sibling::button',
        imgCloseChooseAccountLogin: '(//img[@class=\'close-icon\'])[2]',
        btnMetamaskOption: '#login-modal .login-options .metamask-login',
        btnMagicLinkAccount: '//div[@class=\'login-option magic-login\']',
        lblH1MagicLinkFormTitle: '//h1[text()=\'ENTER YOUR EMAIL\']',
        lblH1ChooseAccountModalTitle: '//h1[text()=\'CHOOSE AN ACCOUNT\']',
        imgBackIconFromMagicLinkForm: '.back-icon',
        imgZedLogo: '.logo-img',
        lknImgZedLogo: '.header-content > .left-part > .logo-part > .logo',
        divCardsUpAndUpcoming: "//div[contains(@class,'race-card')]",
        divOnSaleCardPlaceHolders:
            "//div[contains(@class,'horse-sale-card horse-skeleton placeholder')]",
        divInStudHorsesSection:
            "//div[contains(@class,'horses')]/div[@class='horse']",
        ddlNavRacing: '.icon-part-wrap:nth-child(2) > .menu-button > .icon-part > .icon-arrow > .icon',
        lblNavRacing: '//div[contains(text(),\'racing\')]',
        lknRacing: '//div[contains(text(),\'racing\')]/..',
        lknEvents: '//a[contains(text(),\'Events\')]',
        lknNextRun: '//a[contains(text(),\'Next to Run\')]',
        lknResults: '//a[contains(text(),\'Results\')]',
        lknWinnings: '//a[contains(text(),\'Winnings\')]',
        lblNavBreeding:'//div[contains(text(),\'BREEDING\')]',
        lknNavBreeding:'//div[contains(text(),\'BREEDING\')]/..',
        lblNavMarketplace:'//div[contains(text(),\'Marketplace\')]',
        lknNavMarketplace:'//div[contains(text(),\'Marketplace\')]/..',
        lblNavLearn:'//div[contains(text(),\'Learn\')]',
        lknNavLearn:'//div[contains(text(),\'Learn\')]/..',
        ddlNavLearn:'.icon-part-wrap:nth-child(5) > .menu-button > .icon-part > .icon-arrow > .icon',
        lknLearnGenesisRaceHorses: '//a[contains(text(),\'Genesis Racehorses\')]',
        lknLearnRoster: '//a[contains(text(),\'roster\')]',
        lknLearnHelp: '//a[contains(text(),\'Help\')]',
        lknLearnGettingStarted: '//a[contains(text(),\'Getting started\')]',
        lknLearnProductPortal: '//a[contains(text(),\'Product Portal\')]',
        lblNavWhatsNew: '//div[contains(text(),"What\'s new?")]',
        lknNavWhatsNew: '//div[contains(text(),"What\'s new?")]/../a',
        btnAcceptCookies:'//div/footer[1]/div[2]/div/div[2]/button',
        btnScrollUp: '//body/div[@id=\'app\']/div[1]/div[3]/div[1]'
    }
}

export default Navbar;
