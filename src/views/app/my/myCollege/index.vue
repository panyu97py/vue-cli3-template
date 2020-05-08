<template>
    <sas-card title="我的学院">
        <sas-table :data="tableData" :columnList="columnList">
            <template v-slot:operate="{row:{id}}">
                <el-button type="text" @click="handlerQuit(id)">退出</el-button>
            </template>
        </sas-table>

    </sas-card>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                // 表格配置项
                columnList: [
                    {label: '学院名称', key: 'name'},
                    {label: '所在学校', key: 'schoolName'},
                    {label: '管理者', key: 'managerUsername'},
                    {label: '操作', key: 'operate', type: 'slot'}
                ],
            }
        },
        methods: {
            /**
             * 查找我的学院信息
             */
            async findMyCollege() {
                const res = await this.$api.findMyCollege()
                this.tableData = res.map(item => ({
                    ...item,
                    schoolName: item.school?.name,
                    managerUsername: item.manager?.username || '--'
                }))
            },
            /**
             * 退出学院
             * @param id
             */
            async handlerQuit(id) {
                await this.$api.quitCollege(id)
                await this.findMyCollege()
                this.$notify({
                    title: '成功',
                    message: '退出成功',
                    type: 'success'
                })
            }
        },
        mounted() {
            this.findMyCollege()
        }
    }
</script>

<style scoped>

</style>
