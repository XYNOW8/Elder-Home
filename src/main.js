// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Material Design Icons
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const app = createApp(App)
app.use(router)
app.use(store)

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify)

app.mount('#app')
