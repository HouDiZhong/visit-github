const { init, reset } = require('../util/darwin')

const darwin = function (isReset) {
    if(isReset) {
        reset('/etc/', 'hosts_zx_backups')
    }else {
        init('/etc/', 'hosts_zx_temporary')
    }
}

module.exports = darwin