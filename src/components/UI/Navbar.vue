<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <nav
    class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full shadow fixed z-10 top-0"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="" class="flex items-center">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >Vue Friends</span
        >
      </a>

      <div v-if="isLoggedIn" class="flex items-center md:order-2">
        <button
          class="flex items-center gap-2ounded-lg p-1 px-3 gap-3"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
          @click="triggerDropdown"
        >
          <p class="text-sm">@{{ user?.user_metadata?.username }}</p>
          <div class="flex mr-3 text-sm rounded-full md:mr-0">
            <span class="sr-only">Open user menu</span>
            <div class="border-2 border-blue-500 rounded-full">
              <img
                class="w-10 h-10 rounded-full object-cover"
                :src="user?.user_metadata?.avatar_url"
                alt="user photo"
              />
            </div>
          </div>
        </button>
        <div
          class="absolute top-12 right-4 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-md border dark:bg-gray-700 dark:divide-gray-600"
          id="user-dropdown"
          v-if="showDropdown"
        >
          <div class="py-3 px-4">
            <span class="block text-sm text-gray-900 dark:text-white">{{
              user?.user_metadata.username
            }}</span>
            <span
              class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400"
              >{{ user?.email }}</span
            >
          </div>
          <ul class="py-1" aria-labelledby="user-menu-button">
            <li>
              <a
                href="#"
                @click="handleLogout"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Sign out</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="flex items-center md:order-2 gap-3" v-else>
        <RouterLink to="/login">
          <Button class="rounded-full font-semibold"> Log In </Button>
        </RouterLink>

        <RouterLink to="/signup">
          <button
            type="submit"
            class="border rounded-full bg-white text-gray-700 font-semibold focus:ring-4 focus:outline-none focus:ring-gray-300 text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative z-0 disabled:opacity-80"
            :disabled="isLoading"
          >
            Signup
          </button>
        </RouterLink>
      </div>

      <div
        class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
        id="mobile-menu-2"
      >
        <ul
          class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-white font-semibold bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              aria-current="page"
              >Posts</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="nav-spacing"></div>
</template>

<script>
import { supabase } from '../../services/supabase'
import Button from './Button.vue'

export default {
  methods: {
    triggerDropdown() {
      this.showDropdown = !this.showDropdown
    },
    handleLogout() {
      supabase.auth.signOut()
      window.location.reload()
    },
  },
  data: () => ({
    showDropdown: false,
    user: supabase.auth.user(),
  }),
  computed: {
    isLoggedIn: () => Boolean(supabase.auth.user()),
  },
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Button },
}
</script>

<style>
.nav-spacing {
  height: 72px;
}
</style>
