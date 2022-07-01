const fs = require('fs'),
    https = require('https'),
    iconv = require('iconv-lite'),
    process = require('child_process')

const isExists = path => {
    try {
        const o = fs.statSync(path)
        return o.isFile()
    }catch(err) {
        return false
    }
}

const download = (path, n) => {
    https.get('https://raw.hellogithub.com/hosts', res => {
        let str = ''
        res.on('data', chunk => (str += chunk))
        res.on('end', () => {
            try {
                fs.writeFile(path + n, str, err => {
                    if(err) return console.log('写入临时文件出错')
                    rename(path, n, 'hosts', '替换下载hosts文件时出错')
                    console.log('替换hosts文件成功')
                    runShellFlushDns()
                })
            }catch(err) {
                console.log(err)
            }
        })
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`)
    })
}

const reset = (path, n) => {
    const isOk = isExists(path + n)
    if(isOk) {
        if(isExists(path + 'hosts')) {
            fs.unlinkSync(path + 'hosts')
        }
        rename(path, 'hosts_zx_backups', 'hosts', '还原系统hosts文件时出错')
        console.log('还原系统hosts文件成功')
        runShellFlushDns()
    }else {
        console.log('没有找到备份文件，无法恢复')
    }
}

const init = (path, n) => {
    if(!isExists(path + 'hosts_zx_backups')) {
        rename(
            path, 
            'hosts', 
            'hosts_zx_backups', 
            '备份系统hosts文件时出错'
        )
    }
    setTimeout(download.bind(null, path, n), 500)
}

const rename = (root, path, nPath, info) => {
    const isOk = isExists(root + path)
    if(isOk) {
        try {
            fs.renameSync(root + path, root + nPath)
        }catch (err) {
            console.log(info)
        }
    }else {
        console.log(path + '文件不存在')
    }
}

const runShellFlushDns = () => {
    process.exec('ipconfig /flushdns', { encoding: 'binary' }, (err, stdout) => {
        if(err) return
        console.log(iconv.decode(Buffer.from(stdout, 'binary'), 'cp936'))
    })
}

module.exports = { init, reset }