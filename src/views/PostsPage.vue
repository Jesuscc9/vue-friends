<template>
  <Navbar></Navbar>

  <Transition class="z-10">
    <Modal v-if="isModalVisible" @close="closeModal">
      <PostForm @onSubmit="handleSubmit" :selected-post="selectedPost" />
    </Modal>
  </Transition>

  <div class="mx-20 mt-4 flex justify-end z-0">
    <v-button @click="showModal"> Nueva publicación + </v-button>
  </div>

  <div class="posts-container m-auto my-10 flex flex-col gap-10">
    <div
      class="gap-10 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      v-for="post in posts"
      v-bind:key="post.id"
    >
      <div class="flex flex-col gap-y-6">
        <div class="px-5 pt-5 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div class="border-2 border-blue-800 rounded-full p-0.5">
              <img
                :src="post.profiles.avatar_url"
                class="w-8 h-8 rounded-full object-cover"
                alt=""
              />
            </div>
            <p class="text-gray-800 text-sm font-bold">
              @{{ post.profiles.username }}
              <span class="text-gray-400 text-xs" v-if="isAllowedToEdit(post)"
                >(Tú)</span
              >
            </p>
          </div>
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
        <img class="image-container bg-gray-400" :src="post.picture" alt="" />
        <div class="px-5">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ post.title }}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ post.description }}
          </p>

          <div class="flex flex-col gap-2">
            <button
              @click="handleLikeClick(post)"
              :disabled="isLiking"
              class="border-2 border-black w-6 h-6 rounded-full transition-opacity"
              :class="{
                'opacity-50': isLiking,
                'bg-red-500': isPostLiked(post),
              }"
            ></button>
            <span class="font-bold text-sm"
              >{{ post.likes.length }} Me gusta</span
            >
          </div>
          <p class="uppercase mt-2 text-xs text-gray-400">
            {{ timeAgo(post.created_at) }}
          </p>
        </div>
        <div class="border-t border">
          <div class="p-4">
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your comment..."
              required
            />
          </div>
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
const user = supabase.auth.user()

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
    isLiking: false,
  }),
  methods: {
    handleSubmit: function () {
      this.getPosts()
      this.closeModal()
    },
    isPostLiked: function (post) {
      return post.likes.find((e) => e.created_by === user.id)
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
    handleLikeClick: async function (post) {
      this.isLiking = true

      if (this.isPostLiked(post)) {
        const userLikeId = post.likes.find((e) => e.created_by === user.id).id
        await service.dislikePost(userLikeId)
        await this.getPosts()
        this.isLiking = false
        return
      }

      await service.likePost(post.id)
      await this.getPosts()
      this.isLiking = false
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
  width: 470px;
  max-width: 96%;
}

.image-container {
  max-height: 600px;
  object-fit: contain;
  object-position: center center;
}
</style>
