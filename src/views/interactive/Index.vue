<template>
  <div
    class="cpt-sticky"
    :class="fixedClass"
    :style="{ top: top + 'px', zIndex }"
  >
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    // top: Number,
    // parent: String,
    // zIndex: Number,
  },

  data() {
    return {
      fixedClass: '',
      scrollElement: null,
    }
  },

  mounted() {
    this.initScrollElement()
  },

  destroyed() {
    this.removeScrollEvent()
  },

  methods: {
    handleScroll() {
      const scrollOffsetTop = this.$el.offsetTop - this.top
      if (this.scrollElement.scrollTop >= scrollOffsetTop) {
        this.fixedClass = 'top-fixed'
      } else {
        this.fixedClass = ''
      }
    },

    initScrollElement() {
      const element = document.querySelector(this.parent)
      if (element) {
        this.removeScrollEvent()
        this.scrollElement = element
        this.scrollElement.addEventListener('scroll', this.handleScroll)
      }
    },
    removeScrollEvent() {
      if (this.scrollElement) {
        this.scrollElement.removeEventListener('scroll', this.handleScroll)
      }
    },
  },
}
</script>
<style lang="scss">
.cpt-sticky {
  .top-fixed {
    position: fixed;
    width: 100%;
    background: #fff;
  }
}
</style>
