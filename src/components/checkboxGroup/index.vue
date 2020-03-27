<template>
  <div class="components_checkboxGroup">
    <el-checkbox :indeterminate="isIndeterminate"
                 v-if="!hideCheckAllBox"
                 v-model="checkAll"
                 @change="handleCheckAllChange">全选
    </el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group :value="selectedValue"
                       @input="handlerInput">
      <el-row>
        <el-col v-for="item in option"
                style="marginBottom:10px"
                :span="boxSize"
                :key="item[valueKey]">
          <el-checkbox :label="item[valueKey]" :disabled="disabledAll||item.disabled">{{item[labelKey]}}</el-checkbox>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  props: {
    option: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    selectAllItem: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    value: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    labelKey: {
      type: String,
      required: false,
      default () {
        return 'label'
      }
    },
    valueKey: {
      type: String,
      required: false,
      default () {
        return 'value'
      }
    },
    boxSize: {
      type: Number,
      required: false,
      default () {
        return 6
      }
    },
    hideCheckAllBox: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    disabledAll: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    }
  },
  watch: {
    selectedValue: {
      deep: true,
      handler (selectedValue) {
        this.handleCheckedChange(selectedValue)
      }
    }
  },
  computed: {
    isIndeterminate () {
      const {selectedValue} = this
      const checkedCount = selectedValue.length
      return checkedCount > 0 && checkedCount < this.option.length
    },
    selectedValue () {
      if (!this.selectAllItem) {
        return this.value || []
      }
      return (this.value || []).map(item => {
        return item[this.valueKey]
      })
    },
    allValue () {
      return this.option.map(item => {
        return item[this.valueKey]
      })
    }
  },
  data () {
    return {
      checkAll: false
    }
  },
  methods: {
    handlerInput (values) {
      if (this.selectAllItem) {
        this.$emit('input', values.map(value => {
          return this.option.find(item => {
            return item[this.valueKey] === value
          })
        }))
        return
      }
      this.$emit('input', values)
    },
    handleCheckAllChange (val) {
      this.handlerInput(val ? this.allValue : [])
    },
    handleCheckedChange (value = []) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.allValue.length
    }
  }
}
</script>
<style lang="scss">
  @import "./index.scss";
</style>
