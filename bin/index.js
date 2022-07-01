#! /usr/bin/env node

const os = require('os'),
    platform = os.platform(),
    win = require('../lib/win'),
    program = require('../util/commander')()
    
const platforms = {
    win32: win
}

platforms[platform](program.opts().reset)