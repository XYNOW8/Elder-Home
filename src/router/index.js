import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import FirebaseSignInView from '../views/FirebaseSignInView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import SendEmail from '@/views/SendEmail.vue'
import InteractiveTable from '@/views/InteractiveTable.vue'
import Map from '@/views/Map.vue'
import ExportCSV from '@/views/ExportCSV.vue'
import ChatBot from '@/views/ChatBot.vue'



const routes = [
  { path: '/', component: HomeView },
  { path: '/admin', component: AdminDashboardView },
  { path: '/FireLogin',name:'FireLogin', component: FirebaseSignInView },
  { path: '/FireRegister',name:'FireRegister', component: FirebaseRegisterView },
  { path: '/email',name:'SendEmail', component: SendEmail },
  { path: '/table',name:'Table', component: InteractiveTable },
  { path: '/map',name:'Map', component: Map },
  { path: '/csv',name:'CSV Exporter', component: ExportCSV },
  { path: '/chat',name:'ChatGPT', component: ChatBot },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('user') !== null;
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user ? user.role : null;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if (to.meta.requiresAuth && to.meta.roles && !to.meta.roles.includes(userRole)) {
    next('/login'); //
  } else {
    if (isLoggedIn) {
      if (userRole === 'admin' && to.path !== '/admin') {
        next('/admin'); // Redirect admin to AdminDashboard if not already there
      } else if (userRole === 'user' && to.path === '/admin') {
        next('/'); // Redirect user away from AdminDashboard
      } else {
        next(); // Proceed to the requested route
      }
    } else {
      next(); // Proceed to the requested route for non-logged-in users
    }
  }
});




export default router
