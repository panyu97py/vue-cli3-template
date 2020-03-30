import store from '@/store'

const urlList = [
    /oauth\/token/
]
export default (url) => {
    const token = store.getters.token || null
    const needOauth = urlList.every(item => {
        return !item.test(url)
    })
    if (needOauth && token) {
        return 'Bearer ' + token
    }
    return
}
