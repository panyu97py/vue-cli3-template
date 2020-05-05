<template>
    <el-form class="form_view"
             ref="form"
             :model="model"
             :labelWidth="labelWidth"
             :disabled="disabled"
             :rules="rules"
             :hide-required-asterisk="hideRequiredAsterisk">
        <el-row class="form_view_body"
                :gutter="gutter">
            <slot/>
        </el-row>
    </el-form>
</template>

<script>
    /**
     * 表单组件基于 el-form 二次开发
     */
    export default {
        props: {
            gutter: [Number, String],
            disabled: Boolean,
            rules: Array,
            model: Object,
            labelWidth: {
                type: String,
                default: () => '100px'
            },
            hideRequiredAsterisk: {
                type: Boolean,
                default: () => true
            }
        },
        methods: {
            validate (callBack) {
                this.$refs.form.validate(callBack)
            }
        }
    }
</script>
