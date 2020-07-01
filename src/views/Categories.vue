<template>
  <main class="app-content">
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Categories</h3>
        </div>

        <section>
          <Loader v-if="loading" />
          <div v-else class="row">
            <CategoryCreate @created="addNewCategory"/>
            <CategoryEdit :categories="categories"/>
          </div>
        </section>

      </div>
    </div>
  </main>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true
  }),
  async mounted () {
    this.categories = this.$store.dispatch('fetchCategories')
    console.log(this.categories)
    this.loading = false
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    }
  },
  components: { CategoryCreate, CategoryEdit }
}
</script>
