<template>
    <sas-card title="我的申请">
        <template v-slot:headRight>
            <sas-add-button text="创建申请" @click="handlerAddApply"/>
        </template>
        <sas-table :column-list="columnList" :data="tableData" @delete="handlerDeleteApply" @edit="handlerEdit"/>
        <sas-form-dialog width="500px" ref="ApplyDetail" edit-title="编辑申请" create-title="创建申请"
                         :form-item-list="formItemList"
                         @change="handlerChange"
                         @cancel="handlerCancel" @save="handlerSave"/>
    </sas-card>
</template>

<script>
    export default {
        data() {
            return {
                auditStatusFormatMap: {AGREE: '同意', REFUSE: '拒绝', UNTREATED: '未处理'},

                // 表格配置项
                columnList: [
                    // {label: '申请名称', key: 'name'},
                    {label: '所申请的学院', key: 'collegeName'},
                    {label: '所申请的学院所在的学校', key: 'schoolName'},
                    {label: '申请时间', key: 'createTimeFormat'},
                    {label: '处理时间', key: 'processTimeFormat'},
                    {label: '处理状态', key: 'auditStatusFormat'},
                    {label: '操作', key: 'delete', type: 'operate'}
                ],
                // 表格数据
                tableData: [],
                // 用户列表
                schoolList: [],
                // 学院列表
                collegeList: []
            }
        },
        computed: {
            formItemList() {
                return [
                    {
                        label: '学校信息',
                        key: 'school',
                        type: 'select',
                        labelKey: 'name',
                        valueKey: 'id',
                        selectAll: true,
                        list: this.schoolList
                    },
                    {
                        label: '学院信息',
                        key: 'college',
                        type: 'select',
                        labelKey: 'name',
                        valueKey: 'id',
                        selectAll: true,
                        list: this.collegeList
                    }
                ]
            }
        },
        methods: {
            /**
             * 获取全部学校信息
             */
            async getSchoolList() {
                this.schoolList = await this.$api.findAllSchool()
            },

            async getCollegeList(schoolId) {
                this.collegeList = await this.$api.findAllCollege(schoolId)
            },
            /**
             * 获取申请列表
             * @returns {Promise<void>}
             */
            async getApplyList() {
                const res = await this.$api.findAllApply()
                this.tableData = res.map(item => ({
                    ...item,
                    createTimeFormat: this.$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
                    processTimeFormat: item.processTime ? this.$moment(item.processTime).format('YYYY-MM-DD HH:mm:ss') : '--',
                    collegeName: item.college?.name,
                    schoolName: item.college?.school?.name,
                    managerUsername: item.manager?.username || '--',
                    auditStatusFormat: this.auditStatusFormatMap[item.auditStatus]
                }))
            },
            /**
             * 添加申请
             */
            async handlerAddApply() {
                this.handlerOpenFormDialog()
            },
            /**
             * 删除申请
             * @param id
             */
            async handlerDeleteApply({id}) {
                await this.$api.deleteApply(id)
                await this.getApplyList()
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                })
            },
            /**
             * 编辑申请
             * @param id
             */
            async handlerEdit({id}) {
                const data = await this.$api.findApplyById(id)
                this.handlerOpenFormDialog(data)
            },
            /**
             * 打开表单弹窗
             */
            handlerOpenFormDialog(data) {
                this.$refs.ApplyDetail.open(data)
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
                await this.$api[isEdit ? 'updateApply' : 'createApply'](data)
                await this.getApplyList()
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success'
                })
                close()
            },
            handlerChange(value, key) {
                if (key === 'school') {
                    this.getCollegeList(value.id)
                }
            }
        },
        mounted() {
            this.getApplyList()
            this.getSchoolList()
        }
    }
</script>
