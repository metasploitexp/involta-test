<template>
    <div class="item" :class="{'item--rows': grid === 'rows'}">
        <div class="item__content">
            <div class="item__content-image" v-if="grid === 'rows'">
                <img :src="item.enclosure" alt="">
            </div>
            <div class="item__content-text">
                <div class="item__title">
                    {{ item.title }}
                </div>
                <div class="item__description">
                    {{ item.description }}
                </div>
            </div>
        </div>
        <div class="item__about" v-if="grid === 'columns'">
            Подробнее
        </div>
        <div class="item__footer">
            <div>
                {{ item.link }}
            </div>
            <div>
                {{ date }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNewsStore } from '../stores/news';
import { storeToRefs } from 'pinia';

    const props = defineProps({
        item: {
            type: Object,
            default: () => {},
        },
    });
    const date = computed(() => {
        const date = new Date(props.item.pubDate);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    })

    const newsStore = useNewsStore();
    const grid = storeToRefs(newsStore).grid
</script>

<style lang="scss">
.item {
    flex-grow: 1;
    width: 40%;
    border-radius: 3px;
    box-shadow: 0 1px 4px #000;
    padding: 30px 30px 15px;
    display: flex;
    flex-direction: column;

    &--rows {
        width: 100%;
        box-sizing: border-box;
    }

    &__content {
        display: flex;
        gap: 30px;

        @media all and (max-width: 950px) {
            flex-direction: column;
        }

        &-image {
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 30%;
            height: 100%;
            margin-bottom: 20px;

            @media all and (max-width: 950px) {
                margin-bottom: 0px;
                max-width: 100%;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }
    }


    &__title {
        font-size: 18px;
        font-weight: 700;
        color: #0029FF;
        line-height: 22px;
    }

    &__description {
        font-size: 14px;
        font-weight: 400;
        margin: 25px 0 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: 1;
        max-height: 3;
    }

    &__about {
        color: #0029FF;
        font-size: 14px;
        font-weight: 400;
        text-decoration: underline;
        margin-bottom: 20px;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        color: #DCDCDC;
        margin-top: auto;
    }
}
</style>