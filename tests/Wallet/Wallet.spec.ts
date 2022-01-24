import Authorization from '../../pages/Authorization.page';
import Wallet from '../../pages/Wallet.page';
import * as data from '../../fixtures/qa.json';
import Metamask from '../../pages/Metamask.module';
import { BrowserContext } from 'playwright';

describe('Wallet', () => {
  let auth: Authorization;
  let wallet: Wallet;
  let pages: any;
  let browserContext: BrowserContext;
  let metamask: Metamask;

  beforeAll(async () => {
    metamask = new Metamask();
    browserContext = await metamask.init();
    pages = await metamask.authenticate(browserContext);
    auth = new Authorization(pages);
    wallet = new Wallet(pages);
  });

  beforeEach(async () => {
    await pages[0].goto(data.baseUrl);
    await pages[0].waitForLoadState();
    await pages[0].waitForTimeout(3000);
    await pages[0].waitForSelector(wallet.objects.divBalancePart)
    await pages[0].click(wallet.objects.divBalancePart)
  });

  afterAll(async () => {
    await pages[0].close();
    await browserContext.close();
    await metamask.close(pages, browserContext);
  });

  it('ZED-90 - Wallet is shown to the user', async () => {
    expect(await pages[0].isVisible(wallet.objects.lblNavbarBalance)).toBe(true);
    expect(await pages[0].isVisible(wallet.objects.lblNavbarBalanceAmount)).toBe(true);
    expect(await pages[0].isVisible(wallet.objects.imgWalletIcon)).toBe(true);
  });

  it('ZED-91 - Wallet is shown to the user the balance in `$` Dollars Currency', async () => {
    await pages[0].waitForSelector(wallet.objects.divBalancePart)
    await pages[0].click(wallet.objects.divBalancePart)
    expect(await pages[0].innerText(wallet.objects.lblNavbarBalanceAmount)).toContain(`$`);
  });

  it('ZED-92 - Wallet is shown to the user the Address', async () => {
    await pages[0].click(wallet.objects.imgWalletIcon);
    await pages[0].waitForSelector(wallet.objects.copyAddress);
    expect(await pages[0].isVisible(wallet.objects.walletAddress),).toBe(true);
    await pages[0].waitForTimeout(5000);
    await metamask.validateAddressInPolygonscan(browserContext);
  });

  it('ZED-93 - Wallet is shown to the user after hit the wallet icon', async () => {
    await pages[0].click(wallet.objects.imgWalletIcon);
    expect(
      await pages[0].isVisible(wallet.objects.walletModalTitle),
    ).toBe(true);
  });

  it('ZED-94 - Wallet is sidebar is closed it out after hit the X icon', async () => {
    await pages[0].click(wallet.objects.imgWalletIcon);
    expect(await pages[0].isVisible(wallet.objects.walletModalTitle)).toBe(
      true,
    );
    await pages[0].click(wallet.objects.imgCloseWalletModal);
    await pages[0].waitForTimeout(5000);
    expect(await pages[0].isHidden(wallet.objects.walletModalTitle)).toBe(
      false
    );
  });

  it('ZED-132 - Wallet is allowing the user to transfer/deposit to the address', async () => {
    await pages[0].click(wallet.objects.imgWalletIcon);
    await pages[0].waitForSelector(wallet.objects.btnTopup);
    await pages[0].click(wallet.objects.btnTopup);
    await pages[0].waitForTimeout(3000);
    expect(await pages[0].isVisible(wallet.objects.topupOptionReceive)).toBe(true);
    expect(await pages[0].isVisible(wallet.objects.topupOptionBuy)).toBe(true);
    await pages[0].click(wallet.objects.topupOptionReceive);
    await pages[0].waitForSelector(wallet.objects.btnCopyAddress);
    await pages[0].click(wallet.objects.btnCopyAddress);
    expect(await pages[0].innerText(wallet.objects.btnCopyAddress)).toContain(data.copy_address_btn_text);
    await pages[0].click(wallet.objects.closeIcon);
    await pages[0].waitForSelector(wallet.objects.btnSendEth);
    await pages[0].click(wallet.objects.btnSendEth);
    await pages[0].waitForSelector(wallet.objects.ethereumWalletAddress);
    const copiedAddress = await pages[0].evaluate(async () => await navigator.clipboard.readText())
    await pages[0].fill(wallet.objects.ethereumWalletAddress, copiedAddress);
    await pages[0].click(wallet.objects.btnNetworkSelector);
    await pages[0].click(wallet.objects.inputPolygonNetwork);
    await pages[0].fill(wallet.objects.ethereumInputAmount, data.Eth_amount);
    await pages[0].click(wallet.objects.btnTransferEth);
    await metamask.confirmDepositETH(browserContext);
    await pages[0].waitForTimeout(5000);
    await pages[0].waitForSelector(wallet.objects.imgTransactionSuccess);
    expect(await pages[0].isVisible(wallet.objects.imgTransactionSuccess)).toBe(true);
    expect(await pages[0].innerText(wallet.objects.transactionSuccessModal)).toContain('Success')
    expect(await pages[0].innerText(wallet.objects.transactionSuccessModal)).toContain(data.Eth_amount)
  });

  it('ZED-133 - Wallet is allowing the user to transfer/withdraw to the address', async () => {
    await pages[0].click(wallet.objects.imgWalletIcon);
    await pages[0].waitForSelector(wallet.objects.btnTransfer);
    await pages[0].click(wallet.objects.btnTransfer);
    await pages[0].waitForSelector(wallet.objects.btnTransferEthToPolygon);
    await pages[0].type(wallet.objects.txtTransferAmount,data.withdraw_amount);
    await pages[0].click(wallet.objects.btnTransferEthToPolygon);
    await metamask.confirmWithdrawETH(browserContext);
    await pages[0].waitForTimeout(16000);
    expect(await pages[0].innerText(wallet.objects.transactionStatus)).toContain(data.withdraw_Inprogress_message);
    expect(await pages[0].innerText(wallet.objects.transactionAmount)).toContain(data.withdraw_amount);
 });

  xit('ZED-134 - Wallet is showing the amount deposited into the address', async () => {
    await pages[0].click(wallet.objects.balanceNavInfo);
    let account_balance = await wallet.getNumberFromText(await pages[0].innerText(wallet.objects.ethBalance))
    let account_balance_wallet = await wallet.getNumberFromText(await pages[0].innerText(wallet.objects.balanceWalletInfo))
    expect(account_balance).toStrictEqual(account_balance_wallet)
    await pages[0].click(wallet.objects.btnTransfer)
    let init_transfer_amount = await pages[0].innerText(wallet.objects.lblEthDlsTransferAmountInModal)
    expect(await wallet.getNumberFromText(init_transfer_amount)).toContain('0.00')
    const _available_balance = await wallet.getNumberFromText(await pages[0].innerText(wallet.objects.availableBalanceUSD))
    expect(parseInt(<string>_available_balance?.toString())).toBeGreaterThan(0)
    if (await pages[0].innerText(wallet.objects.lblEthTransferModal) === 'ETHEREUM')
      await pages[0].type(wallet.objects.txtTransferAmount, '0.001')
      expect(await wallet.getNumberFromText(init_transfer_amount)).not.toStrictEqual('0.00')
      await pages[0].click(wallet.objects.btnTransferEthToPolygon)
      expect(await pages[0].innerText(wallet.objects.h1TransferEthToPolygonNetwork)).toContain('TRANSFER ETH TO POLYGON NETWORK')
      expect(await pages[0].innerText(wallet.objects.spanTransferEthToPolygonAssetAmount)).toContain('0.001 ETH')
      expect(await pages[0].innerText(wallet.objects.spanTransferEthFrom)).toContain('Ethereum Mainnet')
      expect(await pages[0].innerText(wallet.objects.spanTransferEthTo)).toContain('Polygon Mainnet')
      await pages[0].click(wallet.objects.btnTransferEthConfirm)
    await pages[0].waitForTimeout(3000)
  });



  xit('ZED-135 - Wallet is allowing the user to select/change the displayed currency of the Account', async () => {
    await pages[0].click(wallet.objects.imgWalletIcon);
    await pages[0].click(wallet.objects.collapsePanelWalletSetting);
    await pages[0].waitForSelector(wallet.objects.lblDisplayedCurrency);
    await pages[0].click(wallet.objects.displayCurrency);
    expect(
      await pages[0].innerText(wallet.objects.ddlDisplayCurrencyGbPounds),
    ).toContain(`GBP (British Pound)`);
    await pages[0].click(wallet.objects.ddlDisplayCurrencyGbPounds);
    expect(
      await pages[0].innerText(
        wallet.objects.lblDisplayCurrencySelected,
      ),
    ).toContain(`GBP (British Pound)`);

    await pages[0].waitForSelector(wallet.objects.lblDisplayedCurrency);
    await pages[0].click(wallet.objects.displayCurrency);
    expect(
      await pages[0].innerText(wallet.objects.ddlDisplayCurrencyAudDollars),
    ).toContain(`AUD (Australian Dollar)`);
    await pages[0].click(wallet.objects.ddlDisplayCurrencyAudDollars);
    expect(
      await pages[0].innerText(
        wallet.objects.lblDisplayCurrencySelected,
      ),
    ).toContain(`AUD (Australian Dollar)`);

    await pages[0].waitForSelector(wallet.objects.lblDisplayedCurrency);
    await pages[0].click(wallet.objects.displayCurrency);
    expect(
      await pages[0].innerText(wallet.objects.ddlDisplayCurrencyUSDollars),
    ).toContain(`USD (US Dollar)`);
    await pages[0].click(wallet.objects.ddlDisplayCurrencyUSDollars);
    expect(
      await pages[0].innerText(
        wallet.objects.lblDisplayCurrencySelected,
      ),
    ).toContain(`USD (US Dollar)`);

    await pages[0].waitForSelector(wallet.objects.lblDisplayedCurrency);
    await pages[0].click(wallet.objects.displayCurrency);
    expect(
      await pages[0].innerText(wallet.objects.ddlDisplayCurrencyGbPounds),
    ).toContain(`GBP (British Pound)`);
    await pages[0].click(wallet.objects.ddlDisplayCurrencyGbPounds);
    expect(
      await pages[0].innerText(
        wallet.objects.lblDisplayCurrencySelected,
      ),
    ).toContain(`GBP (British Pound)`);
  });

  it('ZED-136 - Wallet is allowing the user to Send ETH to another account through ETH Modal', async () => {
    await pages[0].click(wallet.objects.imgWalletIcon);
    await pages[0].click(wallet.objects.btnSendEth);
    await pages[0].waitForTimeout(2000);
    await pages[0].fill(wallet.objects.ethereumWalletAddress, data.third_wallet_address);
    await pages[0].fill(wallet.objects.ethereumInputAmount, data.Eth_amount);
    await pages[0].click(wallet.objects.btnTransferEth);
    await metamask.confirmEthTransfer(browserContext);
    await pages[0].waitForTimeout(5000);
    await pages[0].waitForSelector(wallet.objects.imgTransactionSuccess);
    expect(await pages[0].isVisible(wallet.objects.imgTransactionSuccess)).toBe(true);
    expect(await pages[0].innerText(wallet.objects.transactionSuccessModal)).toContain('Success')
    expect(await pages[0].innerText(wallet.objects.transactionSuccessModal)).toContain(data.Eth_amount)
  });

});
