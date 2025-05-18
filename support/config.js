const { join } = require('path');

exports.config = {
    runner: 'local',
    specs: ['./features/**/*.feature'],
    capabilities: [{
        maxInstances: 1,
        platformName: 'Android',
        'appium:deviceName': 'Pixel_7_Pro',
        'appium:platformVersion': '16.0',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.mercadolibre',
        'appium:appActivity': 'com.mercadolibre.ui.HomeActivity',
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:newCommandTimeout': 240
    }],

    services: ['appium'],
    framework: 'cucumber',
    reporters: ['spec', ['cucumberjs-json', {
        jsonFolder: './reports/json/',
        language: 'en',
    }]],
    cucumberOpts: {
        require: ['./step_definitions/**/*.js', './support/hooks.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false,
    },
    afterStep: async function (step, scenario, { error, duration, passed }) {
        if (error) {
            await browser.takeScreenshot();
        }
    },
};