<template>
    <div class="lenta">
        <Header />
        <Filter :sources="sources" />
        <List :data="items" />
        <Navigation />
    </div>
</template>

<script setup lang=ts>
import { useNewsStore } from '../stores/news';
import { storeToRefs } from 'pinia'

const newsStore = useNewsStore();
const { fetchNews } = newsStore;
fetchNews();
const { items, sources }: any = storeToRefs(newsStore);

</script>

<style lang=scss>
.lenta {
    padding: 35px 170px;
    display: flex;
    flex-direction: column;
    gap: 25px;

    @media all and (max-width: 950px) {
        padding: 35px 20px;
    }
}
</style>