module.exports = {
  reactStrictMode: true, 
  images: {
    domains: ['novaradio.com.ar', 'novaradio.com.ar'],
  },
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
  }
}