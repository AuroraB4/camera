import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ResponseDefinition from './components/ResponseDefinition.vue'
import Request from './components/Request.vue'

const app = createApp(App)
app.mount('#app')

export default {
  data() {
    return {
    };
  }
};
