import { createRouter, createWebHistory} from 'vue-router'

//page
import Home from '../views/page/HomePage.vue'
import AddContact from '../views/page/AddContactPage.vue'
import ErrorPage from '../views/page/ErrorPage.vue'
//layouts
import MainLayout from '../views/layouts/MainLayout.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'HomePage',
                component: Home
            }
        ]
    },
    {
        path: '/add-contact',
        name: 'AddContact',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'AddContactPage',
                component: AddContact
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Error',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'ErrorPage',
                component: ErrorPage
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router