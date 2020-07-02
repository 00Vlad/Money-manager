<template>
  <main class="app-content">
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Record History</h3>
        </div>

        <div class="history-chart">
          <canvas></canvas>
        </div>

        <Loader v-if="loading"/>
        <p v-else-if="!records.length" class="center">
          There are no records.
          <router-link to="/record">Create new category</router-link>
        </p>
        <section v-else>
          <HistoryTable :records="records" />
        </section>

      </div>
    </div>
  </main>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'history',
  components: { HistoryTable },
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted () {
    // this.records = await this.$store.dispatch('fetchRecords')
    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Income' : 'Outcome'
      }
    })
    this.loading = false
  }
}
</script>
