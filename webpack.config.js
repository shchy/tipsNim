const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    mode: 'development',
    entry: './src/main.ts',
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
                include: `${__dirname}/src`,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }

            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.vue', '.js'
        ],
        alias: {
            vue$: 'vue/dist/vue.js',
            '@': `${__dirname}/src`
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