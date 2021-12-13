module.exports = {
  reactStrictMode: true, 
  images: {
    domains: ['novaradio.com.ar', 'novaradio.com.ar'],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/products',
        destination: 'http://localhost:8080/api/v1/products'
      },
      {
        source: '/api/v1/products/:id',
        destination: 'http://localhost:8080/api/v1/products/:id'
      },
      {
        source: '/api/v1/Users',
        destination: 'http://localhost:8080/api/v1/Users'
      },
      {
        source: '/api/v1/Users/:id',
        destination: 'http://localhost:8080/api/v1/Users/:id'
      },
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