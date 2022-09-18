<template>
  <Navbar></Navbar>

  <Modal v-if="isModalVisible" @close="closeModal">
    <PostForm @onSubmit="handleSubmit" :selected-post="selectedPost" />
  </Modal>
  <div class="mx-20 mt-14 flex justify-end">
    <v-button @click="showModal"> Crear post + </v-button>
  </div>

  <div class="posts-container m-auto my-10 flex flex-col gap-10">
    <h1 class="font-semibold text-3xl mb-4 text-gray-700">Posts</h1>
    <div
      class="gap-10 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      v-for="post in posts"
      v-bind:key="post.id"
    >
      <div class="flex flex-col gap-y-6">
        <div class="px-5 pt-5 flex justify-between items-center">
          <p class="text-gray-800 text-sm">
            @{{ post.profiles.username }}
            <span class="font-bold text-xs" v-if="isAllowedToEdit(post)"
              >(You)</span
            >
          </p>
          <div v-if="isAllowedToEdit(post)">
            <button
              type="button"
              class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 mb-2 dark:focus:ring-yellow-900"
              @click="handleEdit(post)"
            >
              Editar
            </button>

            <button
              type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              @click="handleDelete(post)"
            >
              Eliminar
            </button>
          </div>
        </div>
        <img class="image-container" :src="post.picture" alt="" />
        <img :src="previewImageSrc" alt="" />
        <div class="px-5 pb-5">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ post.title }}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ post.description }}
          </p>
          <p class="uppercase italic text-xs text-gray-600 text-right">
            {{ timeAgo(post.created_at) }}
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
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'
import Navbar from '../components/UI/Navbar.vue'

TimeAgo.addDefaultLocale(es)

const timeAgoFn = new TimeAgo('en-US')

export default {
  name: 'PostsPage',
  components: {
    Modal,
    PostForm,
    Navbar,
  },
  data: () => ({
    posts: [],
    isModalVisible: false,
    selectedPost: null,
  }),
  methods: {
    handleSubmit: function () {
      this.getPosts()
      this.closeModal()
    },
    timeAgo: (date) => timeAgoFn.format(new Date(date)),
    handleDelete: async function (data) {
      const newPosts = this.posts.filter((e) => e.id !== data.id)
      this.posts = newPosts
      await service.deletePost(data.id)
    },
    handleEdit: async function (data) {
      this.selectedPost = data
      this.showModal()
    },
    getPosts: async function () {
      const { data } = await service.getPosts()
      this.posts = data
    },
    showModal: function () {
      this.isModalVisible = true
    },
    closeModal: function () {
      this.selectedPost = null
      this.isModalVisible = false
    },
    isAllowedToEdit(post) {
      return post.created_by === supabase.auth.user().id
    },
  },
  created() {
    this.getPosts()

    // Subscribe to realtime
    supabase
      .from('posts')
      .on('*', (payload) => {
        console.log({ payload })
        this.getPosts()
      })
      .subscribe()
  },
}
</script>

<style>
.posts-container {
  width: 540px;
  max-width: 96%;
}

.image-container {
  max-height: 600px;
  object-fit: contain;
  object-position: center center;
  background-color: gray;
}
</style>
