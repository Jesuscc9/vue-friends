<template>
  <RouterView />
</template>

<script>
import { supabase } from './services/supabase'
import { useRouter } from 'vue-router'

export default {
  setup: function () {
    const router = useRouter()

    const user = supabase.auth.user()

    if (user === null) return
    router.push('/posts')
  },
}
</script>

<style scoped></style>
