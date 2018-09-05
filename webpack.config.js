const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    mode: 'development',
    entry: './client/main.ts',
    output: {
        path: `${__dirname}/server/assets/dist`,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.ts$/,
                include: `${__dirname}/client`,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }

            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.vue', '.js'
        ],
        alias: {
            vue$: 'vue/dist/vue.js',
            '@': `${__dirname}/client`
        }
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        contentBase: `${__dirname}`,
        port: 8080,
        historyApiFallback: true,
    },

}