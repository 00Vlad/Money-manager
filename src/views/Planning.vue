<template>
  <main class="app-content">
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Planning</h3>
          <h4>{{ info.bill | currencyFilter('PLN') }}</h4>
        </div>

        <Loader v-if="loading"/>
        <p v-else-if="!categories.length" class="center">There are no categories. <router-link to="/categories">Create new category</router-link></p>
        <section v-else>
          <div v-for="cat of categories" :key="cat.id">
            <p>
              <strong>{{ cat.title }}:</strong>
              {{ cat.spend | currencyFilter }} of {{ cat.limit | currencyFilter }}
            </p>
            <div class="progress" v-tooltip="cat.tooltip">
              <div class="determinate"
                  :class="[cat.progressColor]"
                  :style="{width: cat.progressPersent + '%'}">
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    // eslint-disable-next-line no-unused-vars
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)

      const percent = 100 * spend / cat.limit
      const progressPersent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'
      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Excess of' : 'Left'} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPersent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>
