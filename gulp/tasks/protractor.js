import gulp from 'gulp';
import {protractor, webdriver_update} from 'gulp-protractor';
import env from 'gulp-env';
import rimraf from 'rimraf';
import {e2eTestDir, nodeModulesDir, testDir} from '../utils/paths';
import {proxyPort} from '../utils/connection';
import seleniumVersion from './selenium-versions.json';

const argv = require('yargs').argv;

gulp.task('webdriver-update', ['webdriver-cleanup'], (done) => {
    webdriver_update({
        browsers: ['chrome', 'gecko'],
        webdriverManagerArgs: [
            '--versions.gecko',
            seleniumVersion.gecko,
            '--versions.chrome',
            seleniumVersion.chrome
        ]
    }, done);
});

gulp.task('webdriver-cleanup', (cb) => {
    rimraf(`${nodeModulesDir}/webdriver-manager/selenium`, cb);
});

export const runProtractor = (envs) => {
    let protractorArgs = ['--params.proxyPort', proxyPort.toString()];
    if (argv.suite) {
        protractorArgs = protractorArgs.concat(['--suite', argv.suite]);
    }
    console.log('starting protractor with arguments', protractorArgs);
    gulp
        .src([`${testDir}/e2e/*.coffee`])
        .pipe(envs)
        .pipe(protractor({
            configFile: `${e2eTestDir}/config/protractor.conf.js`,
            args: protractorArgs
        }))
        .on('end', () => {
            process.exit(0);
        })
        .on('error', (error) => {
            throw error;
        });
};

gulp.task('protractor', () => runProtractor(env.set({})));
