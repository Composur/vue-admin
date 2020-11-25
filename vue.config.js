'use strict'
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const path = require('path')
// stylelint
const StyleLintPlugin = require('stylelint-webpack-plugin')
const defaultSettings = require('./src/settings.js')
// const os = require('os')
// const HappyPack = require('happypack')
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'
// gzip压缩
const productionGzipExtensions = ['html', 'js', 'css']
// 多线程打包
// const HappyPackThreadPool = HappyPack.ThreadPool({
//   size: Math.ceil(os.cpus().length / 2)
// })
// 导入速度分析插件
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

// pwa
const WorkboxPlugin = require('workbox-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

const port = process.env.port || process.env.npm_config_port || 8888 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  devServer: {
    hot: true, // 热加载 只重新打包修改的文件 只对于 style 文件
    host: process.env.HOST || '0.0.0.0', // ip地址
    port, // 端口
    // https: false, //false关闭https，true为开启
    // open: true, //自动打开浏览器
    proxy: {
      '/api': {
        // 本地
        target: 'http://localhost:8084/',
        changeOrigin: true // 支持跨域
        // pathRewrite:{ //重写路径
        //   "^/api":''
        // }
      }
    },
    watchOptions: {
      ignored: ['node_modules/**']
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    performance: {
      maxEntrypointSize: 400000
    },
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new StyleLintPlugin({
        'files': ['**/*.{html,vue,css,sass,scss}'],
        'fix': false,
        'cache': true,
        'emitErrors': true,
        'failOnError': false
      }),
      // 暂时用不到多进程打包，得不偿失。
      // new SpeedMeasurePlugin({
      //   module: {
      //     rules: [
      //       {
      //         test: /\.js$/
      //         use: ['thread-loader']
      //       }
      //     ]
      //   }
      // }),
      // new HappyPack({
      //   // 用id来标识 happypack处理那里类文件
      //   id: 'vueLoader',
      //   // 如何处理  用法和loader 的配置一样
      //   loaders: [
      //     {
      //       loader: 'vue-loader'
      //     }
      //   ],
      //   // 共享进程池
      //   threadPool: HappyPackThreadPool,
      //   // 允许 HappyPack 输出日志
      //   verbose: true
      // }),
      // new HappyPack({
      //   // 用id来标识 happypack处理那里类文件
      //   id: 'babelLoader',
      //   // 如何处理  用法和loader 的配置一样
      //   loaders: [
      //     {
      //       loader: 'babel-loader'
      //     }
      //   ],
      //   // 共享进程池
      //   threadPool: HappyPackThreadPool,
      //   // 允许 HappyPack 输出日志
      //   verbose: true
      // }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./vendor-manifest.json')
      }),
      new CopyPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
        { from: 'static', to: 'static' }
      ]),
      new WebpackBar(),
      isProduction ? new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' + productionGzipExtensions.join('|') + ')$'
        ),
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      }) : () => {},
      new WorkboxPlugin.GenerateSW({
        // Do not precache images
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],
        // Define runtime caching rules.
        runtimeCaching: [{
          // Match any request that ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          // Apply a cache-first strategy.
          handler: 'CacheFirst',
          options: {
            // Use a custom cache name.
            cacheName: 'images',
            // Only cache 10 images.
            expiration: {
              maxEntries: 10
            }
          }
        }]
      })
    ]
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // 默认为 true
        // 这意味着编译好的渲染函数会保留所有 HTML 标签之间的空格。如果设置为 false，则标签之间的空格会被忽略。这能够略微提升一点性能但是可能会影响到内联元素的布局。
        options.compilerOptions.preserveWhitespace = true
        // 可以在组件中这样引入图片、 <avatar img-src="./assets/default-avatar.png"></avatar>
        // 等价于 require('xxx.png')
        options.transformAssetUrls = {
          avatar: 'img-src'
        }
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(
        process.env.NODE_ENV === 'development',

        // config => config.devtool('cheap-source-map')
        // 需要 Chrome debugger 为了便于调试 牺牲性能
        //  http://webpack.docschina.org/configuration/devtool/#%E5%AF%B9%E4%BA%8E%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83
        config => config.devtool('eval-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
      // ============压缩图片 start============
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        .end()
        // ============压缩图片 end============
    })
  }
}
