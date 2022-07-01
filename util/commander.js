module.exports = function () {
    const { program } = require('commander'),
        op = require('../package.json')

    program
        .version(op.version, '-v, --version', '输出当前版本')
        .option('-r, --reset', '恢复原来的hosts文件')
        .helpOption('-h, --help', '显示命令帮助')
        .addHelpText('after', `
示例:
    $ zx-github             备份原来hosts文件，替换hosts
    $ zx-github -r, --rest  恢复原来的hosts文件`
    )
    .parse(process.argv)

    return program
}