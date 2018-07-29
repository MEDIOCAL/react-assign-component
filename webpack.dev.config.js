var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
        home: ['./demo/main.js'],
        common: ['babel-polyfill']
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].js',
        chunkFilename: '[id].build.js?[chunkhash]',
        publicPath: '/',
    },
    module: {
        rules: [
            {         
                test:/\.(js|jsx)?$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                options:{presets:['env','react','stage-0','stage-1','stage-2']}
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.styl', '.html', '.json'],
        modules: ['node_modules']
    },
    plugins: [
        new ExtractTextPlugin('[name].[contenthash:20].css'),
        new webpack.optimize.CommonsChunkPlugin({names:['common'], filename: '[name].js'}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
              title: "component",
              template: path.join(path.resolve(__dirname),'/build/myApp.html'),  //模板文件
              inject:'body',
              hash:true,    //为静态资源生成hash值
              minify:{    //压缩HTML文件
                removeComments:false,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
              },
              chunks: ['common', 'home']
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    }
}