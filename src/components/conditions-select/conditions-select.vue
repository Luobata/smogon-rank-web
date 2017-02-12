<template>
    <div class="select">
        <el-select v-model="defaultValue.type" placeholder="单双打" @change="changeType">
            <el-option
            v-for="item in select.type"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="defaultValue.class" placeholder="分级" @change="changeType">
            <el-option
            v-for="item in select.class"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="defaultValue.rank" placeholder="分段" @change="changeType">
            <el-option
            v-for="item in select.rank"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="defaultValue.time" placeholder="日期" @change="changeType">
            <el-option
            v-for="item in select.time"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<style scoped>
    .select {
        width: 1200px;
        margin: 50px auto;
        text-align: center;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }
</style>
<script>
    var enumConfig = require('../../lib/config.json');
    var rank = require('../../data/model/rank');
    module.exports = {
        data: function () {
            return {
                defaultValue: {
                    type: '',
                    rank: '',
                    time: '',
                    class: ''
                },
                select: enumConfig.select,
                init: false
            }
        },
        methods: {
            changeType: function (value) {
                var that = this;
                if (!that.init) return;
                if (!that.defaultValue.type || !that.defaultValue.rank || !that.defaultValue.time || !that.defaultValue.class) return;
                rank.getRankData({
                    type: that.defaultValue.type,
                    rank: that.defaultValue.rank,
                    time: that.defaultValue.time,
                    classRange: that.defaultValue.class,
                    pageNum: 1
                });
            }
        },
        beforeMount: function () {
            var that = this;
            rank.getConditionList(function (data) {
                that.select = data;
                for (var k in data) {
                    that.defaultValue[k] = data[k][0].value;
                }
            });
        },
        mounted: function () {
            var that = this;
            that.init = true;
        }
    };
</script>
