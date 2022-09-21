<template>
  <Navbar />

  <Modal :show="isModalVisible" @close="closeModal">
    <PostForm @onSubmit="handleSubmit" :selected-post="selectedPost" />
  </Modal>

  <div
    class="mx-4 sm_mx-10 whitespace-nowrap md_mx-20 mt-10 flex justify-center z-0"
  >
    <v-button @click="showModal"> Nueva publicación + </v-button>
  </div>

  <div class="posts-container m-auto my-10 flex flex-col gap-10">
    <div v-if="posts.length === 0">
      <h1 class="text-center my-10 font-semibold">
        Aún no hay ningún post, comienza a compartir momentos
      </h1>
      <img src="../assets/empty_state.svg" alt="" />
    </div>
    <div v-else v-for="post in posts" v-bind:key="post.id">
      <Post :post="post" @update="this.getPosts()" @on-edit-post="handleEdit" />
    </div>
  </div>
</template>

<script>
import Modal from '@/components/UI/Modal.vue'
import PostForm from '@/components/forms/PostForm.vue'
import Post from '@/components/UI/Post.vue'
import { service } from '@/services/service'
import { supabase } from '@/services/supabase'

import Navbar from '@/components/UI/Navbar.vue'

export default {
  name: 'PostsPage',
  components: {
    Modal,
    PostForm,
    Navbar,
    Post,
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
  },
  created() {
    this.getPosts()

    // Subscribe to realtime
    supabase
      .from('posts')
      .on('*', (payload) => {
        this.getPosts()
      })
      .subscribe()
  },
}
</script>

<style scoped>
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
