    const routes = [
        {path:'/home',component:home}
    
    ]
    
    const router = new vueRouter({
        routes
    })

    const app = new Vue({ router}).$mount('#app')
