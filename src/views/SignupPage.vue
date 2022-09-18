<template>
  <div class="w-screen h-screen grid place-content-center gap-10">
    <div class="w-full flex justify-end">
      <RouterLink
        to="/Login"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-min whitespace-nowrap self-end"
      >
        Iniciar sesion
        <font-awesome-icon icon="arrow-right" class="ml-2" />
      </RouterLink>
    </div>
    <SignupForm />
  </div>
</template>

<script>
import SignupForm from '@/components/forms/SignupForm.vue'

export default {
  components: { SignupForm },
}
</script>
