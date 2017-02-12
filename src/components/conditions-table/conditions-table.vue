<template>
    <div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
                prop="rank"
                label="本月排名"
                align="center"
                width="100">
            </el-table-column>
            <el-table-column
                prop="name"
                label="pokemon"
            >
            </el-table-column>
            <el-table-column
                prop="rankChange"
                label="与上月排名相比"
                align="center"
                width="180">
            </el-table-column>
            <el-table-column
                prop="usage"
                label="使用率"
                align="center"
                width="180">
            </el-table-column>
            <el-table-column
                prop="change"
                label="与上月使用率相比"
                align="center"
                width="220">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
            @size-change="changePage"
            @current-change="changePage"
            :current-page="pageInfo.pageNum"
            :page-size="pageInfo.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pageInfo.total">
            </el-pagination>
        </div>
    </div>
</template>
<style scoped>
    .pagination {
        float: right;
        margin: 20px 0 0 0;
    }
</style>
<script>
    var rank = require('../../data/model/rank');
    module.exports = {
        data: function () {
            return {
                tableData: [
                ],
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                }
            }
        },
        methods: {
            changePage: function (page) {
                var that = this;
                that.pageInfo.pageNum = page;
                rank.getRankData({
                    pageNum: that.pageInfo.pageNum
                });
            }
        },
        beforeMount: function () {
            var that = this;
            rank.on('getRankData', function (data) {
                that.tableData = data.list;
                that.pageInfo.total = data.total;
            });
            rank.on('setPageNum', function (data) {
                that.pageInfo.pageNum = data;
            });
        }
    };
</script>
