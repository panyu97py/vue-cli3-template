<template>
    <div class="register_view">
        <div>
            <h1>注册界面</h1>
        </div>
        <sas-form-view>
            <sas-form-item v-for="item in formItemList" :key="item.key" :size="24" :body-size="22" :label="item.label"
                           :showPassword="item.showPassword" v-model="formData[item.key]"/>
        </sas-form-view>
        <div>
            <el-button type="primary" @click="handlerRegister">注册</el-button>
            <el-button type="warning" @click="toLogin">返回登录</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {},
                formItemList: [
                    {label: '用户昵称', key: 'nickName'},
                    {label: '用户名', key: 'username'},
                    {label: '密码', key: 'password', showPassword: true},
                    {label: '确认密码', key: 'checkPassword', showPassword: true},
                ]
            }
        },
        methods: {
            toLogin() {
                this.$router.push({name: 'login'})
            },
            async handlerRegister() {
                if (this.formData.password !== this.formData.checkPassword) {
                    this.$notify({
                        title: '错误',
                        type: 'error',
                        message: '两次输入的密码不一致'
                    })
                    return
                }
                const {password, username} = this.formData
                if (/\S+/.test(username)) {
                    this.$notify({
                        title: '错误',
                        type: 'error',
                        message: '用户名中不能包含空格'
                    })
                    return
                }
                if ((password || '').length <= 6) {
                    this.$notify({
                        title: '错误',
                        type: 'error',
                        message: '密码长度不能少于6位'
                    })
                    return
                }
                await this.$api.register(this.formData)
                this.$notify({
                    title: '成功',
                    type: 'success',
                    message: '注册成功'
                })
                await this.$router.push({name: 'login'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .register_view {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>
