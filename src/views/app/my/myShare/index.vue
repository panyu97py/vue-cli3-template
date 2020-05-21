<template>
    <sas-card title="我的共享">
        <template v-slot:headRight>
            <sas-add-button text="添加共享" @click="handlerAddShare"/>
        </template>
        <sas-table :column-list="columnList" :data="tableData" @delete="handlerDelete" @edit="handlerEdit"/>
        <div style="display: flex;justify-content:flex-end">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page="currentPage"
                    @current-change="handlerPageChange"
                    :page-count="totalPage">
            </el-pagination>
        </div>
        <sas-form-dialog width="500px" ref="shareDetail" edit-title="编辑共享" create-title="创建共享"
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
        </sas-form-dialog>
    </sas-card>
</template>

<script>
    export default {
        data() {
            return {
                // 表格配置项
                columnList: [
                    {label: '共享标题', key: 'title'},
                    {label: '共享内容', key: 'content'},
                    {label: '操作', key: 'edit,delete', type: 'operate'}
                ],
                // 表格数据
                tableData: [],
                //文件列表
                fileList: [],
                // 总页码
                totalPage: 0,
                // 当前页码
                currentPage: 0,
                shareList:[]
            }
        },
        computed: {
            // 用户列表
            formItemList() {
                return [
                    {
                        label: '标题',
                        key: 'title'
                    },
                    {
                        label: '内容',
                        key: 'content',
                        type:'textarea'
                    },
                    {
                        label: '类型',
                        key: 'type',
                        type: 'select',
                        list: this.$shareTypeList
                    }
                ]
            },
        },
        mounted() {
            this.getMyShareList()
        },
        methods: {
            async handlerDelete({id}) {
                await this.$api.deleteShare(id)
                await this.getMyShareList()
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                })
            },
            async handlerEdit({id}) {
                const shareDetail = await this.$api.findShareById(id)
                this.$refs.shareDetail.open(shareDetail)
                this.fileList = shareDetail.files ? shareDetail.files.map(url => ({name:decodeURI(url).match(/api\/file\/downLoad\/(\S*)/)[1],url})) : []
            },
            handlerCancel({close}) {
                close()
            },
            async getMyShareList() {
                this.shareList = await this.$api.findMyShare()
            },
            handlerPageChange(page) {
                this.pagination(page)
            },
            pagination(page) {
                const {totalPage, currentPage, data} = this.$utils.pagination(this.shareList, page)
                this.tableData = data
                this.totalPage = totalPage
                this.currentPage = currentPage
            },
            async handlerSave({isEdit, data, close}) {
                if(this.fileList.length===0){
                    this.$notify({
                        title: '提示',
                        message: '至少上传一个文件',
                        type: 'warning'
                    })
                    return
                }
                console.log({isEdit, data, close})
                await this.$api[isEdit ? 'updateShare' : 'createShare']({
                    ...data,
                    files: this.fileList.map(item => (item.response))
                })
                await this.getMyShareList()
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success'
                })
                close()
            },
            handlerAddShare() {
                this.$refs.shareDetail.open()
            },
            handleChange(file, fileList) {
                this.fileList = fileList
            },
            handlerRemove(file, fileList){
                console.log(fileList)
                this.fileList = fileList
            },
            async handlerUpload(data) {
                let formData = new FormData()
                formData.append('uploadFile', data.file)
                const url = await this.$api.uploadFile(formData)
                return url

            }
        }
    }
</script>
