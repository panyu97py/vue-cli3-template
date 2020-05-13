<template>
    <sas-card title="我的通知列表">
        <sas-table :column-list="columnList" :data="tableData" @delete="handlerDelete" @rowClick="handlerView"/>
        <sas-form-dialog width="500px" ref="shareDetail" title="通知详情"
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
    import fileSaver from 'file-saver'
    import JSZip from 'jszip'

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
                tableData: [],
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
                    }
                ]
            },
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
            },
            handlerDownLoad() {
                const zip = new JSZip()
                const cache = {}
                const promises = []
                this.fileList.forEach(item => {
                    const promise = this.$api.downLoadFile(item.name).then(data => { // 下载文件, 并存成ArrayBuffer对象
                        zip.file(item.name, data, {binary: true}) // 逐个添加文件
                        cache[item.name] = data
                    })
                    promises.push(promise)
                })

                Promise.all(promises).then(() => {
                    zip.generateAsync({type: "blob"}).then(content => { // 生成二进制流
                        fileSaver.saveAs(content, "附件.zip") // 利用file-saver保存文件
                    })
                })
            },
            async handlerView({id}) {
                const notifyDetail = await this.$api.findNotifyById(id)
                this.$refs.shareDetail.open(notifyDetail)
                this.fileList = notifyDetail.files ? notifyDetail.files.map(url => ({
                    name: decodeURI(url).match(/api\/file\/downLoad\/(\S*)/)[1],
                    url
                })) : []
            }
        },
        mounted() {
            this.getMyAllNotify()
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
