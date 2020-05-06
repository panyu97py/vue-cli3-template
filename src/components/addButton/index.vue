<template>
    <div @click="handlerClick" class="addButton">
        <p class="addButton_icon">+</p>
        <p v-if="!$slots.default && text" class="addButton_text">{{text}}</p>
        <slot v-else/>
    </div>
</template>

<script>
    export default {
        props: {
            text: String
        },
        methods: {
            handlerClick() {
                this.$emit('click')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .addButton {
        display: flex;
        cursor: pointer;

        > p {
            margin: 0 5px;
        }

        &_icon {
            line-height: 20px;
            border-radius: 2px;
            width: 20px;
            height: 20px;
            background: #ffa90b;
            color: white;
        }

        &_text {

        }
    }
</style>
