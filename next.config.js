module.exports = {
  reactStrictMode: true, 
  async rewrites() {
    return [
      {
        source: '/api/addProducts',
        destination: 'http://localhost:8080/products'
      },{
        source: '/api/showProducts',
        destination: 'http://localhost:8080/products'
      }
    ]
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
}