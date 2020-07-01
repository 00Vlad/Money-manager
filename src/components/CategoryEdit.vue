<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>
      <form>
        <div class="input-field">
          <select ref="select">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id">
                {{ c.title }}
            </option>
          </select>
          <label>Choose category</label>
        </div>

        <div class="input-field">
          <input type="text" id="name" />
          <label for="name">Title</label>
          <span class="helper-text invalid">Title</span>
        </div>

        <div class="input-field">
          <input id="limit" type="number" />
          <label for="limit">Limit</label>
          <span class="helper-text invalid">Limit</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Refresh
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['categories'],
  data: () => ({
    select: null
  }),
  mounted () {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select)
    console.log(this.categories)
  },
  destroyed () {
    if (this.select && this.select.destroyed) {
      this.select.destroyed()
    }
  }
}
</script>
