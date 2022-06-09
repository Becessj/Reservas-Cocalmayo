// 0. If using a module system, call Vue.use(VueRouter)



// 1. Define route components.
// These can be imported from other files

//

const Usuario = { template: '<div class="container"><table class="table"><tr v-for="user in usuarios"> <td>{{user.CLAVE}}</td></tr></table></div>' ,


data(){
    return{
        usuarios:[],
        
    }
},

methods:{
    refreshData(){
        axios.get("http://localhost:51811/api/Usuario")
        .then((response)=>{
            this.usuarios=response.data;
        });
    }
},
mounted:function(){
    this.refreshData();
}

}





const NotFound = { template: '<p>Page not found</p>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/usuario', component: Usuario }

]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes
})




// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.




new Vue({
  el: '#horario',
  data () {
    return {
      horarios:[]
    }
  },

  methods:{
    refreshData(){
          axios.get("http://localhost:51811/api/Horario")
        .then((response)=>{
            this.horarios=response.data;
            
        });
    }
},
template: '<select id="selecthorario" class="form-control" aria-label="Horario de Visita" ><option value = "0">Seleccione Horario de Visita</option><option v-for="horario in horarios"  :value="horario.IDHORARIO"> {{horario.DESCRIPCION}} </option></select>',


mounted:function(){
    this.refreshData();
}
})












//





// Now the app has started! data:
 