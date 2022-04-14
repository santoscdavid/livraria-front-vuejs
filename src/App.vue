<template>
    <v-app>
        <menuBar></menuBar>
        <mainContent class="mx-2"></mainContent>
    </v-app>
</template>

<script>
import menuBar from './components/template/menu/menu.vue';
import mainContent from './components/template/content/content.vue';
export default {
    name: 'App',
    components: { menuBar, mainContent },
};
</script>

<style></style>
