<template>
    <div class="header">
        <div class="header__content">
            <div class="header__label">
                Список новостей
            </div>
            <div class="header__refresh" @click="refresh">
                <ClientOnly>
                    <img src="~/assets/icons/refresh.svg" />
                </ClientOnly>
            </div>
        </div>
        <div class="header__search">
            <input type="search" :value="search" @input="handleSearch" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNewsStore } from '../stores/news';
import { storeToRefs } from 'pinia';
 
 const store = useNewsStore();
 const refresh = store.refresh;
 const { search } = storeToRefs(store);

 const handleSearch = (event) => {
    store.setSearch(event.target.value)
 }
</script>

<style lang="scss">
.header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #DCDCDC;
    padding-bottom: 20px;

    @media all and (max-width: 950px) {
        flex-direction: column;
        gap: 25px;
        align-items: flex-start;
    }

    &__content {
        display: flex;
        gap: 40px;
        align-items: center;

        @media all and (max-width: 950px) {
            justify-content: space-between;
            width: 100%;
        }
    }

    &__refresh {
        user-select: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__label {
        font-size: 36px;
        font-weight: 700;

        @media all and (max-width: 950px) {
            font-size: 28px;
        }
    }

    &__search {
        margin-left: auto;
        min-width: 300px;

        @media all and (max-width: 950px) {
            width: 100%;
        }

        input {
            all: unset;
            border: 2px solid #DCDCDC;
            padding: 5px 10px;
            width: 100%;
            box-sizing: border-box;
        }
    }
}
</style>