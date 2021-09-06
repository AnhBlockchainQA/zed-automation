module.exports = {
    verbose: true,
    preset: 'jest-playwright-preset',
    transform:{
        "^.+\\.tsx?$": "ts-jest",
    },
    testTimeout: 120000,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['jest-allure/dist/setup','expect-playwright'],
    testMatch: [
        "**/tests/**/*.spec.(js|jsx|ts|tsx)",
        "**/tests/**/*.test.(js|jsx|ts|tsx)"
    ]
};
