<template>
  <div :class="isCollapse?'views_bot_layout_Sidebar_collapse':'views_bot_layout_Sidebar'">
    <div v-if="isCollapse" class="views_bot_layout_Sidebar_head">
      <div class="views_bot_layout_Sidebar_head_logo">
        <img v-if="company==='konxun'"
             src="/static/views/bot/app/login/logokx.png"/>
        <svg-icon icon-class="logo"
                  v-else/>
      </div>
      <p class="views_bot_layout_Sidebar_head_title">热水智慧运维平台</p>
    </div>
    <el-menu class="views_bot_layout_Sidebar_menu"
             :show-timeout="200"
             :default-active="$route.name"
             :unique-opened="true"
             :collapse="!isCollapse"
             mode="vertical"
             :router="true"
             background-color="#1c2b36"
             text-color="#9BA4AB"
             active-text-color="#12ACEF">
      <SidebarItem v-for="(item,index) in router"
                   :key="index"
                   :item="item"
                   :base-path="item.path"/>
    </el-menu>
  </div>
</template>
<script>
import SidebarItem from './item'
import {mapGetters} from 'vuex'

export default {
  props: ['isCollapse'],
  computed: {
    ...mapGetters(['company']),
    allRoute () {
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
    router () {
      const botAppRoute = this.allRoute.find(item => {
        return item.name === 'botApp'
      })
      return (botAppRoute && botAppRoute.children) || []
    }
  },
  components: {
    SidebarItem
  },
  mounted () {
    console.log(this.$router)
  }
}
</script>
