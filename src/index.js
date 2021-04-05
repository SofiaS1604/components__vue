import Vue from 'vue';

import Main from './view/App.vue';
import style from './style/styles.styl'


const App = new Vue({
    el: '#app',
    name: 'App',
    render: h => h(Main)
});