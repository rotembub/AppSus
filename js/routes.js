
import homePage from './pages/home-page.cmp.js'
import emailApp from './apps/mail/pages/email-app.cmp.js'
import emailDetails from './apps/mail/pages/email-details.cmp.js'
import noteApp from './apps/keep/pages/note-app.cmp.js'


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/email',
        component: emailApp,
    },
    {
        path: '/email/:emailId',
        component: emailDetails,
    },
    {
        path: '/note',
        component: noteApp,
    }

]


export const router = new VueRouter({ routes })