<template>
  <main class="app-content">
    <div class="app-page">
      <div>
        <Loader v-if="loading"/>
        <div v-else-if="record">
          <div class="breadcrumb-wrap">
            <router-link to="/history" class="breadcrumb">History</router-link>
            <a @click.prevent class="breadcrumb">
              {{ record.type === 'income' ? 'Income' : 'Outcome' }}
            </a>
          </div>
          <div class="row">
            <div class="col s12 m6">
              <div class="card" :class="{
                  'red': record.type === 'outcome',
                  'green' : record.type === 'income'
                  }">
                <div class="card-content white-text">
                  <p>Description: {{ record.description }}</p>
                  <p>Amount: {{ record.amount | currencyFilter('PLN') }}</p>
                  <p>Category: {{ record.categoryName }}</p>

                  <small>{{ record.date | dateFilter('datetime') }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="center">No such record</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: this.$title('Details')
    }
  },
  data: () => ({
    name: 'detail',
    record: null,
    loading: true
  }),
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    // eslint-disable-next-line no-unused-vars
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }
    this.loading = false
  }
}
</script>
