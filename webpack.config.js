const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    entry: 'index.html',
    plugins: [
        new HtmlWebpackPlugin({
            inlineSource: '.(js|css|html)$' // embed all javascript and css inline
        }),
        new HtmlWebpackInlineSourcePlugin()
      ]  
}