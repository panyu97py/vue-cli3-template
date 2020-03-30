<template>
  <div :class="isCollapse?'layout_mainView_collapse':'layout_mainView'">
      <router-view/>
  </div>
</template>
<script>
export default {
  props: ['isCollapse']
}
</script>
