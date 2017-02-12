<template>
    <div class="doc">
        <index-header></index-header>
        <div class="content">
            <condition-select></condition-select>
            <condition-table></condition-table>
        </div>
    </div>
</template>
<style scoped>
    .doc {
        background-color: #F5F5F5;
        font-size: 0;
        min-width: 1200px;
        height: 100%;
    }
    .content {
        width: 1200px;
        margin: 50px auto;
    }
</style>
<script>
    module.exports = {
        data: function () {
            return {
            }
        },
        components: {
            'index-header': require('../components/header/header.vue'),
            'condition-select': require('../components/conditions-select/conditions-select.vue'),
            'condition-table': require('../components/conditions-table/conditions-table.vue')
        }
    }
</script>
