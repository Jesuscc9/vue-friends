<template>
  <form
    class="border p-10 rounded-lg flex flex-col gap-6"
    @submit.prevent="handleSubmit"
  >
    <div>
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >E-email</label
      >
      <input
        type="text"
        name="email"
        id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@vue.com"
        required
      />
    </div>

    <div>
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Password</label
      >
      <input
        type="password"
        id="password"
        name="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="******"
        required
      />
    </div>

    <div
      class="bg-red-50 border border-red-400 p-2 px-4 rounded-lg"
      v-if="hasError"
    >
      <p class="text-red-500 text-sm">{{ hasError }}</p>
    </div>

    <v-button :is-loading="isLoading">Continue</v-button>
  </form>
</template>

<script>
import { supabase } from '../../services/supabase'

export default {
  methods: {
    handleSubmit: async function (e) {
      const { email, password } = Object.fromEntries(new FormData(e.target))

      this.isLoading = true
      this.hasError = ''

      try {
        const { error } = await supabase.auth.signIn({ email, password })

        if (error?.message) {
          this.hasError = error.message
          return
        }

        window.location.reload()
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },
  },
  data: () => ({
    email: '',
    isLoading: false,
    hasError: '',
  }),
}
</script>

<style>
form {
  width: 600px;
  max-width: 96%;
}
</style>
