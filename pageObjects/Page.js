export default class Page {
    open(path) {
        const page = browser.newPage()
        await page.goto(path)
    }
}