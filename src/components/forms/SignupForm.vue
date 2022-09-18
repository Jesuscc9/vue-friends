<template>
  <form
    class="border p-10 rounded-lg flex flex-col gap-6"
    @submit.prevent="handleSubmit"
    @input="hasError = ''"
    v-if="!showEmailMessage"
  >
    <div>
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >E-mail</label
      >
      <input
        type="text"
        id="email"
        v-model="email"
        name="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@vue.com"
        required
      />
    </div>

    <div>
      <label
        for="username"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Username</label
      >
      <input
        type="username"
        id="username"
        name="username"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="@jesuscc989"
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
        placeholder="*****"
        required
      />
    </div>

    <div
      class="bg-red-50 border border-red-400 p-2 px-4 rounded-lg"
      v-if="hasError"
    >
      <p class="text-red-500 text-sm">{{ hasError }}</p>
    </div>

    <v-button :is-loading="isLoading">Continuar</v-button>
  </form>

  <div
    v-else
    class="border p-10 px-20 rounded-lg text-center flex flex-col gap-4 items-center"
  >
    <h1 class="text-xl font-bold text-gray-800">Registrado Exitosamente!</h1>
    <img src="../../assets/sent-email.png" alt="" class="w-48" />
    <p class="text-gray-500 w-80">
      Revisa tu bandeja de entrada de
      <span class="font-bold text-gray-600">{{ email }}</span> y entra al link
      para confirmar tu correo
    </p>
  </div>
</template>

<script>
import { supabase } from '../../services/supabase'

export default {
  methods: {
    handleSubmit: async function (e) {
      const { email, password, username } = Object.fromEntries(
        new FormData(e.target)
      )

      this.isLoading = true
      this.hasError = ''

      try {
        const { error } = await supabase.auth.signUp(
          {
            email,
            password,
          },
          {
            data: {
              username,
            },
          }
        )

        if (error) {
          this.hasError = error.message
          return
        }

        this.showEmailMessage = true
      } catch (e) {
        this.hasError = JSON.stringify(e)
      } finally {
        this.isLoading = false
      }
    },
  },
  data: () => ({
    isLoading: false,
    showEmailMessage: false,
    email: '',
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
