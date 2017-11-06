import os from 'os';

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

const argv = require('yargs').argv;

export const appPort = 5000;

export const appHost = os.hostname();