async function Page () {
    const context = await global.__BROWSER__.newContext()
    return await context.newPage()
  }
  
export default {
    Page
}