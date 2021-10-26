import { Page } from 'playwright';

class Home {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    btnStart: '#app .app-content .header-desktop .start-part button',
    btnMetamaskOption: '#login-modal .login-options .metamask-login',
    divCardsUpAndUpcoming: "//div[contains(@class,'race-card')]",
    divOnSaleCardPlaceHolders:
      "//div[contains(@class,'horse-sale-card horse-skeleton placeholder')]",
    divInStudHorsesSection:
      "//div[contains(@class,'horses')]/div[@class='horse']",
    lblH1MagicLinkFormTitle: "//h1[text()='ENTER YOUR EMAIL']",
    lblH1ChooseAccountModalTitle: "//h1[text()='CHOOSE AN ACCOUNT']",
  };

  btnStart = async () =>
    await this.page.$('//div[contains(text(),\'start\')]');
  btnStartHeader = async () =>
    await this.page.$(
      "//h1[text()='OWN. RACE. EARN.']/following-sibling::button",
    );
  imgCloseChooseAccountLogin = async () =>
    await this.page.$("(//img[@class='close-icon'])[2]");
  btnMetamaskOption = async () =>
    await this.page.$('#login-modal .login-options .metamask-login');
  btnMagicLinkAccount = async () =>
    await this.page.waitForSelector("//div[@class='login-option magic-login']");
  lblH1MagicLinkFormTitle = async () =>
    await this.page.waitForSelector("//h1[text()='ENTER YOUR EMAIL']");
  lblH1ChooseAccountModalTitle = async () =>
    await this.page.waitForSelector("//h1[text()='CHOOSE AN ACCOUNT']");
  imgBackIconFromMagicLinkForm = async () =>
    await this.page.waitForSelector('.back-icon');
  imgZedLogo = async () => await this.page.waitForSelector('.logo-img');
  lknImgZedLogo = async () =>
    await this.page.waitForSelector(
      '.header-content > .left-part > .logo-part > .logo',
    );
  ddlNavRacing = async () =>
    await this.page.waitForSelector(
      '.icon-part-wrap:nth-child(2) > .menu-button > .icon-part > .icon-arrow > .icon',
    );
  lblNavRacing = async () =>
    await this.page.waitForSelector("//div[contains(text(),'racing')]");
  lknRacing = async () =>
    await this.page.waitForSelector("//div[contains(text(),'racing')]/..");
  lknEvents = async () =>
    await this.page.waitForSelector("//a[contains(text(),'Events')]");
  lknNextRun = async () =>
    await this.page.waitForSelector("//a[contains(text(),'Next to Run')]");
  lknResults = async () =>
    await this.page.waitForSelector("//a[contains(text(),'Results')]");
  lknWinnings = async () =>
    await this.page.waitForSelector("//a[contains(text(),'Winnings')]");
  lblNavBreeding = async () =>
    await this.page.waitForSelector("//div[contains(text(),'BREEDING')]");
  lknNavBreeding = async () =>
    await this.page.waitForSelector("//div[contains(text(),'BREEDING')]/..");
  lblNavMarketplace = async () =>
    await this.page.waitForSelector("//div[contains(text(),'Marketplace')]");
  lknNavMarketplace = async () =>
    await this.page.waitForSelector("//div[contains(text(),'Marketplace')]/..");
  lblNavLearn = async () =>
    await this.page.waitForSelector("//div[contains(text(),'Learn')]");
  lknNavLearn = async () =>
    await this.page.waitForSelector("//div[contains(text(),'Learn')]/..");
  ddlNavLearn = async () =>
    await this.page.waitForSelector(
      '.icon-part-wrap:nth-child(5) > .menu-button > .icon-part > .icon-arrow > .icon',
    );
  lknLearnGenesisRaceHorses = async () =>
    await this.page.waitForSelector(
      "//a[contains(text(),'Genesis Racehorses')]",
    );
  lknLearnRoster = async () =>
    await this.page.waitForSelector("//a[contains(text(),'roster')]");
  lknLearnHelp = async () =>
    await this.page.waitForSelector("//a[contains(text(),'Help')]");
  lknLearnGettingStarted = async () =>
    await this.page.waitForSelector("//a[contains(text(),'Getting started')]");
  lknLearnProductPortal = async () =>
    await this.page.waitForSelector("//a[contains(text(),'Product Portal')]");
  lblNavWhatsNew = async () =>
    await this.page.waitForSelector('//div[contains(text(),"What\'s new?")]');
  lknNavWhatsNew = async () =>
    await this.page.waitForSelector(
      '//div[contains(text(),"What\'s new?")]/../a',
    );
  lblH3UpAndUpcoming = async () =>
    await this.page.waitForSelector(
      "//div[contains(@class,'up-and-coming')]//h3[contains(text(),'Up and Coming')]",
    );
  btnUpAndUpcomingMoreRaces = async () =>
    await this.page.waitForSelector("//a[contains(text(),'More Races')]");
  lblH2UpAndUpcomingCreateFreeStable = async () =>
    await this.page.waitForSelector(
      "//h2[contains(text(),'Create your free stable')]",
    );
  lblPUpAndUpcomingCreateFreeStableLegend = async () =>
    await this.page.waitForSelector(
      "//p[contains(text(),'Become a stable owner and start racing now to win!')]",
    );
  btnStartUpAndUpcomingCreateFreeStable = async () =>
    await this.page.waitForSelector("//button[contains(text(),'Start')]");
  btnMoreBreeding = async () =>
    await this.page.waitForSelector("//a[contains(text(),'More Breeding')]");
  btnScrollUp = async () =>
    await this.page.waitForSelector(
      "//body/div[@id='app']/div[1]/div[3]/div[1]",
    );
  btnAcceptCookies = async () =>
    await this.page.waitForSelector('//div/footer[1]/div[2]/div/div[2]/button');
  lblH1TitleModalNonExtension = async () =>
    await this.page.waitForSelector('//*[@id="login-modal"]/h1');
  lblPLegendModalNonExtension = async () =>
    await this.page.waitForSelector('//*[@id="login-modal"]/p[1]');
  lblPLegendQuestionModalNonExtension = async () =>
    await this.page.waitForSelector('//*[@id="login-modal"]/p[2]');
  lknInstallMetamaskModalNonExtension = async () =>
    await this.page.waitForSelector('//*[@id="login-modal"]/a');
  imgInstallMetamaskModalNonExtension = async () =>
    await this.page.waitForSelector('//*[@id="login-modal"]/img[1]');
  lblH3TitleOnSaleSection = async () =>
    await this.page.waitForSelector("//h3[contains(text(),'On Sale')]");
  divSoldOutOnSaleSection = async () =>
    await this.page.waitForSelector("//div[contains(@class,'sold-out')]");
  divSoldOutMessageOnSaleSection = async () =>
    await this.page.waitForSelector(
      "//div[contains(@class,'sold-out')]/div[@class='message']",
    );
  divInStudHorsesSection = async () =>
    await this.page.waitForSelector(
      "//div[contains(@class,'horses')]/div[@class='horse']",
    );

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }

  async startWithMetamask() {
    const btnStart = await this.btnStart();
    if (btnStart != null) await btnStart.click();
    else throw new Error('Start Button Not Found!');
    const btnMetamask = await this.btnMetamaskOption();
    if (btnMetamask != null) await btnMetamask.click();
    else throw new Error('Metamask Login Option not found!');
  }

  async clickOnStartButton() {
    await this.page.waitForSelector(this.objects.btnStart);
    return await this.page.click(this.objects.btnStart);
  }

  async clickOnMetamaskOption() {
    await this.page.waitForSelector(this.objects.btnMetamaskOption, {
      timeout: 0,
    });
    await this.page.click(this.objects.btnMetamaskOption);
  }
}

export default Home;
