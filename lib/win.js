const { init, reset } = require('../util/win'),
    MIN_DEFAULT_PATH = 'C:/Windows/System32/drivers/etc/'

const win = function (isReset) {
    if(isReset) {
        reset(MIN_DEFAULT_PATH, 'hosts_zx_backups')
    }else {
        init(MIN_DEFAULT_PATH, 'hosts_zx_temporary')
    }
}

module.exports = win