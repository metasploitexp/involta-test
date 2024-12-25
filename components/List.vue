<template>
    <ClientOnly>
    <div class="list" :class="{'list--columns': grid === 'columns'}">
        <Item v-for="item, key in items" :key="key" :item="item" />
    </div>
</ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNewsStore } from '../stores/news';
import { storeToRefs } from 'pinia';

const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
});

const items = computed(() => {
    return props.data
})

const newsStore = useNewsStore();
const grid = storeToRefs(newsStore).grid
</script>

<style lang="scss">
.list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;

    &--columns {
        flex-flow: row wrap;
    }
}
</style>