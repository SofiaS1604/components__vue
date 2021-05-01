<template>
    <div class="page__main">
        <input-number min="10" step="3" value="0"/>
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