module.exports = {
    mode: 'development',
    context: __dirname,
    entry: {
        Index: "./Components/Index.jsx",
        Customer:  "./Components/Customer.jsx",
        Product: "./Components/Product.jsx",
        Store: "./Components/Store.jsx",
        Sales: "./Components/sales.jsx"
    },
    output: {
        path: __dirname + "/dist",
       // filename: "bundle.js"
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    watch: true,
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env', 'babel-preset-react']
                }
            }
        }]
    }
}

