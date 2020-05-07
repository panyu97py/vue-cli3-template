<template>
    <sas-card title="学校管理">
        <template v-slot:headRight>
            <sas-add-button text="添加学校" @click="handlerAddSchool"/>
        </template>
        <sas-table :column-list="columnList" :data="tableData" @delete="handlerDeleteSchool" @edit="handlerEdit"/>
        <sas-form-dialog width="500px" ref="schoolDetail" edit-title="编辑学校" create-title="创建学校"
                         :form-item-list="formItemList"
                         @cancel="handlerCancel" @save="handlerSave"/>
    </sas-card>
</template>

<script>
    export default {
        data() {
            return {
                // 表格配置项
                columnList: [
                    {label: '学校名称', key: 'name'},
                    {label: '管理者', key: 'managerUsername'},
                    {label: '操作', key: 'edit,delete', type: 'operate'}
                ],
                // 表格数据
                tableData: [],
                // 用户列表
                userList: []
            }
        },
        computed: {
            formItemList() {
                return [
                    {label: '学校名称', key: 'name'},
                    {
                        label: '管理者',
                        key: 'manager',
                        selectAll: true,
                        type: 'select',
                        labelKey: 'username',
                        valueKey: 'id',
                        list: this.userList
                    }
                ]
            }
        },
        methods: {
            async findAllUser() {
                const res = await this.$api.findAllUser()
                this.userList = res
                this.userList.unshift({id: '', username: '无'})
            },
            /**
             * 获取学校列表
             * @returns {Promise<void>}
             */
            async getSchoolList() {
                const res = await this.$api.findAllSchool()
                this.tableData = res.map(item => ({
                    ...item,
                    managerUsername: item.manager?.username || '--'
                }))
            },
            /**
             * 添加学校
             */
            async handlerAddSchool() {
                this.handlerOpenFormDialog()
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
             * 编辑学校
             * @param id
             */
            async handlerEdit({id}) {
                const data = await this.$api.findSchoolById(id)
                if(!data.manager){
                    data.manager={id:'',username:'无'}
                }
                this.handlerOpenFormDialog(data)
            },
            /**
             * 打开表单弹窗
             */
            handlerOpenFormDialog(data) {
                this.$refs.schoolDetail.open(data)
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
                if(!data.manager?.id){
                    data.manager=null
                }
                await this.$api[isEdit ? 'updateSchool' : 'createSchool'](data)
                await this.getSchoolList()
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success'
                })
                close()
            }
        },
        mounted() {
            this.getSchoolList()
            this.findAllUser()
        }
    }
</script>
