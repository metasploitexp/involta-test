<template>
    <div class="filter">
        <div 
            class="filter__feed" 
            :class="{'filter__feed--active': activeFeed === key}" 
            v-for="source, key in generalSources" 
            :key="key"
            @click="setActiveFeed(key)"
        >
            {{ source }}
        </div>
        <div class="filter__icons">
            <ClientOnly>
                <img class="filter__icons-each" v-if="activeTab === 'columns'" @click="setActiveTab('rows')" src="~/assets/icons/plitka1-grey.svg" alt="">
                <img class="filter__icons-each" v-else src="~/assets/icons/plitka1-blue.svg" alt="">
                <img class="filter__icons-each" v-if="activeTab === 'rows'" @click="setActiveTab('columns')" src="~/assets/icons/plitka2-grey.svg" alt="">
                <img class="filter__icons-each" v-else src="~/assets/icons/plitka2-blue.svg" alt="">
            </ClientOnly>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useNewsStore } from '../stores/news';
import { storeToRefs } from 'pinia';

    const props = defineProps({
        sources: {
            type: Array,
            default: () => [],
        }
    });
    const generalSources = ['Все', ...props.sources];
    let activeTab = ref('columns');

    const newsStore = useNewsStore();

    if (import.meta.client) {
        activeTab.value = localStorage.getItem('active-tab') || 'columns';
        newsStore.setGrid(activeTab.value)
    }

    const setActiveTab = (value) => {
        activeTab.value = value;
        localStorage.setItem('active-tab', value);
        newsStore.setGrid(value)
    }

    const activeFeed = storeToRefs(newsStore).activeFeed

    const setActiveFeed = (value) => {
        newsStore.setActiveFeed(value)
    }
</script>

<style lang='scss'>
.filter {
    display: flex;
    align-items: center;
    gap: 10px;

    &__feed {
        font-size: 14px;
        font-weight: 700;
        color: #0029FF;
        cursor: pointer;
        user-select: none;

        &--active {
            color: #000;
        }
    }

    &__icons {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        gap: 10px;

        &-each {
            cursor: pointer;
            user-select: none;
            svg rect {
                color: #C4C4C4;
                fill: #C4C4C4;
            }

            &--active {
                svg rect {
                    color: #0029FF;
                    fill: #0029FF;
                    
                }
            }
        }
    }
}
</style>