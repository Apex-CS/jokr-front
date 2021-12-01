module.exports = {
  reactStrictMode: true, 
  async rewrites() {
    return [
      {
        source: '/api/addProducts',
        destination: 'http://localhost:8080/api/addProducts'
      },{
        source: '/api/showProducts',
        destination: 'http://localhost:8080/api/showProducts'
      }
    ]
  }
}