const { isExists, rename, runShellFlushDns, download, delFile } = require('./index')

const init = async (path, n) => {
    if(!isExists(path + 'hosts_zx_backups')) {
        rename(
            path, 
            'hosts', 
            'hosts_zx_backups', 
            '备份系统hosts文件时出错'
        )
    }
    await download(path, n) && runShellFlushDns('ipconfig /flushdns')
}

const reset = (path, n) => {
    const isOk = isExists(path + n)
    if(isOk) {
        if(isExists(path + 'hosts')) {
            delFile(path + 'hosts')
        }
        rename(path, 'hosts_zx_backups', 'hosts', '还原系统hosts文件时出错')
        console.log('还原系统hosts文件成功')
        runShellFlushDns('ipconfig /flushdns')
    }else {
        console.log('没有找到备份文件，无法恢复')
    }
}


module.exports = { init, reset }