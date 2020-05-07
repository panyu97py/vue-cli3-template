<template>
    <sas-card title="成员管理">
        <sas-table :column-list="columnList" :data="memberList" @delete="handlerDeleteMember"/>
    </sas-card>
</template>

<script>
    export default {
        props: ['id'],
        data() {
            return {
                // 学院详情
                collegeDetail: {},
                //表格配置项
                columnList: [
                    {label: '用户名', key: 'username'},
                    {label: '操作', type: 'operate', key: 'delete'}
                ]

            }
        },
        computed: {
            //成员列表
            memberList() {
                return this.collegeDetail?.member
            }
        },
        methods: {
            /**
             * 查找学院详情
             * @returns {Promise<void>}
             */
            async findCollegeDetail() {
                const {id} = this
                this.collegeDetail = await this.$api.findCollegeById(id)
            },
            /**
             * 删除学院成员
             */
            async handlerDeleteMember(row) {
                const userId = row?.id
                const collegeId = this.id
                await this.$api.removeCollegeMember({userId,collegeId})
                await this.findCollegeDetail()
                this.$notify({
                    title:'成功',
                    type:'success',
                    message:'移除成员成功'
                })

            }
        },
        mounted() {
            this.findCollegeDetail()
        }
    }
</script>

<style scoped>

</style>
