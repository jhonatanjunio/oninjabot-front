const routes: {}[] = [
    {
        path: '/',
        name: 'home.index',
        component: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                resolve(import('./views/home.vue'))
                reject(new Error('Failed to load page'))
            })
        },
    },
    {
        path: '/music-player',
        name: 'spotify.player',
        component: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                resolve(import('./views/spotify-musicplayer.vue'))
                reject(new Error('Failed to load page'))
            })
        },
    },
    {
        path: '/slot-machine',
        name: 'slot.machine',
        component: (): Promise<any> => {
            return new Promise((resolve, reject) => {
                resolve(import('./views/slot-machine.vue'))
                reject(new Error('Failed to load page'))
            })
        },
    },
]

export default routes