const { defineConfig } = require('@vue/cli-service')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const webpack = require('webpack')

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        __VUE_PROD_DEVTOOLS__: false,
      }),
      new ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
          packageA: `packageA@${process.env.VUE_APP_PACKAGE_A_URL}/remoteEntry.js`,
          packageB: `packageB@${process.env.VUE_APP_PACKAGE_B_URL}/remoteEntry.js`,
          menu: `menu@${process.env.VUE_APP_MENU_URL}/remoteEntry.js`
        },
        shared: {
          vue: {
            singleton: true,
            eager: true,
            requiredVersion: '^3.2.13'
          }
        }
      })
    ]
  },
  devServer: {
    port: 8080,
    hot: true
  }
})
