const { merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config");
const path = require("path");

const __wd = path.resolve(__dirname, "../");

const entry = webpackConfig.entry;

const historyApiRewrites = [];

Object.keys(entry).forEach((chunkName) => {
    historyApiRewrites.push({
        from: new RegExp(`^\\/${chunkName}(\\/.*)*`),
        to: `/${chunkName}.html`,
    });
});

module.exports = merge(webpackConfig, {
    devServer: {
        contentBase: path.join(__dirname, "public"),
        historyApiFallback: {
            rewrites: historyApiRewrites,
        },
        proxy: {
            "/calculate": {
                target: "http://121.196.216.228:8090",
            },
            "/pay": {
                target: "http://121.196.216.228:8090",
            },
            "/userInfo": {
                target: "http://121.196.216.228:8090",
            },
        },
    },
    devtool: "cheap-module-source-map",
    output: {
        publicPath: `/`,
        filename: "js/[name].js",
        chunkFilename: "js/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|svg|gif|ico)$/,
                loader: "file-loader",
                include: path.join(__wd, "src/assets"),
                options: {
                    limit: 512,
                    name: "images/[name].[ext]",
                },
            },
            {
                test: /\.(woff2?|svg|ttf|eot)$/,
                include: path.join(__wd, "src/theme"),
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]",
                },
            },
            {
                test: /\.(less|css)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [require("autoprefixer")],
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            modifyVars: {
                                "@table-border-radius-base": "0",
                            },
                        },
                    },
                ],
            },
        ],
    },
});
