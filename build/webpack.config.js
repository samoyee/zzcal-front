const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === "development";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { getEntry } = require("./utils");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const chunks = getEntry("./src/pages/**?");

const __wd = path.resolve(__dirname, "../");

const entries = {},
    htmlPlugin = {};

for (let chunkName in chunks) {
    const { entry, template, filename } = chunks[chunkName];
    entries[chunkName] = entry;
    htmlPlugin[chunkName] = new HtmlWebpackPlugin({
        title: "ZZCAL",
        template,
        filename: `${isDev ? "" : "../templates/"}${chunkName}.html`,
        inject: true,
        chunks: ["manifest", "vendors", "commons", chunkName],
        minify: !isDev && {
            removeRedundantAttributes: true, // 删除多余的属性
            collapseWhitespace: true, // 折叠空白区域
            removeAttributeQuotes: true, // 移除属性的引号
            removeComments: true, // 移除注释
            collapseBooleanAttributes: true, // 省略只有 boolean 值的属性值 例如：readonly checked
        },
    });
}

module.exports = {
    mode: NODE_ENV,
    entry: {
        ...entries,
    },
    output: {
        path: path.resolve(__wd, "dist/static"),
    },
    resolve: {
        extensions: [".js", ".jsx"],
        modules: ["node_modules", path.join(__wd, "src/components")],
        alias: {
            api: path.join(__wd, "src/api"),
            components: path.join(__wd, "src/components"),
            images: path.join(__wd, "src/assets/images"),
            main: path.join(__wd, "src/main"),
            pages: path.join(__wd, "src/pages"),
            modules: path.join(__wd, "src/modules"),
            store: path.join(__wd, "src/store"),
            theme: path.join(__wd, "src/theme"),
            utils: path.join(__wd, "src/utils"),
        },
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            automaticNameDelimiter: "-",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: 10,
                },
                commons: {
                    test: /[\\/]src[\\/](api|components|main|store|theme|utils)[\\/]/,
                    name: "commons",
                    priority: 9,
                },
            },
        },
        runtimeChunk: {
            name: "manifest",
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/env", "@babel/react"],
                    plugins: [
                        "@babel/transform-runtime",
                        ["import", { libraryName: "antd", style: true }],
                        "@babel/plugin-proposal-export-default-from",
                        "@babel/plugin-proposal-logical-assignment-operators",
                        ["@babel/plugin-proposal-optional-chaining", { loose: false }],
                        ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
                        ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
                        "@babel/plugin-proposal-do-expressions",
                        ["@babel/plugin-proposal-decorators", { legacy: true }],
                        "@babel/plugin-proposal-function-sent",
                        "@babel/plugin-proposal-export-namespace-from",
                        "@babel/plugin-proposal-numeric-separator",
                        "@babel/plugin-proposal-throw-expressions",
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-syntax-import-meta",
                        ["@babel/plugin-proposal-class-properties", { loose: false }],
                        "@babel/plugin-proposal-json-strings",
                    ],
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(NODE_ENV),
            },
        }),
        ...Object.values(htmlPlugin),
        new CopyWebpackPlugin([
            { from: "public/file", to: "file" },
            { from: "public/i18n", to: "i18n" },
        ]),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
};
