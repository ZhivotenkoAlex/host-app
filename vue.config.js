const { defineConfig } = require('@vue/cli-service')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin

module.exports = defineConfig({
  // publicPath: 'http://localhost:8080/',
  publicPath: 'https://package-host.web.app/',
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
          // packageA: 'packageA@http://localhost:8081/remoteEntry.js',
          // packageB: 'packageB@http://localhost:8082/remoteEntry.js',
          // menu: 'menu@http://localhost:8083/remoteEntry.js'
          packageA: 'packageA@https://package-a.web.app/remoteEntry.js',
          packageB: 'packageB@https://package-b.web.app/remoteEntry.js',
          menu: 'menu@https://package-menu.web.app/remoteEntry.js'
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
