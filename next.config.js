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
        source: '/api/v1/users',
        destination: `${process.env.SPRING_API_KEY}/api/v1/users`
      },
      {
        source: '/api/v1/users/:id',
        destination: `${process.env.SPRING_API_KEY}/api/v1/users/:id`
      },
      {
        source: '/api/v1/users/image',
        destination: `${process.env.SPRING_API_KEY}/api/v1/users/image`
      },
      {
        source: '/api/v1/users/image/:id_image',
        destination: `${process.env.SPRING_API_KEY}/api/v1/users/image/:id_image`
      },
      {
        source: '/api/v1/categories',
        destination: `${process.env.SPRING_API_KEY}/api/v1/categories`
      },
      {
        source: '/api/v1/subcategories/categories/:id',
        destination: `${process.env.SPRING_API_KEY}/api/v1/subcategories/categories/:id`
      },

      {
        source: '/api/v1/public/Auth',
        destination: `${process.env.SPRING_API_KEY}/api/v1/public/Auth`
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