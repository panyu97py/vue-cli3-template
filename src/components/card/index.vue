<template>
    <div class="card_view">
        <div class="card_view_head">
            <div class="card_view_head_left">
                <span v-if="title" class="card_view_title">{{title}}</span>
                <slot v-else name="headLeft"/>
            </div>
            <div class="card_view_head_right">
                <slot name="headRight"/>
            </div>
        </div>
        <div class="card_view_body">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: String
        }
    }
</script>

<style lang="scss" scoped>
    .card_view {
        box-sizing: border-box;
        padding: 20px;
        border-radius: 5px;
        background: #fff;

        &_title {
            font-size: 18px;
            font-weight: bold;
            color: black;
        }

        &_head {
            display: flex;
            justify-content: space-between;
            line-height: 20px;
            margin-bottom: 10px;
        }

    }
</style>
