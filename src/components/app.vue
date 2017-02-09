<template>
    <div id="app">
        <layout></layout>
    </div>
</template>
<style scoped>
    #app {
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
            'layout': require('../layout/index.vue')
        }
    }
</script>
