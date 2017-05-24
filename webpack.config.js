var webpack = require('webpack')
var path = require('path')
var envFile = require('node-env-file')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'))
} catch (err) {

}
// module.exports = {
//   entry: [
//     './app/app.jsx'
//   ],
//   output: {
//     path: __dirname,
//     filename: './public/bundle.js'
//   },
//   resolve: {
//     modules: [
//       path.join(__dirname, 'app/'),
//       'node_modules',
//       './app/components'
//     ]
//   },
//   node: {
//     readline: 'empty'
//   },
//   module: {
//     // loaders tell webpack what to do with odd files
//     loaders: [
//       {
//         test: /\.json$/,
//         loader: 'json'
//       },
//       {
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015', 'stage-0']
//         },
//         // apply to every file ending in .jsx
//         test: /\.jsx?$/,
//         // UNLESS they're in either of these folders
//         exclude: /(node_modules|bower_components)/
//       }
//     ]
//   }
// }

var webpack = require('webpack')
var path = require('path')

module.exports = {
  context: path.resolve(__dirname, './app'),
  entry: {
    app: 'app.jsx',
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'app/components/'),
      Asana: path.resolve(__dirname, 'app/api/asana.jsx'),
      AppStyles: path.resolve(__dirname, 'app/styles/app.scss')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.CLIENT_ID),
        API_KEY: JSON.stringify(process.env.CLIENT_SECRET)
      }
    })
  ],
  node: {
    readline: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015', 'stage-0'] },
        }],
      },
    ],
  },
}
