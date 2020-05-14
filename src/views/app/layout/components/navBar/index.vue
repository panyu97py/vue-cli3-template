<template>
  <div :class="isCollapse?'layout_navBar_collapse':'layout_navBar_notCollapse'"
       class="layout_navBar">
    <div class="layout_navBar_left">
      <svg-icon icon-class="menu"
                :class="isCollapse?'layout_navBar_collapse_icon':'layout_navBar_notCollapse_icon'"
                @click="$emit('changeCollapse')"/>
      <breadcrumb class="layout_navBar_left_breadcrumb"/>
    </div>
    <div class="layout_navBar_right">
      <userControl @modifyPassword="$emit('modifyPassword')"/>
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
