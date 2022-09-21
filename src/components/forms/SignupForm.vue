<template>
  <form
    class="m-auto border p-10 rounded-lg flex flex-col gap-6 bg-white custom-shadow"
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
        type="email"
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

    <div>
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Profile photo</label
      >

      <div v-if="previewAvatar" class="my-4">
        <img
          :src="previewAvatar"
          alt=""
          class="w-32 h-32 rounded-full bg-gray-600 object-cover object-center"
        />
      </div>

      <div class="flex items-center w-full">
        <label
          for="dropzone-file"
          class="flex px-3 py-2 items-center gap-3 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <p class="text-gray-500 text-sm font-semibold">Subir archivo</p>
          <div class="flex justify-center items-center">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>

            <p class="text-xs text-gray-500 dark:text-gray-400"></p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            name="avatar"
            class="hidden"
            ref="inputFileRef"
            @input="handleInputFileChange"
            accept="image/png, image/jpeg, image/jpg"
            required
          />
        </label>
      </div>
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
import { service } from '../../services/service'
import { supabase } from '../../services/supabase'

const publicUrl =
  'https://tfpchdohtjoldkhwkial.supabase.co/storage/v1/object/public/avatars/'

export default {
  methods: {
    handleSubmit: async function (e) {
      const data = Object.fromEntries(new FormData(e.target))

      this.isLoading = true
      this.hasError = ''

      const {
        data: { Key: insertedAvatarPath },
      } = await service.uploadUserAvatar(data.avatar)

      const insertedFileUrl = `${publicUrl}${insertedAvatarPath
        .split('/')
        .at(-1)}`

      try {
        const { error } = await supabase.auth.signUp(
          {
            email: data.email,
            password: data.password,
          },
          {
            data: {
              username: data.username,
              avatar_url: insertedFileUrl,
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
    handleInputFileChange: function (e) {
      const file = e.target.files[0]
      this.previewAvatar = URL.createObjectURL(file)
    },
  },
  data: () => ({
    isLoading: false,
    showEmailMessage: false,
    email: '',
    hasError: '',
    previewAvatar: null,
  }),
}
</script>

<style scoped>
form {
  width: 600px;
  max-width: 96%;
}
</style>
