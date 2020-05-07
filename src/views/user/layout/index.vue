<template>
    <div class="loginLayout">
        <div class="loginLayout_content">
            <router-view/>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .loginLayout {
        @include absolutePositionView;
        background: url("~@/assets/loginbg.png") no-repeat center center;
        background-size: cover;
        &_content{
            padding: 20px;
            overflow: hidden;
            @include absolutePositionView;
            border-radius: 20px;
            background: #efefef;
            margin: auto;
            width: 500px;
            height: 300px;
        }
    }
</style>
