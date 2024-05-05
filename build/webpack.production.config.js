const { merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config");
const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const __wd = path.resolve(__dirname, "../");

module.exports = smp.wrap(
    merge(webpackConfig, {
        devtool: false,
        output: {
            publicPath: "/",
            filename: "js/[name].[contenthash:8].js",
            chunkFilename: "js/[name].[chunkhash:8].js",
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|svg|gif|ico)$/,
                    loader: "file-loader",
                    include: path.join(__wd, "src/assets"),
                    options: {
                        limit: 512,
                        name: "images/[name].[contenthash:8].[ext]",
                    },
                },
                {
                    test: /\.(woff2?|svg|ttf|eot)$/,
                    include: path.join(__wd, "src/theme"),
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[contenthash:8].[ext]",
                    },
                },
                {
                    test: /\.(less|css)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: `/erp/`,
                            },
                        },
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
        plugins: [
            new CleanWebpackPlugin(["dist"], {
                root: __wd,
            }),
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[chunkhash:8].css",
            }),
            new BundleAnalyzerPlugin(),
            new OptimizeCSSAssetsPlugin({
                // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
                assetNameRegExp: /\.(le|sa|sc|c)ss$/g,
                // 指定一个优化css的处理器，默认cssnano
                cssProcessor: require("cssnano"),

                cssProcessorPluginOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true }, //对注释的处理
                            normalizeUnicode: false, // 建议false,否则在使用unicode-range的时候会产生乱码
                        },
                    ],
                },
                canPrint: true, // 是否打印编译过程中的日志
            }),
        ],
    })
);

// const WebpackBar =  require('webpackbar');