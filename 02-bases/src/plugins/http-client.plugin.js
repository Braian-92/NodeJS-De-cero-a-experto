const axios = require('axios')

const httpClientPlugin = {
  get: async(url) => {
    // const resp = await fetch( url )
    // return await resp.json()
    const { data } = await axios.get( url )
    // console.log( data )
    return data
  },
  post: async(url, body) => {},
  put: async(url, body) => {},
  delete: async(url, body) => {}
}

module.exports = {
  http: httpClientPlugin,
}