import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home";
import CampaignsPage from "@/pages/CampaignsPage";
import CustomersPage from "@/pages/CustomersPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ErrorPage from "@/pages/ErrorPage";
import store from "@/store/store";
import { IS_USER_AUTHENTICATED_GETTER } from "@/store/storeConstants";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/error',
        component: ErrorPage
    },
    {
        path: '/register',
        component: RegisterPage,
        meta: { loggedIn: false }
    },
    {
        path: '/login',
        component: LoginPage,
        meta: { loggedIn: false }
    },
    {
        path: '/customers',
        component: CustomersPage,
        meta: { loggedIn: true }
    },
    {
        path: '/campaigns',
        component: CampaignsPage,
        meta: { loggedIn: true }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
    if (
        'loggedIn' in to.meta &&
        to.meta.loggedIn &&
        !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
    ) {
        next('/login');
    } else if (
        'loggedIn' in to.meta &&
        !to.meta.loggedIn &&
        store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
    ) {
        next('/campaigns');
    } else {
        next();
    }
})

export default router;