<template>
  <div :class="isCollapse?'views_bot_layout_mainView_collapse':'views_bot_layout_mainView'">
      <router-view/>
  </div>
</template>
<script>
export default {
  props: ['isCollapse']
}
</script>
