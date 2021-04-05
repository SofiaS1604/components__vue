<template>
    <page-main/>
</template>

<script>
    import PageMain from "./page/PageMain.vue";
    const componentsList = {};
    componentsList[PageMain.name] = PageMain;

    export default {
        name: "App",
        components: componentsList,
    }
</script>

<style scoped>

</style>