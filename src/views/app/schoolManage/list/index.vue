<template>
    <sas-card title="学校管理">
        <template v-slot:headRight>
            <sas-add-button text="添加学校" @click="handlerOpenFormDialog"/>
        </template>
        <sas-table :column-list="columnList" :data="tableData" @delete="handlerDeleteSchool"/>
        <sas-form-dialog ref="schoolDetail" edit-title="编辑学校" create-title="创建学校" :form-item-list="formItemList"/>
    </sas-card>
</template>

<script>
    export default {
        data() {
            return {
                // 表格配置项
                columnList: [
                    {label: '学校名称', key: 'name'},
                    {label: '管理者', key: 'managerNickname'},
                    {label: '操作', key: 'edit,delete', type: 'operate'}
                ],
                formItemList: [
                    {label: '学校名称', key: 'name'}
                ],
                // 表格数据
                tableData: []
            }
        },
        methods: {
            /**
             * 获取学校列表
             * @returns {Promise<void>}
             */
            async getSchoolList() {
                const res = await this.$api.findAllSchool()
                this.tableData = res.map(item => ({
                    ...item,
                    managerNickname: item.manager?.username || '--'
                }))
            },
            /**
             * 删除学校
             * @param id
             */
            async handlerDeleteSchool({id}) {
                await this.$api.deleteSchool(id)
                await this.getSchoolList()
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                })
            },
            /**
             * 打开表单弹窗
             */
            handlerOpenFormDialog() {
                this.$refs.schoolDetail.open()
            }
        },
        mounted() {
            this.getSchoolList()
        }
    }
</script>
