<template>
  <div class="w-screen h-screen grid place-content-center">
    <div class="border p-10 container flex gap-10 flex-col">
      <h1 class="text-center">Hola este es el homepage</h1>
      <RouterLink
        to="/login"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Ir al login
        <font-awesome-icon icon="arrow-right" class="ml-2" />
      </RouterLink>

      <RouterLink
        to="/signup"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Ir al signup
        <font-awesome-icon icon="arrow-right" class="ml-2" />
      </RouterLink>
    </div>
  </div>
</template>

<style>
.container {
  width: 600px;
  max-width: 96%;
}
</style>
