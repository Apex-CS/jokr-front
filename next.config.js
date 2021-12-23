module.exports = {
  reactStrictMode: true, 
  images: {
    domains: ['novaradio.com.ar', 'novaradio.com.ar','res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/products',
        destination: `${process.env.SPRING_API_KEY}/api/v1/products`
      },
      {
        source: '/api/v1/products/:id',
        destination: `${process.env.SPRING_API_KEY}/api/v1/products/:id`
      },
      {
        source: '/api/v1/products/image',
        destination: `${process.env.SPRING_API_KEY}/api/v1/products/image`
      },
      {
        source: '/api/v1/products/image/:id_image',
        destination: `${process.env.SPRING_API_KEY}/api/v1/products/image/:id_image`
      },
      {
        source: '/api/v1/Users',
        destination: `${process.env.SPRING_API_KEY}/api/v1/users`
      },
      {
        source: '/api/v1/Users/:id',
        destination: `${process.env.SPRING_API_KEY}/api/v1/Users/:id`
      },
      {
        source: '/api/v1/categories',
        destination: `${process.env.SPRING_API_KEY}/api/v1/categories`
      },
      {
        source: '/api/v1/subcategories/:id',
        destination: `${process.env.SPRING_API_KEY}/api/v1/subcategories/:id`
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