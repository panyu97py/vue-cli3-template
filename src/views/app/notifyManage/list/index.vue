<template>
    <sas-card title="通知管理">
        <template v-slot:headRight>
            <sas-add-button text="添加" @click="handlerAddNotifyDraft"/>
        </template>
        <sas-table :column-list="columnList" :data="tableData" @delete="handlerDeleteNotifyDraft" @edit="handlerEdit"
                   @send="handlerSend"/>
        <div style="display: flex;justify-content:flex-end">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page="currentPage"
                    @current-change="handlerPageChange"
                    :total="totalPage">
            </el-pagination>
        </div>
        <sas-form-dialog width="500px" label-width="120px" ref="NotifyDraftDetail" edit-title="编辑通知草稿"
                         create-title="创建通知草稿"
                         :form-item-list="formItemList"
                         @cancel="handlerCancel" @save="handlerSave">
            <div>
                <label style="width: 100px;float: left;text-align: right;padding-right: 12px;box-sizing: border-box">文件</label>
                <div style="margin-left: 100px">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-change="handleChange"
                            :on-remove="handlerRemove"
                            :http-request="handlerUpload"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </div>
            </div>
            <p>接收消息的学院</p>
            <sas-checkbox-group v-model="receiveColleges" :option="collegeList" label-key="name" value-key="id"
                                selectAllItem/>
        </sas-form-dialog>
    </sas-card>
</template>

<script>
    export default {
        data() {
            return {
                // 表格配置项
                columnList: [
                    {label: '标题', key: 'title'},
                    {label: '内容', key: 'content'},
                    {label: '接收的学院', key: 'receiveCollegesName'},
                    {label: '状态', key: 'isSentFormat'},
                    {label: '操作', key: 'send,edit,delete', type: 'operate'}
                ],
                // 表格数据
                tableData: [],
                // 通知草稿数据
                notifyDraftList: [],
                // 用户列表
                userList: [],
                // 总页码
                totalPage: 0,
                // 当前页码
                currentPage: 0,
                // 学校列表
                collegeList: [],
                // 接收消息的学院列表
                receiveColleges: [],
                fileList: []
            }
        },
        computed: {
            formItemList() {
                return [
                    {label: '标题', key: 'title'},
                    {
                        label: '是否置顶',
                        key: 'isTop',
                        type: 'select',
                        list: [
                            {label: '是', value: true},
                            {label: '否', value: false}
                        ]
                    },
                    {label: '内容', key: 'content', type: 'textarea'}
                ]
            }
        },
        methods: {
            handlerPageChange(page) {
                this.pagination(page)
            },
            pagination(page) {
                const {totalPage, currentPage, data} = this.$utils.pagination(this.notifyDraftList, page)
                this.tableData = data
                this.totalPage = totalPage
                this.currentPage = currentPage
            },
            /**
             * 获取学院列表
             * @returns {Promise<void>}
             */
            async getCollegeList() {
                this.collegeList = await this.$api.findAllMyCollege()
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
                this.notifyDraftList = res.map(item => ({
                    ...item,
                    isSentFormat: item.isSent ? '已发送' : '未发送',
                    receiveCollegesName: item.receiveColleges.map(item => (item.name)).join(',')
                }))
                this.pagination(1)
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
                this.receiveColleges = data.receiveColleges
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
                await this.$api[isEdit ? 'updateNotifyDraft' : 'createNotifyDraft']({
                    ...data,
                    receiveColleges: this.receiveColleges,
                    files: this.fileList.map(item => (item.response))
                })
                await this.getNotifyDraftList()
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success'
                })
                close()
            },
            async handlerSend({id}) {
                await this.$api.sendNotifyDraft(id)
                await this.getNotifyDraftList()
                this.$notify({
                    title: '成功',
                    message: '发送成功',
                    type: 'success'
                })
            },
            handleChange(file, fileList) {
                this.fileList = fileList
            },
            handlerRemove(file, fileList) {
                console.log(fileList)
                this.fileList = fileList
            },
            async handlerUpload(data) {
                let formData = new FormData()
                formData.append('uploadFile', data.file)
                const url = await this.$api.uploadFile(formData)
                return url

            }
        },
        mounted() {
            this.getCollegeList()
            this.getNotifyDraftList()
        }
    }
</script>
