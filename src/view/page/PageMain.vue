<template>
    <div class="page__main">
        <input-number step="2" min="-10" max="5" value="0" />
    </div>
</template>

<script>
    import InputNumber from "../components/InputNumber.vue";
    const componentsList = {};
    componentsList[InputNumber.name] = InputNumber;

    export default {
        name: "PageMain",
        components: componentsList,
    }
</script>
<style scoped>

</style>