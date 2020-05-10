<template>
    <sas-card title="学院管理">
        <template v-slot:headRight>
            <sas-add-button text="添加" @click="handlerAddCollege"/>
        </template>
        <sas-table :column-list="columnList" :data="tableData" @delete="handlerDeleteCollege" @edit="handlerEdit"
                   @rowClick="toMemberManager"/>
        <sas-form-dialog width="500px" ref="collegeDetail" edit-title="编辑学院" create-title="创建学院"
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
                    {label: '学院名称', key: 'name'},
                    {label: '所在学校', key: 'schoolName'},
                    {label: '管理者', key: 'managerUsername'},
                    {label: '操作', key: 'edit,delete', type: 'operate'}
                ],
                // 表格数据
                tableData: [],
                // 用户列表
                userList: [],
                // 学校列表
                schoolList: []
            }
        },
        computed: {
            formItemList() {
                return [
                    {label: '学院名称', key: 'name'},
                    {
                        label: '所在学校',
                        key: 'school',
                        selectAll: true,
                        type: 'select',
                        labelKey: 'name',
                        valueKey: 'id',
                        list: this.schoolList
                    },
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
            /**
             * 获取学校列表
             * @returns {Promise<void>}
             */
            async getSchoolList() {
                this.schoolList = await this.$api.findAllSchool()
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
            async getCollegeList() {
                const res = await this.$api.findAllMyCollege()
                this.tableData = res.map(item => ({
                    ...item,
                    schoolName: item.school?.name,
                    managerUsername: item.manager?.username || '--'
                }))
            },
            /**
             * 添加学院
             */
            async handlerAddCollege() {
                this.handlerOpenFormDialog()
            },
            /**
             * 删除学院
             * @param id
             */
            async handlerDeleteCollege({id}) {
                await this.$api.deleteCollege(id)
                await this.getCollegeList()
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
                const data = await this.$api.findCollegeById(id)
                if (!data.manager) {
                    data.manager = {id: '', username: '无'}
                }
                this.handlerOpenFormDialog(data)
            },
            /**
             * 打开表单弹窗
             */
            handlerOpenFormDialog(data) {
                this.$refs.collegeDetail.open(data)
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
                await this.$api[isEdit ? 'updateCollege' : 'createCollege'](data)
                await this.getCollegeList()
                this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success'
                })
                close()
            },
            /**
             * 前往成员管理页面
             * @param id
             */
            toMemberManager({id}) {
                this.$router.push({name: 'collegeMemberManage', query: {id}})
            }
        },
        mounted() {
            this.getSchoolList()
            this.getCollegeList()
            this.findAllUser()
        }
    }
</script>
