<template>
  <div class="w-screen h-screen grid place-content-center">
    <form class="border p-10 rounded-lg" @submit.prevent>
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Your email</label
        >
        <input
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@vue.com"
          v-model="email"
          required
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="handleLogin"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { supabase } from '../../services/supabase'

export default {
  methods: {
    handleLogin: async function () {
      try {
        await supabase.auth.signIn({ email: this.email.value })
      } catch (e) {}
    },
  },
  data: () => ({
    email: '',
  }),
}
</script>

<style>
form {
  width: 600px;
  max-width: 96%;
}
</style>
