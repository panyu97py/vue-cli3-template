<template>
    <div>
        <div class="view_head">
            <div class="view_head_select">
                <label class="view_head_select_label">共享类型</label>
                <div class="view_head_select_body">
                    <el-select v-model="type" placeholder="请选择共享类型" @change="handlerTypeChange">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                   :value="item.value"/>
                    </el-select>
                </div>
            </div>
        </div>
        <sas-card title="共享列表">

            <sas-table :column-list="columnList" :data="tableData" @rowClick="handlerView"/>
            <div style="display: flex;justify-content:flex-end">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :current-page="currentPage"
                        @current-change="handlerPageChange"
                        :total="totalPage">
                </el-pagination>
            </div>
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
    </div>
</template>

<script>
    import fileSaver from 'file-saver'
    import JSZip from 'jszip'

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
                fileList: [],
                shareList:[],
                // 共享文件类型
                type: '',
                // 总页码
                totalPage: 0,
                // 当前页码
                currentPage: 0
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
            options() {
                return [
                    {label: '全部', value: ''},
                    ...this.$shareTypeList
                ]
            }
        },
        mounted() {
            this.getAllShare()
        },
        methods: {
            handlerPageChange(page) {
                this.pagination(page)
            },
            pagination(page) {
                const {totalPage, currentPage, data} = this.$utils.pagination(this.shareList, page)
                this.tableData = data
                this.totalPage = totalPage
                this.currentPage = currentPage
            },
            async handlerTypeChange(type) {
                await this.getAllShare(type)
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
                const shareDetail = await this.$api.findShareById(id)
                this.$refs.shareDetail.open(shareDetail)
                this.fileList = shareDetail.files ? shareDetail.files.map(url => ({
                    name: decodeURI(url).match(/api\/file\/downLoad\/(\S*)/)[1],
                    url
                })) : []
            },
            async getAllShare(type) {
                const res = await this.$api.findAllShare(type)
                this.shareList = res.map(item => ({
                    ...item,
                    creatorName: item.creator?.username,
                    createTimeFormat: this.$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                }))
                this.pagination(1)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .view_head {
        background: white;
        height: 50px;
        margin: -20px -20px 20px -20px;
        display: flex;
        justify-content: space-between;

        &_select {
            width: 250px;

            &_label {
                width: 100px;
                float: left;
                font: {
                    size: 14px;
                };
                line-height: 50px;
            }

            &_body {
                margin-left: 100px;
                height: 100%;
                display: flex;
                align-items: center;

                /deep/ {
                    .el-input__icon {
                        line-height: 36px;
                    }

                    .el-input__inner {
                        line-height: 36px;
                        height: 36px;
                    }
                }

            }
        }
    }

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
