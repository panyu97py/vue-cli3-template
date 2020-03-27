<template>
  <div :class="isCollapse?'views_bot_layout_Navbar_collapse':'views_bot_layout_Navbar_notCollapse'"
       class="views_bot_layout_Navbar">
    <div class="views_bot_layout_Navbar_left">
      <svg-icon icon-class="menu"
                :class="isCollapse?'views_bot_layout_Navbar_collapse_icon':'views_bot_layout_Navbar_notCollapse_icon'"
                @click="$emit('changeCollapse')"/>
      <breadcrumb class="views_bot_layout_Navbar_left_breadcrumb"/>
    </div>
    <div class="views_bot_layout_Navbar_right">
      <userControl/>
      <loginOutButton @click="$emit('loginOut')"/>
    </div>
  </div>
</template>
<script>
import breadcrumb from '@/components/breadcrumb'
import userControl from './userControl'
import loginOutButton from './loginOutButton'
import {mapGetters} from 'vuex'

export default {
  props: ['isCollapse'],
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {breadcrumb, userControl, loginOutButton}
}
</script>
