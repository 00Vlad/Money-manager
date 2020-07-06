<template>
  <main class="app-content">
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>{{ 'Record' | localize }}</h3>
        </div>

        <Loader v-if="loading" />

        <p v-else-if="!categories.length" class="center">{{ 'Record_NoCategories' | localize }} <router-link to="/categories">{{ 'Record_CreateCategory' | localize }}</router-link></p>

        <form v-else class="form" @submit.prevent='handleSubmit'>
          <div class="input-field">
            <select ref="select" v-model="category">
              <option
                v-for="c of categories"
                :key="c.id"
                :value="c.id"
              >{{ c.title }}</option>
            </select>
            <label>{{ 'Record_ChooseCategory' | localize }}</label>
          </div>

          <p>
            <label>
              <input class="with-gap" name="type" type="radio" value="income"
                v-model="type" />
              <span>{{ 'Record_Income' | localize }}</span>
            </label>
          </p>

          <p>
            <label>
              <input class="with-gap" name="type" type="radio" value="outcome"
                v-model="type" />
              <span>{{ 'Record_Outcome' | localize }}</span>
            </label>
          </p>

          <div class="input-field">
            <input id="amount" type="number"
              v-model.number="amount"
              :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }" />
            <label for="amount">{{ 'Record_Amount' | localize }}</label>
            <span
              v-if="$v.amount.$dirty && !$v.amount.minValue"
              class="helper-text invalid"
              >{{ 'Category_LimitError' | localize }} {{ $v.amount.$params.minValue.min }}
            </span>
          </div>

          <div class="input-field">
            <input id="description" type="text"
              v-model.trim="description"
              :class="{ invalid: $v.description.$dirty && !$v.description.required }" />
            <label for="description">{{ 'Record_Description' | localize }}</label>
            <span
              v-if="$v.description.$dirty && !$v.description.required"
              class="helper-text invalid"
              >{{ 'Record_DescriptionError' | localize }}
            </span>
          </div>

          <button class="btn waves-effect waves-light" type="submit">
            {{ 'Record_Create' | localize }}
            <i class="material-icons right">send</i>
          </button>
        </form>

      </div>
    </div>
  </main>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'record',
  metaInfo () {
    return {
      title: this.$title('Record')
    }
  },
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async handleSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Record created succesfully')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`Insufficient funds in the account (${this.amount - this.info.bill})`)
      }
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      // eslint-disable-next-line no-undef
      this.select = M.FormSelect.init(this.$refs.select)
      // eslint-disable-next-line no-undef
      M.updateTextFields()
    }, 0)
  },
  destroyed () {
    if (this.select && this.select.destroyed) {
      this.select.destroyed()
    }
  }
}
</script>
