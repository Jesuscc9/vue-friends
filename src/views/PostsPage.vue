<template>
  <Modal v-show="isModalVisible" @close="closeModal">
    <PostForm @onSubmit="handleSubmit" />
  </Modal>
  <div class="mx-20 mt-14 flex justify-end">
    <button
      type="button"
      @click="showModal"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Add Post +
    </button>
  </div>

  <div class="container m-auto mt-10">
    <h1 class="font-semibold text-3xl mb-4 text-gray-700">Posts</h1>
    <div
      class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      v-for="post in posts"
      v-bind:key="post.id"
    >
      <div class="flex flex-col gap-y-6">
        <div class="px-5 pt-5 flex justify-between items-center">
          <p class="text-gray-800 text-sm">
            {{ post.profiles.email }}
            <span class="font-bold text-xs" v-if="isAllowedToEdit(post)"
              >(You)</span
            >
          </p>
          <button
            type="button"
            class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 mb-2 dark:focus:ring-yellow-900"
            v-if="isAllowedToEdit(post)"
          >
            Editar
          </button>
        </div>
        <img
          class=""
          :src="
            post.picture || 'https://flowbite.com/docs/images/blog/image-1.jpg'
          "
          alt=""
        />
        <div class="px-5 pb-5">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ post.title }}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ post.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '../components/UI/Modal.vue'
import PostForm from '../components/forms/PostForm.vue'
import { service } from '../services/service'
import { supabase } from '../services/supabase'

const publicUrl =
  'https://tfpchdohtjoldkhwkial.supabase.co/storage/v1/object/public/posts/'

export default {
  name: 'PostsPage',
  components: {
    Modal,
    PostForm,
  },
  data: () => ({
    posts: [],
    isModalVisible: false,
  }),
  methods: {
    handleSubmit: async function (data) {
      const file = data.picture
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const res = await service.insertPostPicture({ filePath, file })

      const insertedFilePath = `${publicUrl}${res.data.Key.split('/').at(-1)}`

      data.picture = insertedFilePath

      await service.createPost(data)

      this.closeModal()
      this.getPosts()
    },
    getPosts: async function () {
      const { data } = await service.getPosts()
      this.posts = data
    },
    showModal: function () {
      this.isModalVisible = true
    },
    closeModal: function () {
      this.isModalVisible = false
    },
    isAllowedToEdit(post) {
      return post.created_by === supabase.auth.user().id
    },
  },
  created() {
    this.getPosts()
  },
}
</script>

<style>
.container {
  width: 600px;
  max-width: 96%;
}
</style>
