import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/user';

Vue.use(Vuex);

// eslint-disable-next-line
export default new Vuex.Store({
    state: {
        sideBarOpen: false,
    },
    getters: {
        sideBarOpen: state => {
            return state.sideBarOpen;
        },
    },
    mutations: {
        toggleSidebar(state) {
            state.sideBarOpen = !state.sideBarOpen;
        },
    },
    actions: {
        toggleSidebar(context) {
            context.commit('toggleSidebar');
        },
    },
        modules: {
        user,
    },
});
