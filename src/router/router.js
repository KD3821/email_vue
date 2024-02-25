import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home";
import CampaignPage from "@/pages/CampaignPage";
import CustomerPage from "@/pages/CustomerPage";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/customers',
        component: CustomerPage
    },
    {
        path: '/campaigns',
        component: CampaignPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;