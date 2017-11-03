import jest from 'jest-cli';
import gulp from 'gulp';
import packageJSON from '../../package.json';

gulp.task('jest', (done) => {
    jest.runCLI({cache: true, config: packageJSON.jest, maxWorkers: 3}, '.').then((result) => {
        const error = result.results.success ? undefined : new Error('One or more tests has failed.');
        done(error);
    });
});
