<template>
    <div class="layout">
        <sideBar :isCollapse="isCollapse"/>
        <navBar :isCollapse="isCollapse"
                @changeCollapse="isCollapse=!isCollapse"
                @loginOut="loginOut"
                @modifyPassword="modifyPassword"/>
        <mainView :isCollapse="isCollapse"/>
    </div>
</template>
<script>
    import sideBar from './components/sideBar'
    import navBar from './components/navBar'
    import mainView from './components/mainView'

    export default {
        data() {
            return {
                isCollapse: true
            }
        },
        components: {sideBar, navBar, mainView},
        methods: {
            loginOut() {
                this.$store.dispatch('loginOut')
            },
            modifyPassword() {
                this.$refs.modifyPasswordDialog.open()
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "styles";
</style>
