// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: ['./src/index.ts'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        open: true,
        host: "localhost",
        port: 3000,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: false,
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                options: { transpileOnly: true },
                exclude: ['/node_modules/'],
            },
            // This is an alternative way to handle our styles: by injecting it into html in <style></style>
            // {
            //     test: /\.sass$/i,
            //     use: [   'style-loader', // 3. Injects styles into the DOM.
            //              'css-loader'    // 2. Turns css into js.
            //              'sass-loader'], // 1. Turns sass into css.
            // },
            {
                test: /\.sass$/i,
                use: [
                // 4. Optional: place a link tag on js script load. In our case we already have it in the index.html
                // {loader: "style-loader",options: {injectType: "linkTag"}},
                { // 3. Place styles.css into the dist folder.
                    loader: 'file-loader',
                    options: {
                        name: 'styles.css'
                    }
                },
                "postcss-loader", // 2. Sort the parameters alphabetically
                'sass-loader', // 1. Turns sass into css.
                ]
            },
            {
                test: /\.(handlebars|hbs)$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.(svg)$/i,
                use: [                
                    {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]'
                    }
                    }]
            }

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
