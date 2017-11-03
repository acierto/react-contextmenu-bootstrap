var os = require('os');

var AsciiTable = require('ascii-table');
var R = require('ramda');
var yargs = require('yargs');
var DEFAULT_TIMEOUT = 360000;
var ScreenShotReporter = require('protractor-screenshot-reporter');

var browserName = (process.env.SELENIUM_TEST_BROWSER || 'chrome').toLowerCase();
var platform = (process.env.SELENIUM_TEST_PLATFORM || 'linux').toLowerCase();
var vr = require('./visual-review').getVr();

var proxyPort = yargs.argv.params.proxyPort;
var seleniumVersions = require('../../../../../gulp/tasks/selenium-versions.json');

function printBanner() {
    var table = new AsciiTable('Configuration');
    table
        .addRow('Host', R.propOr('localhost', 'SELENIUM_TEST_ADDR', process.env))
        .addRow('Browser', R.propOr(`Not set. Using default.`, 'SELENIUM_TEST_BROWSER', process.env))
        .addRow('Platform', R.propOr(`Not set. Using local: (${os.platform()})`, 'SELENIUM_TEST_PLATFORM', process.env));
    console.log(table.toString());
}

exports.config = {
    allScriptsTimeout: DEFAULT_TIMEOUT,
    baseUrl: 'http://' + os.hostname() + ':' + proxyPort + '/',
    capabilities: {
        browserName,
        platform,
        requireWindowFocus: true
    },
    framework: 'jasmine2',
    troubleshoot: true,
    getPageTimeout: DEFAULT_TIMEOUT,
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: DEFAULT_TIMEOUT,
        print: R.F
    },
    rootElement: 'body',
    seleniumAddress: (process.env.SELENIUM_TEST_ADDR || null),
    specs: ['../scenario/**/*.js'],
    onPrepare: function () {
        addLibraries({
            requestify: 'requestify',
            requestPromise: 'request-promise',
            Q: 'q',
            R: 'ramda'
        });
        addJQueryLocator();

        var reporters = require('jasmine-reporters');
        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

        jasmine.getEnv().addReporter(new reporters.JUnitXmlReporter({
            consolidateAll: false,
            savePath: 'build/test-results/protractor'
        }));

        jasmine.getEnv().addReporter(new ScreenShotReporter({
            baseDirectory: 'build/screenshots'
        }));

        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: 'build/reports/e2e/',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: true
        }));

        jasmine.getEnv().addReporter(new SpecReporter({
            suite: {
                displayNumber: true
            },
            spec: {
                displayErrorMessages: true,
                displayStacktrace: true,
                displaySuccessful: true,
                displayFailed: true,
                displayPending: true,
                displayDuration: true
            }
        }));

        var failFast = require('jasmine-fail-fast');
        jasmine.getEnv().addReporter(failFast.init());

        rmdir = require('rimraf');
        rmdir('build/reports', function (error) {
        });

        var dslFiles = require('glob').sync('../dsl/provision/**/*.js', {cwd: __dirname});
        var dslCommonFiles = require('glob').sync('../dsl/common/**/*.js', {cwd: __dirname});
        R.forEach(require, dslFiles);
        R.forEach(require, dslCommonFiles);

        browser.ignoreSynchronization = true;
        Browser.open();
        Browser.setDefaultSize();
        browser.manage().timeouts().setScriptTimeout(DEFAULT_TIMEOUT);

        function addLibraries(libraries) {
            for (var key in libraries) {
                global[key] = require(libraries[key]);
            }
        }

        function addJQueryLocator() {
            By.addLocator('$', function () {
                var selector = arguments[0];
                var using = arguments[1] || document;
                var results = $(using).find(selector);
                var matches = [];
                if (!$.isArray(results)) {
                    matches.push(results.get(0));
                } else {
                    for (var i = 0; i < results.length; ++i) {
                        matches.push(results[i][0]);
                    }
                }
                return matches; // Return the whole array for webdriver.findElements.
            });
        }
    },

    onCleanUp: function (exitCode) {
        var q = require('q');
        var del = require('del');
        var deferred = q.defer();

        var reportsFolder = 'build/reports';
        var reportsFile = reportsFolder + '/consoleErrors.txt';
        var fs = require('fs');
        var archiver = require('archiver');

        fs.exists(reportsFile, function (exists) {
            if (!exists) {
                deferred.resolve(exitCode);
                return;
            }

            var archive = archiver.create('zip', {});

            var output = fs.createWriteStream(reportsFolder + '/consoleErrors.zip');
            archive.pipe(output);

            output.on('close', function () {
                del([reportsFolder + '/*.txt']).then(function () {
                    deferred.resolve(exitCode);
                });
            });

            archive.file(reportsFolder + '/consoleErrors.txt', {name: 'consoleErrors.txt'});
            archive.finalize();
        });

        return deferred.promise;
    },
    beforeLaunch: function () {
        printBanner();
    },
    params: {
        propertiesFn: function () {
            return {
                browser: browserName,
                os: platform
            };
        },
        visualreview: vr
    },
    jvmArgs: ['-Dwebdriver.gecko.driver=./node_modules/webdriver-manager/selenium/geckodriver-' + seleniumVersions.gecko],
    debug: true
};
