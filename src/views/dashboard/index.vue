<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
     <ul>
       <li v-for="(item, index) in items" 
       :key="index" 
        @touchstart.capture="touchStart(item.key)"
       :id="item.key">
         {{item.value}}
       </li>
     </ul>
  </div>
 
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data(){
    return {
     items:[{key:'zn1',value:'val01'},{key:'zn2',value:'val02'}] 
    }
  },
  methods:{
    touchStart(id){
      const dom = document.getElementById(id)
      console.log(dom)
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
