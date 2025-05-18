process.env.TS_NODE_PROJECT = 'false';
process.env.WDIO_LOAD_TS_NODE = 'false';

const { join } = require('path');
const fs = require('fs');
const allure = require('allure-commandline');

// Configuración ordenada de features
const featureFiles = [
    join(process.cwd(), 'features/01_login.feature'),
    join(process.cwd(), 'features/02_navigation.feature'),
    join(process.cwd(), 'features/03_scroll_rotation.feature'),
    join(process.cwd(), 'features/04_search.feature')
].filter(filePath => {
    if (!fs.existsSync(filePath)) {
        console.warn(`ADVERTENCIA: Archivo no encontrado - ${filePath}`);
        return false;
    }
    return true;
});

console.log('Archivos .feature encontrados:', featureFiles);

if (featureFiles.length === 0) {
    console.error('ERROR: No se encontraron archivos .feature válidos');
    process.exit(1);
}

exports.config = {
    runner: 'local',
    specs: featureFiles,
    exclude: [],
    maxInstances: 1,
    
    autoCompileOpts: {
        autoCompile: false,
        tsNodeOpts: {
            transpileOnly: false,
            project: false,
            compilerOptions: {
                module: 'commonjs'
            }
        }
    },
    
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Pixel 6a',
        'appium:platformVersion': '16',
        'appium:udid': 'emulator-5554',
        'appium:appActivity': 'com.cencosud.co.clientes.MainActivity',
        'appium:appPackage': 'com.cencosud.co.clientes',
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 600,
        'appium:appWaitActivity': 'com.cencosud.co.clientes.*',
        'appium:ensureWebviewsHavePages': true,
        'appium:nativeWebScreenshot': true
    }],
    
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 5,
    
    services: [
        ['appium', {
            command: 'appium',
            args: {
                relaxedSecurity: true,
                address: '127.0.0.1',
                port: 4723,
                log: './logs/appium.log',
                sessionOverride: true,
                debugLogSpacing: true,
                defaultCapabilities: JSON.stringify({
                    platformName: 'Android',
                    automationName: 'UiAutomator2'
                })
            }
        }]
    ],
    
    framework: 'cucumber',
    reporters: [
        'spec',
        ['allure', {
            outputDir: join(process.cwd(), 'allure-results'),
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true,
            addConsoleLogs: true,
            addAttachments: true
        }]
    ],
    
    cucumberOpts: {
        require: [
            './step_definitions/**/*.js', // Steps en step_definitions
            './support/hooks.js'          // Hooks en support
        ],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 120000,
        ignoreUndefinedDefinitions: false
    },
    
    before: async function (capabilities, specs) {
        console.log('Especificaciones a ejecutar:', specs);
        
        try {
            // Esperar a que el driver esté listo
            await driver.waitUntil(
                async () => {
                    try {
                        const status = await driver.getStatus();
                        return status.ready;
                    } catch (e) {
                        return false;
                    }
                },
                { 
                    timeout: 30000,
                    timeoutMsg: 'Driver no se inicializó en 30 segundos'
                }
            );
            
            await driver.setTimeout({ 
                implicit: 30000,
                pageLoad: 300000,
                script: 60000 
            });
            
            // Crear directorios necesarios
            const directories = [
                './screenshots/',
                'allure-results',
                './logs'
            ];
            
            directories.forEach(dir => {
                if (!fs.existsSync(join(process.cwd(), dir))) {
                    fs.mkdirSync(join(process.cwd(), dir), { recursive: true });
                }
            });
        } catch (error) {
            console.error('Error en before hook:', error);
            throw error;
        }
    },
    
    afterStep: async function (step, scenario, { error, duration, passed }) {
        if (error) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotName = `error_${scenario.name}_${step.text}_${timestamp}.png`.replace(/\s+/g, '_');
            const screenshotPath = join(process.cwd(), './screenshots/', screenshotName);
            
            try {
                await driver.saveScreenshot(screenshotPath);
                console.log('Screenshot tomado:', screenshotPath);
                
                const screenshot = fs.readFileSync(screenshotPath);
                allure.createAttachment('Screenshot on Failure', screenshot, 'image/png');
            } catch (screenshotError) {
                console.error('Error al tomar screenshot:', screenshotError);
            }
        }
    },
    
    afterScenario: async function (world, result) {
        if (!result.passed) {
            try {
                console.log(`Reiniciando app después de escenario fallido: ${world.pickle.name}`);
                await driver.closeApp();
                await driver.launchApp();
            } catch (restartError) {
                console.error('Error al reiniciar app:', restartError);
            }
        }
    },
    
    onComplete: function (exitCode, config, capabilities, results) {
        const allureReport = allure(['generate', 'allure-results', '--clean']);
        
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(() => {
                reject(new Error('Timeout al generar reporte Allure'));
            }, 60000);

            allureReport.on('exit', (exitCode) => {
                clearTimeout(generationTimeout);
                
                if (exitCode !== 0) {
                    console.error(`Allure falló con código ${exitCode}`);
                    return reject(new Error(`Allure falló con código ${exitCode}`));
                }

                console.log('Reporte Allure generado en:', join(process.cwd(), 'allure-report'));
                console.log('Para ver el reporte ejecuta: npm run allure-serve');
                resolve();
            });
        });
    }
};