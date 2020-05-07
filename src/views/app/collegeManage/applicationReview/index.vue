<template>
    <sas-card title="学院申请管理">
        <sas-table :column-list="columnList" :data="tableData">
            <template v-slot:operate="{row:{id}}">
                <el-button type="text" @click="handlerProcessApply(id,true)">同意</el-button>
                <el-button type="text" @click="handlerProcessApply(id,false)">拒绝</el-button>
            </template>
        </sas-table>
    </sas-card>
</template>

<script>
    export default {
        data() {
            return {
                auditStatusFormatMap: {AGREE: '同意', REFUSE: '拒绝', UNTREATED: '未处理'},
                // 表格配置项
                columnList: [
                    {label: '申请人', key: 'creatorUsername'},
                    {label: '所申请的学院', key: 'collegeName'},
                    {label: '所申请的学院所在的学校', key: 'schoolName'},
                    {label: '申请时间', key: 'createTimeFormat'},
                    {label: '处理状态', key: 'auditStatusFormat'},
                    {label: '处理时间', key: 'processTimeFormat'},
                    {label: '操作', key: 'operate', type: 'slot'}
                ],
                // 表格数据
                tableData: [],
            }
        },
        methods: {
            /**
             * 获取学院申请列表
             * @returns {Promise<void>}
             */
            async getApplyList() {
                const res = await this.$api.findAllApply()
                this.tableData = res.map(item => ({
                    ...item,
                    creatorUsername: item.creator?.username,
                    createTimeFormat: this.$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
                    processTimeFormat: item.processTime ? this.$moment(item.processTime).format('YYYY-MM-DD HH:mm:ss') : '--',
                    collegeName: item.college?.name,
                    schoolName: item.college?.school?.name,
                    auditStatusFormat:this.auditStatusFormatMap[item.auditStatus]

                }))
            },
            /**
             * 处理申请
             */
            async handlerProcessApply(applyId, auditStatus) {
                await this.$api.processApply({applyId, auditStatus})
                this.$notify({
                    title: '成功',
                    message: '处理成功',
                    type: 'success'
                })
            }
        },
        mounted() {
            this.getApplyList()
        }
    }
</script>
