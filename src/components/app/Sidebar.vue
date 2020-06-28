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
export default {
  props: ['value'],
  data: () => ({
    navbarLinks: [
      { title: 'Cash account', path: '/', exact: true },
      { title: 'History', path: '/history' },
      { title: 'Planning', path: '/planning' },
      { title: 'New record', path: '/record' },
      { title: 'Categories', path: '/categories' }
    ]
  })
}
</script>
