import { createRouter, createWebHistory} from 'vue-router'

//page
import Home from '../views/page/HomePage.vue'
import AddContact from '../views/page/AddContactPage.vue'
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router