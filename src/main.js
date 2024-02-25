import { createApp } from 'vue';
import App from "./App";
import router from "@/router/router";
import components from '@/components/UI';

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(router)
    .mount('#app')