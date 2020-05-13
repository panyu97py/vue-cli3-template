<template>
    <sas-card title="共享列表">
        <sas-table :column-list="columnList" :data="tableData" @rowClick="handlerView"/>
        <sas-form-dialog width="500px" ref="shareDetail" title="共享详情"
                         :form-item-list="formItemList" disabled>
            <div v-if="fileList.length>0">
                <label style="width: 100px;float: left;text-align: right;padding-right: 12px;box-sizing: border-box">文件</label>
                <div style="margin-left: 100px">
                    <el-upload
                            disabled
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :file-list="fileList">
                    </el-upload>
                </div>
            </div>

            <template v-slot:footer>
                <div>
                    <el-button type="primary" @click="handlerDownLoad">下载附件</el-button>
                </div>
            </template>

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
                    {label: '创建者', key: 'creatorName'},
                    {label: '创建时间', key: 'createTimeFormat'}
                ],
                // 表格数据
                tableData: [],
                //文件列表
                fileList: []
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
                        type: 'textarea'
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
            this.getAllShare()
        },
        methods: {
            handlerDownLoad() {
                this.fileList.forEach(({url}) => {
                    const a = document.createElement('a')
                    a.href = url
                    a.click()
                })
            },
            async handlerView({id}) {
                const shareDetail = await this.$api.findShareById(id)
                this.$refs.shareDetail.open(shareDetail)
                this.fileList = shareDetail.files ? shareDetail.files.map(url => ({
                    name: decodeURI(url).match(/api\/file\/downLoad\/(\S*)/)[1],
                    url
                })) : []
            },
            async getAllShare() {
                const res = await this.$api.findAllShare()
                this.tableData = res.map(item => ({
                    ...item,
                    creatorName: item.creator?.username,
                    createTimeFormat: this.$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                }))
            }
        }
    }
</script>
<style lang="scss" scoped>
    /deep/ {
        .el-textarea.is-disabled .el-textarea__inner,
        .el-input.is-disabled .el-input__inner {
            background: white;
            color: #606266;
            border: 1px solid #DCDFE6;
        }

        .el-upload {
            display: none;
        }
    }
</style>
