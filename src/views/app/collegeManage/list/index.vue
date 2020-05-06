<template>
    <sas-card title="学院管理">
        <template v-slot:headRight>
            <sas-add-button text="添加学院"/>
        </template>
        <sas-table :column-list="columnList"/>
    </sas-card>
</template>

<script>
    export default {
        data() {
            return {
                columnList: []
            }
        }
    }
</script>
