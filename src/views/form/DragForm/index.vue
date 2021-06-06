<template>
  <div>
    <div class="pic" />
    <div class="flex">
      <div class="card" />
      <div class="card" />
      <div class="card" />
      <div class="card" />
    </div>
    <transition-group name="more" :css="false" @before-enter="beforeEnter" @enter="enter">
      <div v-for="item in arr" v-if="show3" :key="item" :data-index="item">
        <div class="item">
          <div class="square" />
          <div class="content">
            <div>&nbsp;</div>
            <div>&nbsp;</div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      show1: false,
      show2: false,
      show3: false,
      arr: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  mounted() {
    setTimeout(() => {
      this.show1 = !this.show1
      this.show2 = !this.show2
      this.show3 = !this.show3
    })
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      console.log(el.querySelector('.item'))
      const delay = el.dataset.index * 100
      setTimeout(() => {
        el.style.transition = 'opacity 0.4s '
        el.style.opacity = 1
        el.style.animation = 'one-in 0.4s infinite'
        el.style['animation-iteration-count'] = 1
        done()
      }, delay)
    }
  }
}
</script>
<style scoped>
.pic {
  width: 97%;
  height: 120px;
  margin: 20px 5px;
  border-radius: 8px;
  background: #cae5e8;
}

.item {
  margin: 5px;
  padding: 0px;
  overflow: hidden;
}

.item div {
  display: inline;
  float: left;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.card {
  width: 65px;
  height: 65px;
  margin: 15px 12px;
  margin-top: 0px;
  border-radius: 8px;
  background: #cae5e8;
}

.item::after {
  content: '';
  clear: both;
  display: block;
}

.square {
  width: 20%;
  height: 75px;
  background: #cae5e8;
  border-radius: 8px;
}

.content {
  width: 79%;
}

.content div {
  margin: 15px;
  margin-top: 0px;
  padding: 0px;
  width: 95%;
  border-radius: 8px;
  line-height: 30px;
  background: #99d1d3;
}

.content div:last-child {
  width: 65%;
  background: #cae5e8;
}

@keyframes one-in {
  from {
    padding-top: 100px;
    height: 0%;
  }

  to {
    padding-top: 0px;
    height: 100%;
  }
}
</style>
