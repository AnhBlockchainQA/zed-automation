module.exports = {
    setupFilesAfterEnv: ['jest-allure/dist/setup'],
    testMatch: ["**/tests/*.test.js", "**/tests/**/*.test.js"],
    testTimeout: 10000
};