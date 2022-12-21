import { reactive, toRefs } from 'vue';
import axios from 'axios';

const state = reactive({
    error: null,
    channels: [],
    currentUser: {},
    currentChannel: {},
    channelUsers: [],
    channelMessages: [],
    navbar: {
        channels: true,
        users: true,
    },
});

const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

export default function () {

    const getUserData = async () => {
        const user = await instance.get('/users/').then((res) => res.data);
        return {
            avatar: user.avatar,
            username: user.username,
        };
    };

    const getMessages = async (channelId) => {
        try {
            const data = await instance.get('/messages?channelId=' + channelId).then((res) => res.data);
            state.channelMessages = data;
        } catch (err:any) {
            state.error = err;
        }
    };

    const addMessage = async (msgData) => {
        const userData = await getUserData();

        const data = {
            ...msgData,
            ...userData,
        };

        // state.channelMessages = [...state.channelMessages, data];
    };

    return {
        ...toRefs(state),

        getMessages
    }
}