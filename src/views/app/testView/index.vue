<template>
    <div>
        <sas-table :data="tableData" :columnList="columnList" v-model="select" ref="testTable" :reserveSelection="true"
                   row-key="id" @select="handlerSelect"/>
        <el-button @click="handlerFirst">first</el-button>
        <el-button @click="handlerNext">next</el-button>
        <el-button @click="handlerTest">test</el-button>
        <el-button @click="handlerTes">tes</el-button>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                select: [],
                tableData: [],
                columnList: [{type: 'selection'}, {label: 'id', key: 'id'}]
            }
        },
        methods: {
            handlerSelect(select, row) {
                console.log(select, row)
            },
            handlerTes() {
                this.select = []
            },
            handlerTest() {
                this.select = [{id: '456'}]
            },
            handlerFirst() {
                this.tableData = [{id: '123'}, {id: '223'}]
            },
            handlerNext() {
                this.tableData = [{id: '456'}]
            }
        }
    }
</script>

<style scoped>

</style>
