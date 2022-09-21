<template>
  <div class="home-container m-auto mt-16">
    <div class="lg:flex-row flex-col flex gap-10 justify-between">
      <div class="w-full lg:w-1/3 flex items-center">
        <div class="flex flex-col gap-10">
          <h1 class="text-5xl text-gray-800 font-bold italic">VUE FRIENDS</h1>
          <p class="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sunt
            maiores rem voluptates numquam laborum?
          </p>
          <RouterLink
            to="/login"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 uppercase w-min whitespace-nowrap"
          >
            get started!
            <font-awesome-icon icon="arrow-right" class="ml-2" />
          </RouterLink>
        </div>
      </div>
      <div class="w-auto landing-img max-w-screen-md">
        <img src="../assets/landing_1.svg" alt="" />
      </div>
    </div>
  </div>
  <br />
</template>

<style>
.home-container {
  width: 1440px;
  max-width: 80%;
}

.landing-img {
  margin: auto;
}
</style>
