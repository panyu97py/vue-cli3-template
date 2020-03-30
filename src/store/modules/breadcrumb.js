export default {
    state: {
        breadcrumbList: []
    },
    getters: {
        breadcrumbList: state => state.breadcrumbList
    },
    mutations: {
        SET_BREADCRUMB_LIST (state, breadcrumbList) {
            state.breadcrumbList = breadcrumbList
        }
    },
    actions: {
        setBreadcrumbList ({ commit }, breadcrumbList) {
            commit('SET_BREADCRUMB_LIST', breadcrumbList)
        },
        clearBreadcrumbList ({commit}) {
            commit('SET_BREADCRUMB_LIST', [])
        }
    }
}
