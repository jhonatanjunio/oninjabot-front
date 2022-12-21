import { createApp } from 'vue'

import App from './App.vue'
import router from "./router"
import VueSocketIO from 'vue-3-socket.io'
import io from "socket.io-client"
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSpotify);

const socket = new VueSocketIO({
    debug: true,
    connection: io('http://localhost:3003'),
    vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
    }
});

createApp(App)
    .use(router)
    .use(socket)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

    