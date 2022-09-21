<template>
  <Navbar />
  <RouterView> </RouterView>
</template>

<script>
import { supabase } from './services/supabase'
import Navbar from './components/UI/Navbar.vue'

export default {
  methods: () => {},
  computed: {
    isLoggedIn: () => supabase.auth.user(),
  },
  components: { Navbar },
}
</script>

<style scoped></style>
