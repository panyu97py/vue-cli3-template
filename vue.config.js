const path = require('path');//引入path模块

function resolve(dir) {
    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

console.log(`NODE_ENV:${process.env.NODE_ENV}`, `VUE_APP_API_ENV:${process.env.VUE_APP_API_ENV}`, `API_ENV:${process.env.API_ENV}`)
module.exports = {
    lintOnSave: 'error',
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
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:9090',
                ws: true,
                changeOrigin: true
            },
        }
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/styles/index.scss";`
            }
        }
    }
}

