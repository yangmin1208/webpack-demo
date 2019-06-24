//main.js是项目入口js文件

//使用import语法，导入jQuery
import $  from 'jquery'

//使用import语法，导入css样式
import './css/index.css'
//注意：webpack 默认只能打包处理 JS类型的文件，无法处理 其他非JS类型的文件
//如果要处理 非JS类型的文件，比如css样式文件，我们需要安装一些 合适的第三方loader加载器；
//1.如果要打包处理css样式文件，需要安装两个插件， 脚本命令：npm i style-loader css-loader -D
//2.打开webpack.config.js配置文件，在这个文件中 新增一个配置节点，叫做module，这是一个对象，在这个对象上，有个rules属性，
//这个属性是个数组，存放了所有第三方文件的匹配和处理规则

import './css/index.less'

import './css/index.scss'

//导入字体文件
import 'bootstrap/dist/css/bootstrap.css'

$(function(){
    $('li:odd').css('backgroundColor','cyan')
    $('li:even').css('backgroundColor',function(){
        return '#' + 'D97634'
    })
})
//wabpack 能够处理JS文件的互相依赖关系
//webpack 能够处理坚实的兼容问题，能够将高级的，浏览器不识别的语法，转化为低级的，浏览器能够识别的语法

//使用 webpack-dev-server 这个工具，来实现自动打包编译的功能
//1.运行npm i webpack-dev-server -D 把这个工具安装到项目的本地开发依赖
//2，安装完毕后，这个工具的用法，和webpack命令的用法完全一致
//3.注意：如果是本地安装webpack-dev-server，终端中无法将其作为脚本运行-》'webpack-dev-server' 不是内部或外部命令，也不是可运行的程序
//4.只有那些安装到全局 "-g" 的工具，才能在终端中运行
//5.webpack-dev-server 帮我们打包成的bundle.js并没有存到实际的物理磁盘上，而是直接托管到了电脑的内存中，
//所以，我们在项目跟目录中，根本找不到这个打包好的bundle.js. 我们可以认为webpack-dev-server 帮我们打包
//好的文件，以一种虚拟的形式，托管到了咋们的项目中的根目录，虽然看不到他，但是，可以认为和dist node_modules平级
//有一个看不见的文件，叫bundle.js