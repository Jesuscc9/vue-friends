import { defineStore } from 'pinia'
// import { supabase } from "@/services/supabase"

// const initialData = supabase.auth.user()

export const useUserStore = defineStore('user', {
  state: () => ({}),
  actions: {
    setUser(newUser) {
      // this.name = name
      // this.avatar_url = avatarUrl
      // this.email = email
    },
  },
})
