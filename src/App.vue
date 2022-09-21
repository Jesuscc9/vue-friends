<template>
  <Navbar />
  <RouterView />
</template>

<script>
import Navbar from './components/UI/Navbar.vue'

export default {
  methods: () => {},
  components: { Navbar },
}
</script>

<style scoped></style>
