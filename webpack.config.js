const path = require('path');
const webpack = require('webpack');
const Htmlwebpackplugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };

  if (preset) {
    options.presets.push(preset);
  }

  return options;
};

const jsLoaders = (preset = false) => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(preset),
    },
  ];

  if (isDev) {
    loaders.push({
      loader: 'eslint-loader',
      options: {
        fix: true,
      },
    });
  }

  return loaders;
};

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const plugins = () => {
  const base = [
    new Htmlwebpackplugin({
      template: './teamplate.html',
      title: 'Лабдиагностика',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: `${__dirname}/src/assets/img`, to: 'img/' },
        { from: `${__dirname}/src/assets/fonts`, to: 'fonts/' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
    }),
  ];

  if (isDev) {
    base.push(new webpack.HotModuleReplacementPlugin());
  }

  // if (isProd) {
  //   base.push(new WebpackBundleAnalyzer());
  // }

  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.jsx'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      sass: path.resolve(__dirname, 'src/sass/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      common: path.resolve(__dirname, 'src/components/common/'),
      store: path.resolve(__dirname, 'src/store/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      icons: path.resolve(__dirname, 'src/icons/'),
      assets: path.resolve(__dirname, 'src/assets/'),
    },
  },
  optimization: optimization(),
  devServer: {
    port: '3000',
    hot: isDev,
  },
  plugins: plugins(),
  devtool: isDev ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-typescript'),
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-react'),
      },
      {
        test: /\.s[ac]ss/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: {
          test: /\.jsx?$/,
        },
        use: [
          'babel-loader',
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                pretty: true,
                multipass: true,
                plugins: [
                  { sortAttrs: true },
                  { removeDimensions: true },
                  { removeStyleElement: true },
                  { removeAttrs: { attrs: '(xmlns.*)' } },
                ],
              },
              semi: false,
              singleQuote: true,
              icon: true,
            },
          },

          'url-loader',
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          'url-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
    ],
  },
};
