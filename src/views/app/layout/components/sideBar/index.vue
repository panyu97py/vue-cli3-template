<template>
    <div :class="isCollapse?'layout_sideBar_collapse':'layout_sideBar'">
        <div v-if="isCollapse" class="layout_sideBar_head">
            <div class="layout_sideBar_head_logo">
                LOGO
            </div>
            <p class="layout_sideBar_head_title">{{title}}</p>
        </div>
        <el-menu class="layout_sideBar_menu"
                 :show-timeout="200"
                 :default-active="$route.name"
                 :unique-opened="true"
                 :collapse="!isCollapse"
                 mode="vertical"
                 :router="true"
                 background-color="#1c2b36"
                 text-color="#9BA4AB"
                 active-text-color="#12ACEF">
            <sideBarItem v-for="(item,index) in router"
                         :key="index"
                         :item="item"
                         :base-path="item.path"/>
        </el-menu>
    </div>
</template>
<script>
    import sideBarItem from './item'

    export default {
        props: ['isCollapse'],
        data() {
            return {
                title: ''
            }
        },
        computed: {
            allRoute() {
                const allRoutes = []
                const find = (routes) => {
                    routes.map(route => {
                        allRoutes.push(route)
                        if (route.children) {
                            find(route.children)
                        }
                    })
                }
                find(this.$router.options.routes)
                return allRoutes
            },
            router() {
                const botAppRoute = this.allRoute.find(item => {
                    return item.name === 'app'
                })
                return (botAppRoute && botAppRoute.children) || []
            }
        },
        components: {
            sideBarItem
        }
    }
</script>
