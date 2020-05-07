<template>
    <div class="login_view">
        <sas-form-view>
            <sas-form-item v-for="item in formItemList" :key="item.key" :size="24" :body-size="20" :label="item.label"
                           :showPassword="item.showPassword" v-model="formData[item.key]"/>
        </sas-form-view>
        <div>
            <el-button type="primary" class="login_view_button" @click="handlerLogin">登录</el-button>
            <el-button type="warning" class="login_view_button" @click="toRegister">注册</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {},
                formItemList: [
                    {label: '用户名', key: 'username'},
                    {label: '密码', key: 'password', showPassword: true},
                ]
            }
        },
        methods: {
            /**
             * 去注册
             */
            toRegister() {
                this.$router.push({name: 'register'})
            },
            /**
             * 登录
             */
            async handlerLogin() {
                await this.$store.dispatch('login', this.formData)
                await this.$router.push({name: 'app'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login_view {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>
