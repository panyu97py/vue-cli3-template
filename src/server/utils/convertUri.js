import apiConfig from '@/server/config'
const api_env = process.env.VUE_APP_API_ENV
const api = apiConfig[api_env]
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
