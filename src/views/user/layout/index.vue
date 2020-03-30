<template>
    <div>
        <el-button @click="handlerToApp">toApp</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            handlerToApp() {
                this.$router.push({name: 'app'})
            }
        }
    }
</script>

<style scoped>
</style>
