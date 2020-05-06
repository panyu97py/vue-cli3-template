<template>
  <div v-if="icon||type==='text'"
       @click="handlerClick"
       :style="{color:color,marginRight:'10px',lineHeight:'20px'}"
       class="components_button"
       :class="disable&&'components_button_disable'">
    <svg-icon v-if="icon"
              :iconClass="icon"
              className="components_button_icon"
              :class="disable&&'components_button_disable_icon'"
              :style="{color:iconColor||color}" />
    <p class="components_button_text"
       :class="disable&&'components_button_disable_text'"
       :style="{color:textColor||color||'#333333'}">{{text}}</p>
  </div>
  <button @click="handlerClick"
          :style="{padding:'10px 20px'}"
          class="components_button"
          :class="disable?`components_button_disable components_button_disable_${type||'default'}`: `components_button_${type||'default'}`"
          v-else>
    {{text}}
    <slot v-if="$slots.default" />
  </button>
</template>
<script>
export default {
  props: ['text', 'type', 'icon', 'iconColor', 'textColor', 'color', 'disable'],
  methods: {
    handlerClick (e) {
      if (this.disable) {
        return
      }
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
