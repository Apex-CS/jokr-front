module.exports = {
  reactStrictMode: true, 
  images: {
    domains: ['novaradio.com.ar', 'novaradio.com.ar'],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/products',
        destination: `${process.env.NEXT_PUBLIC_ENV}/api/v1/products`
      },
      {
        source: '/api/v1/products/:id',
        destination: `${process.env.NEXT_PUBLIC_ENV}/api/v1/products/:id`
      },
      {
        source: '/api/v1/Users',
        destination: `${process.env.NEXT_PUBLIC_ENV}/api/v1/Users`
      },
      {
        source: '/api/v1/Users/:id',
        destination: `${process.env.NEXT_PUBLIC_ENV}/api/v1/Users/:id`
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