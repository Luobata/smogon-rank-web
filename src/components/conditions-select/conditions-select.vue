<template>
    <div class="select">
        <el-select v-model="defaultValue.type" placeholder="单双打">
            <el-option
            v-for="item in select.type"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="defaultValue.class" placeholder="分级">
            <el-option
            v-for="item in select.class"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="defaultValue.rank" placeholder="分段">
            <el-option
            v-for="item in select.rank"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="defaultValue.time" placeholder="日期">
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
    var condition = require('../../data/model/condition');
    module.exports = {
        data: function () {
            return {
                defaultValue: {
                    type: '',
                    rank: '',
                    time: '',
                    class: ''
                },
                select: enumConfig.select
            }
        },
        beforeMount: function () {
            var that = this;
            condition.getConditionList(function (data) {
                that.select = data;
                for (var k in data) {
                    that.defaultValue[k] = data[k][0].value;
                }
            });
        }
    };
</script>
