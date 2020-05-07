<template>
    <sas-dialog ref="formDialog" :title="displayTitle" @save="handlerSave" @cancel="handlerCancel" :width="width">
        <sas-form-view :model="data" :rules="rules">
            <sas-form-item v-for="(item,index) in formItemList" :key="index" :options="item" :value="data[item.key]"
                           :size="formItemSize" :body-size="formItemBodySize" :select-all="formItemSelectAll"
                           @input="handlerInput($event,item.key)"
                           @focus="handlerFocus(item.key)"/>
        </sas-form-view>
    </sas-dialog>
</template>

<script>
    export default {
        props: {
            // 表单 item body 大小
            formItemBodySize: {
                type: Number,
                default: () => 24
            },
            // 表单 item 大小
            formItemSize: {
                type: Number,
                default: () => 24
            },
            // 是否选择全部
            formItemSelectAll:{
                type: Boolean,
                default: () => false
            },
            // 弹窗宽度
            width: String,
            // 标题（优先级最高）
            title: String,
            // 编辑状态时的标题
            editTitle: String,
            // 创建状态时的标题
            createTitle: String,
            // 表单数据校验规则
            rules: Object,
            // 表单配置项目
            formItemList: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                //数据
                data: {},
                //是否为编辑
                isEdit: false
            }
        },
        computed: {
            // 用于显示的标题
            displayTitle() {
                if (this.title) {
                    return this.title
                }
                return this.isEdit ? this.editTitle : this.createTitle
            }
        },
        methods: {
            /**
             * 打开弹窗
             * @param data
             */
            open(data) {
                this.isEdit = !!data
                this.data = data ? data : {}
                this.$refs.formDialog.open()
            },
            /**
             * 关闭弹窗
             */
            close() {
                this.$refs.formDialog.close()
            },
            /**
             * 保存事件
             */
            handlerSave() {
                const {isEdit, data, close} = this
                this.$emit('save', {isEdit, data, close})
            },
            /**
             * 取消事件
             */
            handlerCancel() {
                const {close} = this
                this.$emit('cancel', {close})
            },
            /**
             * 输入事件
             */
            handlerInput(value, key) {
                this.$set(this.data, key, value)
            },
            /**
             * 聚焦事件
             * @param key
             */
            handlerFocus(key) {
                this.$emit('focus',key)
            }
        }
    }
</script>
