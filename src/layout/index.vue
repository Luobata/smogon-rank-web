<template>
    <div class="doc">
        <index-header></index-header>
    </div>
</template>
<style scoped>
    .doc {
        background-color: #F5F5F5;
        font-size: 0;
        min-width: 1200px;
        height: 100%;
    }
</style>
<script>
    module.exports = {
        data: function () {
            return {
            }
        },
        components: {
            'index-header': require('../components/header/header.vue')
        }
    }
</script>
