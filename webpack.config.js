const path = require('path')
//热部署第二步(require括号里面是安装的插件的名字)
const webpack = require('webpack')
//使用npm安装完成的插件，使用这种形式来引用，在plugin数组里面进行使用
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //__dirname是根目录
    entry: path.join(__dirname,'./src/main.js'),
    output: {
        path: path.join(__dirname,'./dist'),
        filename: 'bundle.js'
    },
    //定义webpack-dev-server 的第二种方式，
    //相对于webpack-dev-server --open --port 3000 --contentBase src --hot 要复杂点
    devServer: {
        open: true,//编译完，自动打开浏览器
        port: 3000,//设置启动时候的运行端口
        contentBase: 'src',//设置托管的根目录,要使用引号括起来
        hot: true //启用热部署 , 热部署第一步
    },
    plugins:[//配置插件的节点
        new webpack.HotModuleReplacementPlugin(),//new一个热更新的模块对象，热部署第三步
        new htmlWebpackPlugin({//创建一个在内存中生成html的插件
            template: path.join(__dirname,'./src/index.html'),//指定目标页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html'//指定生成页面的名称
        })
    ],

    module:{
        //用于配置所有的第三方模块的匹配规则
        rules:[
            //使用正则进行匹配,定义css样式匹配规则
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            //使用正则进行匹配,定义less样式匹配规则
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
             //使用正则进行匹配,定义sass样式匹配规则
             {
                test:/\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            //处理url里面图片的loader
            {
                test: /\.(jpg|png|bmp|gif|jpeg)$/,
                //使用这种方式就不会了
                //由于webpack的版本更新，下面这种写法会报错 options.limit should be boolean,number
                //use: 'url-loader?limit=1000&name=[hash:8]-[name].[ext]'
                //使用这种option参数方式就不会了
                loader: 'url-loader',
                options:{
                    limit: 34816,
                    name: '[hash:8]-[name].[ext]'
                }
                
                //这里url-loader后面可以添加参数进行图片size的操作，limit给定的值是图片的大小单位是byte，
                //如果引用的图片的大小大于或等于limit的值，则会转换成base64的格式的字符串，
                //如果小于limit值，则不会被转为base64的字符串
                //2.还可以对图片取原名字格式：[name].[ext],注意为避免不同文件下有相同文件时，
                //后者的图片文件会覆盖掉前者的图片文件 的情况，会在前面添加一个hash值来进行区分
            },
            //url-loader也可以处理字体文件
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                use: 'url-loader'
            }
        ]
    }
}