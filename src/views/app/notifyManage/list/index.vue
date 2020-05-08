<template>
    <sas-card title="通知管理">
        <template v-slot:headRight>
            <sas-add-button text="添加" @click="handlerAddNotifyDraft"/>
        </template>
        <sas-table :column-list="columnList" :data="tableData" @delete="handlerDeleteNotifyDraft" @edit="handlerEdit"/>
        <sas-form-dialog width="500px" label-width="120px" ref="NotifyDraftDetail" edit-title="编辑通知草稿" create-title="创建通知草稿"
                         :form-item-list="formItemList"
                         @cancel="handlerCancel" @save="handlerSave">
            <p>接收消息的学院</p>
            <sas-checkbox-group v-model="receiveColleges" :option="collegeList" label-key="name" value-key="id" selectAllItem/>
        </sas-form-dialog>
    </sas-card>
</template>

<script>
    export default {
        data() {
            return {
                // 表格配置项
                columnList: [
                    {label: '操作', key: 'edit,delete', type: 'operate'}
                ],
                // 表格数据
                tableData: [],
                // 用户列表
                userList: [],
                // 学校列表
                collegeList: [],
                // 接收消息的学院列表
                receiveColleges:[]
            }
        },
        computed: {
            formItemList() {
                return [
                    {label: '标题', key: 'title'},
                    {label: '内容', key: 'content', type: 'textarea'}
                ]
            }
        },
        methods: {
            /**
             * 获取学院列表
             * @returns {Promise<void>}
             */
            async getCollegeList() {
                this.collegeList = await this.$api.findAllCollege()
            },
            async findAllUser() {
                const res = await this.$api.findAllUser()
                this.userList = res
                this.userList.unshift({id: '', username: '无'})
            },
            /**
             * 获取学院列表
             * @returns {Promise<void>}
             */
            async getNotifyDraftList() {
                const res = await this.$api.findAllNotifyDraft()
                this.tableData = res.map(item => ({
                    ...item,
                }))
            },
            /**
             * 添加学院
             */
            async handlerAddNotifyDraft() {
                this.handlerOpenFormDialog()
            },
            /**
             * 删除学院
             * @param id
             */
            async handlerDeleteNotifyDraft({id}) {
                await this.$api.deleteNotifyDraft(id)
                await this.getNotifyDraftList()
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                })
            },
            /**
             * 编辑学院
             * @param id
             */
            async handlerEdit({id}) {
                const data = await this.$api.findNotifyDraftById(id)
                if (!data.manager) {
                    data.manager = {id: '', username: '无'}
                }
                this.handlerOpenFormDialog(data)
            },
            /**
             * 打开表单弹窗
             */
            handlerOpenFormDialog(data) {
                this.$refs.NotifyDraftDetail.open(data)
            },
            /**
             * 弹窗取消事件
             * @param close
             */
            handlerCancel({close}) {
                close()
            },
            /**
             * 弹窗表单保存事件
             * @param isEdit
             * @param data
             * @param close
             */
            async handlerSave({isEdit, data, close}) {
                if (!data.manager?.id) {
                    data.manager = null
                }
                await this.$api[isEdit ? 'updateNotifyDraft' : 'createNotifyDraft'](data)
                await this.getNotifyDraftList()
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success'
                })
                close()
            },
        },
        mounted() {
            this.getCollegeList()
            this.getNotifyDraftList()
        }
    }
</script>
