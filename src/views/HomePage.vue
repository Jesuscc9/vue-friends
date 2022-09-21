<template>
  <div class="home-container">
    <div class="flex">
      <div class="w-1/2 flex items-center">
        <div class="flex flex-col gap-2 justify-center w-full items-center">
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
      <div class="w-1/2">
        <img src="../assets/landing_1.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style>
.home-container {
  width: 1440px;
  max-width: 96%;
  margin: 0 auto;
  margin-top: 4rem;
}
</style>
