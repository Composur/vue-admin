<template>
  <el-pagination :current-page="currentPage" :page-size="pageSize" :total="total" background layout="prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 5
    },
    total: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
    }

  }
}
</script>
