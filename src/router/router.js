import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home";
import CampaignsPage from "@/pages/CampaignsPage";
import CustomersPage from "@/pages/CustomersPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage"

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/customers',
        component: CustomersPage
    },
    {
        path: '/campaigns',
        component: CampaignsPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;