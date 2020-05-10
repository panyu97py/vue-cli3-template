<template>
    <sas-card title="我的共享">
        <template v-slot:headRight>
            <sas-add-button text="添加共享"/>
        </template>
        <sas-table :column-list="columnList" :data="tableData" @delete="handlerDelete"/>
    </sas-card>
</template>

<script>
    export default {
        data() {
            return {
                // 表格配置项
                columnList: [],
                // 表格数据
                tableData: []
            }
        },
        methods: {
            handlerDelete() {

            }
        }
    }
</script>

<style scoped>

</style>
