const path = require('path');//引入path模块

function resolve(dir) {
    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
    lintOnSave:'error',
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
        config.module.rules.delete("svg");
        config.module
            .rule('svg-smart')
            .test(/\.svg$/)
            .include
            .add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
    css: {
        loaderOptions:{
            scss:{
                prependData: `@import "~@/styles/index.scss";`
            }
        }
    }
}

