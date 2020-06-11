// 编译es6语法
import babel from 'rollup-plugin-babel';
// 服务
import serve from 'rollup-plugin-serve';

export default {
    // 入口
    input: './src/index.js',
    // 打包的出口
    output: {
        format: 'umd', // amd commonjs规范，默认将打包后的结果挂载到window上
        file: 'dist/vue.js', // 打包出的vue.js文件  new Vue
        name: 'Vue', // 挂到window上的变量
        sourcemap: true, // 可以看到源码映射
    },
    plugins: [
        babel({ // es6 转 es5
            exclude: 'node_modules/**', // 不编译谁 - 排除文件的操作 glob
        }),
        serve({ // 开启本地服务
            open: true, // 
            openPage: '/public/index.html', // 服务启动后打开的页面
            port: 3000,
            contentBase: '' // 基础内容，在当前目录打包
        })
    ]
}