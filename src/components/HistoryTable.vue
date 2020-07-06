<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ 'History_TableAmount' | localize }}</th>
        <th>{{ 'History_TableDate' | localize }}</th>
        <th>{{ 'History_TableCategory' | localize }}</th>
        <th>{{ 'History_TableType' | localize }}</th>
        <th>{{ 'History_TableOpen' | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount | currencyFilter('PLN') }}</td>
        <td>{{ record.date | dateFilter('date') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge"
               :class="[record.typeClass]">
            {{ recordType(record.typeText) | localize }}
          </span>
        </td>
        <td>
          <button
            v-tooltip="'Look throw record'"
            class="btn-small btn"
            @click="$router.push(`/details/${record.id}`)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
//  import localizeFilter from '@/filters/localize.filter'

export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  methods: {
    recordType (el) {
      return el === 'Income' ? 'History_TypeIncome' : 'History_TypeOutcome'
    }
  }
}
</script>
