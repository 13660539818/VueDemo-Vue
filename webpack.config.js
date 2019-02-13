const path = require('path');
// 启用热更新的第二步
const webpack = require('webpack');
// 导入在内存中生成HTML页面的插件
// 作用：
//    1.自动在内存中根据指定页面生成一个页面
//    2.自动把bundle.js追加到生成的页面中
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/main.js'), //表示要使用webpack打包哪个文件
    output: {
        path: path.join(__dirname, './dist'), // 指定输出文件的目录
        filename: 'bundle.js'  //指定输出文件的名称
    },
    devServer: {
        // 配置dev-server命令参数的第二种形式（第一种方式：在package.json文件中修改）
        open: true, // 自动打开浏览器
        port: 3000, // 设置启动时候的运行端口
        contentBase: 'src', // 指定托管根目录
        hot: true  // 启用热更新 的 第一步
    },
    plugins: [
        // 配置插件的节点
        new webpack.HotModuleReplacementPlugin(), //启用热更新的第三步
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), // 指定模板页面
            fulename: 'index.html' //指定生成页面的名称
        })
    ],
    module: {
        // 配置所有第三方模块加载器
        rules: [
            {
                // 配置处理.css文件的第三方模块的规则
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'] // loader从右到左调用
            },
            {
                // 配置处理.less文件的第三方模块的规则
                test: /\.less$/, 
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 配置处理.scss文件的第三方模块的规则
                test: /\.scss$/, 
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                // 配置处理 图片路径 的第三方模块的规则
                test: /\.(jpg|png|gif|bmp|jpeg)$/, 
                use: 'url-loader?limit=7632&name=[hash:8]-[name].[ext]'
                // limit给定值是图片的大小，单位是byte，如果我们引用的图片，大于或等于给定的limit值，则不会被转为base64格式的字符串，㘝图片小于给定的limit值，则会被转为base64的字符串
            },
            {
                // 配置处理 字体图标 的第三方模块的规则
                test: /\.(ttf|woff||eot|svg|woff2)$/, 
                use: 'url-loader'
            },
            {
                // 配置处理 高级语法 的第三方模块的规则
                test: /\.js$/, 
                use: 'babel-loader',
                exclude: /node_modules/  // 排除node_modules目录，以免babel把其中的第三方js文件打包编译，消耗CPU，导致项目无法运行
            },
            {
                // 配置处理.vue 的第三方模块的规则
                test: /\.vue$/, 
                use: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            // 设置vue被导入时的包的路径
            // "vue$": "vue/dist/vue.js"
        }
    }
};


// 当我们在控制台输入webpack命令执行的时候，webpack做了以下几步
// 1.去项目根目录查找webpack.config.js配置文件
// 2.解析执行配置文件，得到配置文件中导出的配置对象
// 3.拿到配置对象后，就拿到了配置对象中指定的入口和出口，然后进行打包构建


// webpack-dev-server 支持热更新
// 在项目本地安装无法直接使用webpack-dev-server命令执行
