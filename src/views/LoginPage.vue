<template>
  <div class="w-screen h-screen grid place-content-center">
    <div>
      <div class="flex justify-end mb-10">
        <RouterLink
          to="/signup"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-min whitespace-nowrap self-end"
        >
          Crear cuenta
          <font-awesome-icon icon="arrow-right" class="ml-2" />
        </RouterLink>
      </div>
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue'

export default {
  components: { LoginForm },
}
</script>
