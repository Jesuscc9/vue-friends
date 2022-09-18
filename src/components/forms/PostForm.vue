<template>
  <form class="flex flex-col gap-y-8" @submit.prevent="handleSubmit">
    <div>
      <label
        for="title"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Title post</label
      >
      <input
        type="text"
        id="title"
        name="title"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@flowbite.com"
        required
      />
    </div>
    <div>
      <label
        for="description"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Description</label
      >
      <input
        type="text"
        name="description"
        id="description"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>

    <div class="flex justify-center items-center w-full">
      <label
        for="dropzone-file"
        v-show="!imagePreviewSrc"
        class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col justify-center items-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            class="mb-3 w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-darkreader-inline-stroke=""
            style="--darkreader-inline-stroke: currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          name="picture"
          type="file"
          class="hidden"
          accept="image/png, image/jpeg, image/jpg"
          @change="handleInputFileChange"
          ref="inputFile"
        />
      </label>
      <div v-show="imagePreviewSrc" class="relative">
        <button
          type="button"
          class="absolute right-0 -top-2 w-6 h-6 border-red-500 border-2 bg-red-50 grid place-content-center rounded-full text-sm text-red-500"
          @click="handleRemoveImg"
        >
          x
        </button>

        <img :src="imagePreviewSrc" class="preview-image" alt="" />
      </div>
    </div>

    <v-button :isLoading="isLoading"> Submit </v-button>
  </form>
</template>

<script>
import { service } from '../../services/service'

const publicUrl =
  'https://tfpchdohtjoldkhwkial.supabase.co/storage/v1/object/public/posts/'

export default {
  methods: {
    handleSubmit: async function (e) {
      this.isLoading = true

      const data = Object.fromEntries(new FormData(e.target))

      const file = data.picture

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const res = await service.insertPostPicture({ filePath, file })

      const insertedFilePath = `${publicUrl}${res.data.Key.split('/').at(-1)}`

      data.picture = insertedFilePath

      await service.createPost(data)

      this.isLoading = false
      this.$emit('onSubmit')
    },
    handleInputFileChange: function (e) {
      const aux = e.target.files[0]

      this.imagePreviewSrc = URL.createObjectURL(aux)
    },
    handleRemoveImg: function () {
      const inputFile = this.$refs.inputFile

      console.log({ inputFile })
      inputFile.value = ''
      this.imagePreviewSrc = ''
    },
  },
  data: () => ({
    imagePreviewSrc: null,
    isLoading: false,
  }),
  emits: ['onSubmit'],
}
</script>

<style>
.preview-image {
  width: 404px;
  height: 256px;
  object-fit: contain;
}
</style>
