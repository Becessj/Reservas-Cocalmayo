import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.directive('tooltip', VTooltip)


Vue.use(VTooltip)

new Vue({
  data: {
    msg: 'This is a button.'
  }
})

