const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const fs = require('fs');
const isDevelopment = process.env.NODE_ENV === 'development';
const entryMap = {};
const templates = [];
const webpackDevServerRouting = [];

fs.readdirSync('./src/pages/').filter(file => {
  return file.match(/.*\.html$/);
})
.forEach(f => {
  const filename = f.replace(/\.html$/, '');
  entryMap[filename] = [
    path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
    path.resolve(__dirname, 'node_modules/popper.js/dist/popper.min.js'),
    path.resolve(__dirname, `src/app/${filename}/${filename}.js`)
  ];
  templates.push(new HtmlWebPackPlugin({
    template: path.resolve(__dirname, `src/pages/${filename}.html`),
    filename: `./${filename}.html`,
    chunks: [filename],
  }));
  webpackDevServerRouting.push({ from: new RegExp(`^\/${filename}`), to: `/${filename}.html` });
});

module.exports = {
  entry: entryMap,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      '@/pages': path.resolve(__dirname, 'src/pages/'),
      '@/assets': path.resolve(__dirname, 'src/assets/'),
      '@/styles': path.resolve(__dirname, 'src/styles/',),
      '@/app': path.resolve(__dirname, 'src/app/'),
    }
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'dist/assets') }
      ]
    }),
    ...templates,
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '/dist'),
    hot: true,
    port: 9000,
    historyApiFallback: {
      rewrites: webpackDevServerRouting,
    }
  }
}
