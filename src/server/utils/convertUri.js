import apiConfig from '@/server/config'
const api_env = process.env.API_ENV
const api = apiConfig[api_env]
console.log(`API_ENV:${process.env.API_ENV}`)
/**
 * uri转url
 */
export default url => {
  for (const key in api) {
    const reg = new RegExp(`^/?:${key}`)
    if (reg.test(url)) {
      return url.replace(reg, api[key])
    }
  }
  return url
}
