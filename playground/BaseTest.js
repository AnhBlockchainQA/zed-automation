import {LoginPage} from './pageObjects'

before(async () => {
    browser = await chromium.launch()
})
after(async () => {
    await browser.close()
})

beforeEach(async () => {
    page = new Login
    await page.op('${}')
})
afterEach(async () => {
    await page.close()
})