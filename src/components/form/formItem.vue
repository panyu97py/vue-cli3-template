<template>
    <el-col :span="formItemSize">
        <el-form-item :label="getOption('label')"
                      :prop="getOption('prop')">
            <el-row>
                <el-col :span="formItemBodySize">
                    <el-input :value="value"
                              :placeholder="formItemPlaceholder||`请输入${label}`"
                              :disabled="formItemDisable"
                              :show-password="getOption('showPassword')"
                              :maxlength="getOption('maxlength')"
                              :show-word-limit="getOption('maxlength')?true:false"
                              :type="formItemType"
                              @change="handlerChange"
                              @input="handlerInput"
                              v-if="formItemType==='input'||formItemType==='textarea'">
                    </el-input>
                    <el-select v-else-if="formItemType==='select'&&formItemOptions"
                               :value="formItemSelectAll&&value?value[formItemValueKey]:value"
                               :disabled="formItemDisable"
                               @input="handlerInput"
                               @change="handlerChange"
                               :placeholder="formItemPlaceholder||`请选择${label}`">
                        <el-option v-for="(item,index) in formItemOptions"
                                   :key="`selectItem_${index}`"
                                   :label="item[formItemLabelKey]"
                                   :value="item[formItemValueKey]"/>
                    </el-select>
                </el-col>
            </el-row>
        </el-form-item>
    </el-col>
</template>

<script>
    export default {
        props: {
            label: String,
            prop: String,
            placeholder: String,
            valueKey: String,
            labelKey: String,
            disabled: Boolean,
            showPassword: Boolean,
            maxlength: Number,
            options: [Array, Object],
            selectAll: Boolean,
            type: {
                type: String,
                default: () => 'input'

            },
            bodySize: {
                type: Number,
                default: () => 8
            },
            size: {
                type: Number,
                default: () => 8
            }
        },
        computed: {
            formItemSelectAll() {
                return this.getOption('selectAll', false)
            },
            formItemDisable(){
                return this.getOption('disabled')
            },
            formItemType() {
                return this.getOption('type')
            },
            formItemValueKey() {
                return this.getOption('valueKey', 'value')
            },
            formItemLabelKey() {
                return this.getOption('labelKey', 'label')
            },
            formItemOptions() {
                return (this.options && this.options.list) || this.options
            },
            formItemSize() {
                return this.getOption('size')

            },
            formItemBodySize() {
                return this.getOption('bodySize')
            },
            formItemPlaceholder(){
                return this.getOption('placeholder')
            }
        },
        methods: {
            /**
             * 获取配置项
             * @param key
             * @param defaultValue
             * @returns {*}
             */
            getOption(key, defaultValue) {
                return this[key] || (this.options && this.options[key]) || defaultValue
            },
            /**
             * 提交表单数据
             * @param value
             */
            handlerInput(value) {
                this.$emit('input', this.getSubmitValue(value))
            },
            /**
             * 数值改变
             * @param value
             */
            handlerChange(value) {
                this.$emit('change', this.getSubmitValue(value))
            },
            /**
             * 获取需要提交的数据
             * @param value
             * @returns {*}
             */
            getSubmitValue(value) {
                let submitValue = value
                const {formItemType, formItemSelectAll, formItemOptions, formItemValueKey} = this
                if (formItemType === 'select' && formItemSelectAll) {
                    submitValue = formItemOptions.find(item => {
                        return item[formItemValueKey] === value
                    })
                }
                return submitValue
            }
        }
    }
</script>
