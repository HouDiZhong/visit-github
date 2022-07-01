#! /usr/bin/env node

const os = require('os'),
    platform = os.platform(),
    program = require('../util/commander')()

const platforms = {
    win32: require('../lib/win'),
    darwin: require('../lib/darwin')
}

platforms[platform](program.opts().reset)