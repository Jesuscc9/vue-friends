<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="gap-10 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
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
        <div class="flex flex-col gap-2">
          <button
            @click="handleLikeClick(post)"
            :disabled="isLiking"
            class="transition-opacity text-left w-min relative"
          >
            <font-awesome-icon
              size="xl"
              icon="heart"
              class="custom-heart-button"
              :class="{
                liked: isPostLiked(post),
                'text-red-500': isPostLiked(post),
              }"
            ></font-awesome-icon>
          </button>
          <span class="font-bold text-sm"
            >{{ post.likes.length }} Me gusta</span
          >
        </div>
        <h5 class="mt-2 text-sm">
          <span class="font-semibold">{{ post.profiles.username }}</span>
          {{ post.description }}
        </h5>

        <button
          class="p-2 px-0 text-sm text-gray-400"
          @click="showComments = !showComments"
        >
          <p v-if="!showComments">
            Ver los {{ post.comments.length }} comentarios
          </p>
          <p v-else>Ocultar comentarios</p>
        </button>

        <div class="py-2 flex flex-col gap-5" v-if="showComments">
          <div
            class="border-b"
            v-bind:key="comment.id"
            v-for="comment in post.comments"
          >
            <p class="text-sm">
              <span class="font-bold"> {{ comment.profiles.username }}: </span>
              {{ comment.body }}
            </p>
            <p class="text-right text-xs text-gray-400 capitalize">
              {{ timeAgo(comment.created_at) }}
            </p>
          </div>
        </div>

        <p class="uppercase mt-2 text-xs text-gray-400">
          {{ timeAgo(post.created_at) }}
        </p>
      </div>
      <div class="border-t border">
        <form class="p-4 flex gap-2" @submit.prevent="commentPost(post)">
          <input
            type="text"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Comenta..."
            required
            v-model="comment"
          />
          <button
            class="bg-gray-50 border focus:ring-gray-300 focus:ring-4 text-gray-800 text-xs font-medium uppercase rounded-lg w-16 flex justify-center items-center"
          >
            <font-awesome-icon
              v-if="!isLoadingComment"
              icon="paper-plane"
              size="xl"
              class="text-blue-500"
            ></font-awesome-icon>
            <vue-loaders-ball-beat
              class="custom-loader-2"
              v-if="isLoadingComment"
              color="#3b82f6"
              scale="0.4"
            />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { service } from '@/services/service'
import { supabase } from '@/services/supabase'
import { timeAgo } from '@/helpers/utils'

const user = supabase.auth.user()

export default {
  props: ['post'],
  emits: ['update', 'onEditPost'],
  data: () => ({
    isLiking: false,
    comment: '',
    showComments: false,
    isLoadingComment: false,
  }),
  methods: {
    isAllowedToEdit(post) {
      return post.created_by === supabase.auth.user().id
    },
    isPostLiked: function (post) {
      return post.likes.find((e) => e.created_by === user.id)
    },
    handleDelete: async function () {
      const post = this.$props.post
      await service.deletePost(post.id)
      this.$emit('update')
    },
    handleEdit() {
      this.$emit('onEditPost', this.$props.post)
    },
    timeAgo,
    handleLikeClick: async function (post) {
      this.isLiking = true

      if (this.isPostLiked(post)) {
        const userLikeId = post.likes.find((e) => e.created_by === user.id).id
        await service.dislikePost(userLikeId)
        this.$emit('update')
        this.isLiking = false
        return
      }

      await service.likePost(post.id)
      this.$emit('update')
      this.isLiking = false
    },
    commentPost: async function (post) {
      const newComment = this.comment
      this.comment = ''

      this.isLoadingComment = true

      await service.commentPost(post.id, newComment)
      this.$emit('update')
      this.isLoadingComment = false
    },
  },
}
</script>

<style>
.custom-loader-2 {
  display: flex !important;
}

.custom-heart-button.liked {
  animation: liked 0.4s ease;
}

@keyframes liked {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
