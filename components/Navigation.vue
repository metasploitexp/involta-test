<template>
    <div class="navigation">
        <div class="navigation__page" v-for="page, key in pages" :key="key">
            <NuxtLink :to="{path: `/${page}`, query: route.query}">{{page}}</NuxtLink>
            <!-- <div @click="handleRoute(page)">{{ page }}</div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNewsStore } from '../stores/news';
import { storeToRefs } from 'pinia';

const newsStore = useNewsStore();
const { pages }: any = storeToRefs(newsStore);
const route = useRoute();

const handleRoute = (page) => {
    const router = useRouter();
    router.push(`/`)
}

</script>

<style lang="scss">
.navigation {
    display: flex;
    justify-content: center;
    gap: 10px;

    &__page {
        font-size: 18px;
        font-weight: bold;

        a {
            color: #000;
            text-decoration: none;
        }

        .router-link-active {
            color: #0029FF;
        }
    }
}
</style>