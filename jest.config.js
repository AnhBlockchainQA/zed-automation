module.exports = {
    setupFilesAfterEnv: ['jest-allure/dist/setup', 'expect-playwright'],
    testMatch: ["**/tests/*.test.js", "**/tests/**/*.test.js"]
};