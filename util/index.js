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
    return new Promise((resolve, reject) => {
        https.get('https://raw.hellogithub.com/hosts', res => {
            let str = ''
            res.on('data', chunk => (str += chunk))
            res.on('end', () => {
                fs.writeFile(path + n, str, err => {
                    if(err){
                        reject(false)
                        console.log('写入临时文件出错')
                        return
                    } 
                    rename(path, n, 'hosts', '替换下载hosts文件时出错')
                    console.log('替换hosts文件成功')
                    resolve(true)
                })
            })
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`)
        })
    })
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

const delFile = path => fs.unlinkSync(path)

const runShellFlushDns = shell => {
    process.exec(shell, { encoding: 'binary' }, (err, stdout) => {
        if(err) return
        console.log(iconv.decode(Buffer.from(stdout, 'binary'), 'cp936'))
    })
}

module.exports = { isExists, rename, runShellFlushDns, download, delFile }