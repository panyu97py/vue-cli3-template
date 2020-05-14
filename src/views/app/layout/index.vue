<template>
    <div class="layout">
        <sideBar :isCollapse="isCollapse"/>
        <navBar :isCollapse="isCollapse"
                @changeCollapse="isCollapse=!isCollapse"
                @loginOut="loginOut"
                @modifyPassword="modifyPassword"/>
        <mainView :isCollapse="isCollapse"/>
        <sas-form-dialog ref="modifyPwdDialog" title="修改密码" :formItemList="formItemList" @cancel="handlerCancel"
                         @save="handlerSubmit"/>
    </div>
</template>
<script>
    import sideBar from './components/sideBar'
    import navBar from './components/navBar'
    import mainView from './components/mainView'

    export default {
        data() {
            return {
                isCollapse: true,

                formItemList: [
                    {
                        label: '旧密码',
                        key: 'oldPwd',
                        showPassword: true
                    },
                    {
                        label: '新密码',
                        key: 'newPwd',
                        showPassword: true
                    },
                    {
                        label: '确认密码',
                        key: 'checkPwd',
                        showPassword: true
                    }
                ]
            }
        },
        components: {sideBar, navBar, mainView},
        methods: {
            loginOut() {
                this.$store.dispatch('loginOut')
            },
            modifyPassword() {
                this.$refs.modifyPwdDialog.open()
            },
            async handlerSubmit({data: {oldPwd, newPwd, checkPwd}, close}) {
                if (newPwd !== checkPwd) {
                    this.$notify({
                        title: '错误',
                        message: '两次输入的密码不一致',
                        type: 'error'
                    })
                    return
                }
                await this.$api.updatePwd({oldPwd, newPwd})
                this.$notify({
                    title: '成功',
                    type: 'success',
                    message: '密码修改成功'
                })
                console.log(oldPwd, newPwd, checkPwd)
                close()
            },
            handlerCancel({close}) {
                close()
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "styles";
</style>
