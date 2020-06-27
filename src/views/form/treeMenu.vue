<template>
  <ul>
    <tree-item class="item" :item="treeData" @make-folder="makeFolder" @add-item="addItem" />
  </ul>
</template>
<script>
import Vue from 'vue'
import TreeIem from './treeMenuItem'
var treeData = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'wat' }]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'wat' }]
        }
      ]
    }
  ]
}
export default {
  components: {
    'tree-item': TreeIem
  },
  data: function() {
    return {
      treeData
    }
  },
  methods: {
    makeFolder: function(item) {
      Vue.set(item, 'children', [])
      this.addItem(item)
    },
    addItem: function(item) {
      item.children.push({
        name: 'new stuff'
      })
    }
  }
}
</script>
