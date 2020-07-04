<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link of navbarLinks"
      :key="link.path"
      tag="li"
      active-class="active"
      :exact="link.exact"
      :to="link.path"
    >
      <a href='#' class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ['value'],
  data: () => ({
    navbarLinks: [
      { title: localizeFilter('Menu_Bill'), path: '/', exact: true },
      { title: localizeFilter('Menu_History'), path: '/history' },
      { title: localizeFilter('Menu_Planning'), path: '/planning' },
      { title: localizeFilter('Menu_Record'), path: '/record' },
      { title: localizeFilter('Menu_Category'), path: '/categories' }
    ]
  })
}
</script>
