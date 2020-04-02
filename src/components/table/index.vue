<template>
    <el-table :data="data"
              stripe
              ref="table"
              class="components_table"
              :key="tableKey"
              :rowKey="rowKey"
              :height="height"
              @row-click="handlerRowClick"
              @select="handlerSelect"
              @select-all="handlerSelectAll"
              @selection-change="handlerSelectionChange"
              header-cell-class-name="components_table_head"
              cell-class-name="components_table_cell">
        <template v-for="(item,index) in columnList">
            <el-table-column v-if="item.type==='selection'"
                             :key="index"
                             :reserve-selection="reserveSelection"
                             :type="item.type"
                             width="55"/>
            <el-table-column v-else-if="item.type==='html'"
                             :width="item.width"
                             :label="item.label"
                             :key="index">
                <template slot-scope="scope">
                    <div v-html="scope.row[item.key]"></div>
                </template>
            </el-table-column>
            <el-table-column :label="item.label"
                             :width="item.width"
                             :key="index"
                             v-else-if="item.type==='operate'">
                <template slot-scope="scope">
                    <operate :keys="item.key.split(',')"
                             :hideOperates="scope.row.hideOperates"
                             :disableOperates="scope.row.disableOperates"
                             @click="handlerOperate($event,scope.row,item)"/>
                </template>
            </el-table-column>
            <el-table-column v-else-if="item.type==='slot'"
                             :width="item.width"
                             :label="item.label"
                             :key="index">
                <template slot-scope="scope">
                    <slot :name="item.key"
                          :row="scope.row"/>
                </template>
            </el-table-column>
            <el-table-column v-else
                             :key="index"
                             :width="item.width"
                             :prop="item.key"
                             :label="item.label"/>
        </template>
        <slot/>
    </el-table>
</template>

<script>
    import operate from './operate'

    export default {
        props: {
            height: [String, Number],
            tableKey: String,
            value: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            data: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            columnList: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            primaryKey: {
                type: String,
                default: function () {
                    return 'id';
                }
            },
            sensitiveOperationKeys: {
                type: Array,
                default: function () {
                    return ['delete'];
                }
            },
            reserveSelection: Boolean,
            rowKey: [String, Function]
        },
        components: {
            operate
        },
        watch: {
            value: {
                deep: true,
                handler(newValue, oldValue) {
                    const {primaryKey} = this
                    console.log(newValue, oldValue)
                    // 新增数据选中
                    newValue.filter(newValueItem => (
                        oldValue.findIndex(oldValueItem => (
                            oldValueItem[primaryKey] === newValueItem[primaryKey]
                        )) < 0
                    )).forEach(item => {
                        console.log('+',item)
                        this.handlerToggleRowSelection(item, true)
                    })
                    // 取消选中减少的数据
                    oldValue.filter(newValueItem => (
                        newValue.findIndex(oldValueItem => (
                            oldValueItem[primaryKey] === newValueItem[primaryKey]
                        )) < 0
                    )).forEach(item => {
                        console.log('-',item)
                        this.handlerToggleRowSelection(item, false)
                    })
                }
            }
        },
        methods: {
            /**
             * 选中或取消选中触发
             */
            handlerSelect(selection, row) {
                this.$emit('select', selection, row)
            },
            /**
             * 选中或取消当前页全部选择
             */
            handlerSelectAll(selection) {
                this.$emit('selectAll', selection)
            },
            /**
             * 当前页选中的选项改变
             */
            handlerSelectionChange(selection) {
                this.$emit('selectionChange', selection)
                this.$emit('input', selection)
            },
            /**
             * row 的点击事件
             */
            handlerRowClick(row, event, column) {
                this.$emit('rowClick', row, event, column)
            },
            /**
             * 切换选择项选中状态
             */
            handlerToggleRowSelection(row, status) {
                const selectRow = this.data.find(item => (item[this.primaryKey] === row[this.primaryKey]))
                if (selectRow) {
                    this.$refs.table.toggleRowSelection(selectRow, status)
                } else {
                    this.$refs.table.toggleRowSelection(row, status)
                }
            },
            /**
             * 操作
             */
            async handlerOperate(key, row, item) {
                const SensitiveOperationKeys = ['delete', 'cancel', 'release']
                const isSensitiveOperation = SensitiveOperationKeys.indexOf(key) >= 0
                if (isSensitiveOperation) {
                    await this.handlerSensitiveOperation(item, key)
                }
                this.$emit(key, row)
            },
            /** 敏感操作 */
            handlerSensitiveOperation(item, key) {
                return new Promise((resolve, reject) => {
                    this.$confirm(item[`${key}WarningMsg`] || '此操作为敏感操作, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        resolve()
                    }).catch((err) => {
                        this.$notify.info({
                            title: '消息',
                            message: '已取消'
                        })
                        reject(err)
                    })
                })
            },
            /**
             * 导出为excel
             */
            exportExcel(hasSelection) {
                const excel = new this.$utils.Excel(this.$el)
                if (hasSelection) {
                    excel.deleteCol('Sheet1', 0)
                }
                excel.export()
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import "./index.scss";
</style>
