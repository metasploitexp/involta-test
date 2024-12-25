import { defineStore } from "pinia";

export const useNewsStore = defineStore({
    id: 'news-store',
    state: () => {
        return {
            backUrl: '/api/rss',
            data: [],
            urlList: [
                {
                    label: 'news.un.org',
                    link: 'https://news.un.org/feed/subscribe/ru/news/all/rss.xml',
                },
                {
                    label: 'mos.ru',
                    link: 'https://www.mos.ru/rss',
                }
            ], 
            sources: ['news.un.org', 'mos.ru'],
            perPage: 6,
            pages: 1,
            activeFeed: 0,
            items: [],
            search: '',
            grid: 'columns',
            itemCounter: 0,
        }
    },
    getters: {
        getUrlList: state => state.urlList,
        getData: state => state.data,
        getSources: state => state.sources,
        getPages: state => state.pages,
        getPerPage: state => state.perPage,
        getActiveFeed: state => state.activeFeed,
        getItems: state =>state.items,
        getSearch: state => state.search,
        getGrid: state => state.grid,
    },
    actions: {
        setGrid(value: string) {
            this.grid = value;
        },
        setSearch(value: string) {
            this.createItemsList();
            const route = useRoute();
            const router = useRouter();

            router.push({
                path: route.path,
                query: {...route.query, search: value},
            });

            if (!value.length) {
                return
            }
            
            const lowerValue = value.toLowerCase();
            let counter = 0;
            const page = Number(route.path.substring(1));
            const dimenstion = [(page-1) * this.perPage, page * this.perPage]

            this.items = this.filteredData()
                .map(x => {
                    return {
                        title: x.title[0],
                        description: x.description?.length ? x.description[0] : '',
                        link: `${x.link[0].split('ru')[0]}ru`,
                        pubDate: x.pubDate[0],
                        enclosure: x.enclosure[0]['$'].url
                    }
                })
                .filter(item => {
                    const lowerTitle = item?.title.toLowerCase();
                    const lowerDescription = item?.description.toLowerCase();
                    if (lowerTitle.includes(lowerValue) || lowerDescription.includes(lowerValue)) {
                        counter++;
                        return true;
                    }
                    return false;
                })
                .filter((item, idx) => {
                    if (idx >= dimenstion[0] && idx < dimenstion[1]) {
                        return true;
                    }
                    return false;
                })
            this.pages = Math.ceil(counter / this.perPage);
        },
        async refresh() {
            this.activeFeed = 0;
            const router = useRouter();
            await router.push(`/1`);
        },
        async setActiveFeed(value: number) {  
            this.activeFeed = value;

            const router = useRouter();
            const route = useRoute();
            
            await router.push({path:`/1`, query: {...route.query, source: value}});
            
            this.createItemsList();
        },
        createItemsList() {
            const route = useRoute();
            const page = Number(route.path.substring(1));
            const dimenstion = [(page-1) * this.perPage, page * this.perPage]

            if (route.query.hasOwnProperty('source')) {
                this.activeFeed = Number(route.query['source']);
            }
            
            if (route.query.hasOwnProperty('search')) {
                this.search = (route.query['search'] || '').toLowerCase();
            }

            this.items = [];
            
            this.filteredData()
                .filter(item => {
                    const lowerTitle = item?.title[0].toLowerCase();
                    const lowerDescription = item.description?.length ? item.description[0].toLowerCase() : ''
                    if (lowerTitle.includes(this.search) || lowerDescription.includes(this.search)) {
                        return true;
                    }
                    return false;
                })
                .forEach((x, idx) => {
                    const link = `${x.link[0].split('ru')[0]}ru`;
        
                    if (idx >= dimenstion[0] && idx < dimenstion[1]) {
                        this.items.push({
                            title: x.title[0],
                            description: x.description?.length ? x.description[0] : '',
                            link: link,
                            pubDate: x.pubDate[0],
                            enclosure: x.enclosure[0]['$'].url
                        })
                    }
                });

            this.pages = Math.ceil(this.itemCounter / this.perPage);
        },
        filteredData() {
            const sourceMapping = {
                1: 'https://news.un.org/feed/view/ru',
                2: 'https://www.mos.ru',
            }
            this.itemCounter = 0;
            return this.data
                .filter(x => {
                    const link = `${x.link[0].split('ru')[0]}ru`;
                    
                    if (!this.activeFeed || link === sourceMapping[this.activeFeed]) {
                        this.itemCounter++;
                        return true;
                    }
                    return false;
                })
        },
        fetchNews() {
            const requests = this.urlList.map(item => $fetch(this.backUrl, {
                method: 'POST',
                body: item,
            }));

            this.data = [];
    
            Promise.allSettled(requests)
                .then(results => {
                    results.forEach((result) => {
                        const response = result?.value?.data;
                        
                        if (response?.rss?.channel?.length) {
                            this.data.push(...response.rss.channel[0].item);
                        }
                    });
                })
                .then(() => this.createItemsList());
        }
    }
})