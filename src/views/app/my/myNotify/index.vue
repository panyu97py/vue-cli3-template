<template>
    <sas-card title="我的通知列表">
        <sas-table :column-list="columnList" :data="tableData" @delete="handlerDelete"/>
    </sas-card>
</template>

<script>
    export default {
        data() {
            return {
                columnList: [
                    {label: '标题', key: 'title'},
                    {label: '内容', key: 'content'},
                    {label: '发送人', key: 'creatorName'},
                    {label: '发送时间', key: 'sendTimeFormat'},
                    {label: '操作', key: 'delete', type: 'operate'}
                ],
                tableData: []
            }
        },
        methods: {
            /**
             * 获取我的全部通知
             */
            async getMyAllNotify() {
                const res = await this.$api.findAllNotify()
                this.tableData = res.map(item => ({
                    ...item,
                    creatorName: item.creator?.username,
                    sendTimeFormat: this.$moment(item.sendTime).format('YYYY-MM-DD HH:mm:ss')
                }))
            },
            async handlerDelete({id}) {
                await this.$api.deleteNotify(id)
                await this.getMyAllNotify()
                this.$notify({
                    title: '成功',
                    type: 'success',
                    message: '删除成功'
                })
            }
        },
        mounted() {
            this.getMyAllNotify()
        }
    }
</script>

<style scoped>

</style>
