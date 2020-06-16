<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div>{{es}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VueTreeList, Tree, TreeNode } from "vue-tree-list";
export default {
  name: "Dashboard",
  components: {
    VueTreeList
  },
  data() {
    return {
      newTree: {}
    };
  },
  methods: {
    touchStart(id) {
      const dom = document.getElementById(id);
      console.log(dom);
    },
    onDel(node) {
      console.log(node);
      node.remove();
    },

    onChangeName(params) {
      console.log(params);
    },

    onAddNode(params) {
      console.log(params);
    },

    onClick(params) {
      console.log(params);
    },

    addNode() {
      var node = new TreeNode({
        name: "new node",
        isLeaf: false
      });
      if (!this.data.children) this.data.children = [];
      this.data.addChildren(node);
    },
    getNewTree() {
      var vm = this;

      function _dfs(oldNode) {
        var newNode = {};

        for (var k in oldNode) {
          if (k !== "children" && k !== "parent") {
            newNode[k] = oldNode[k];
          }
        }

        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = [];
          for (var i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]));
          }
        }
        return newNode;
      }

      vm.newTree = _dfs(vm.data);
    }
  },
  computed: {
    ...mapGetters(["name"]),
    es:function(){
      // return this.newTree.test?.test
    }
  }
};
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
