<template>
    <el-dropdown trigger="click"
                 @command="handleCommand">
        <div class="layout_navBar_right_user">
            <div class="layout_navBar_right_userHead" style="overflow: hidden">
                <svg-icon icon-class="ren" style="line-height: 26px"/>
            </div>
            <div class="layout_navBar_right_userName">
                {{`${(userInfo&&userInfo.nickname)||'未知'}`}}
                <i class="el-icon-caret-bottom"/>
            </div>
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="modifyPassword">修改密码</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters(['userInfo'])
        },
        methods: {
            handleCommand(command) {
                switch (command) {
                    case 'modifyPassword':
                        this.$emit('modifyPassword')
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
