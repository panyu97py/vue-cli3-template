<template>
  <router-view :name="name"/>
</template>
<script>
export default {
  props: ['name']
}
</script>
