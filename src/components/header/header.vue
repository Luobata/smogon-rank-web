<template>
    <div class="header">
        <span class="logo"></span>
        <span class="title">Pokemon Showdown</span>
        <span class="link">
            <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">使用率统计</el-menu-item>
            </el-menu>
        </span>
    </div>
</template>
<style scoped>
    .header {
        font-family: microsoft yahei;
        background-color: #324157;
        text-align: center;
    }
    .header .title {
        font-size: 20px;
        height: 60px;
        line-height: 60px;
        vertical-align: top;
        color: #fff;
    }
    .header .link {
        display: inline-block;
        float: right;
    }
</style>
