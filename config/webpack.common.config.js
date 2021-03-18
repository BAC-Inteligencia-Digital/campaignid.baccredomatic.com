const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin   = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index',
        home: './src/home',
        consulta: './src/consulta',
        codigo: './src/codigo',
        editar: './src/editar',
        eliminar: './src/eliminar',
        crearUsuario: './src/crear-usuario'
     },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: [/.js$|.ts$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/typescript'
                        ]
                    }
                }
            },
            {
                test: [/.css$|.scss$/],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        alias: {
            '@scss': path.resolve(__dirname, '../src/styles/scss'),
            '@img': path.resolve(__dirname, '../src/assets/images'),
            '@': path.resolve(__dirname, '../src')
        },
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.ts']
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home Campaignid | BAC Credomatic',
            template: './src/home.html',
            inject: true,
            chunks: ['home'],
            filename: 'home.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Campaignid | BAC Credomatic',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Campaignid | BAC Credomatic | Consulta de Código',
            template: './src/consulta.html',
            inject: true,
            chunks: ['consulta'],
            filename: 'consulta.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Campaignid | BAC Credomatic | Consulta de Código',
            template: './src/codigo.html',
            inject: true,
            chunks: ['codigo'],
            filename: 'codigo.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Campaignid | BAC Credomatic | Editar Código de Campaña',
            template: './src/editar.html',
            inject: true,
            chunks: ['editar'],
            filename: 'editar.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Campaignid | BAC Credomatic | Crear usuario',
            template: './src/crear-usuario.html',
            inject: true,
            chunks: ['crearUsuario'],
            filename: 'crear-usuario.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Campaignid | BAC Credomatic | Eliminar Código de Campaña',
            template: './src/eliminar.html',
            inject: true,
            chunks: ['eliminar'],
            filename: 'eliminar.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[chunkhash].css'
        }),
        new CopyWebpackPlugin([{
            from: './src/assets/images',
            to: 'assets/images'
        }]),
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '..')
          }),
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default']
        })
    ]
}