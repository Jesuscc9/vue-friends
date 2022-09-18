<template>
  <RouterView />
</template>

<script>
import { supabase } from './services/supabase'
import { useRouter } from 'vue-router'

export default {
  setup: function () {
    const { currentRoute, push } = useRouter()
    supabase.auth.onAuthStateChange((evt, session) => {
      // console.log({ evt, session })
      // console.log({ currentRoute: currentRoute.value, push })
      // if (evt === 'SIGNED_IN') {
      //   if (currentRoute.value.fullPath.includes('posts')) return
      //   push('/posts')
      // }
    })
  },
}
</script>

<style scoped></style>
