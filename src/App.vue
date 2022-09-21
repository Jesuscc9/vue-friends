<template>
  <Navbar />
  <RouterView />
</template>

<script>
import Navbar from '@/components/UI/Navbar.vue'
import { supabase } from './services/supabase'

export default {
  methods: () => {},
  components: { Navbar },
  computed: {
    isLoggedIn: () => supabase.auth.user(),
  },
}
</script>

<style scoped></style>
