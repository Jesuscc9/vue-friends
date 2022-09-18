<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button
    type="submit"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative z-0"
  >
    <div class="loader" :class="{ showLoader: isLoading }">
      <vue-loaders-ball-beat color="white" scale="0.4" />
    </div>
    <div :class="{ hideContent: isLoading }">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    isLoading: Boolean,
  },
}
</script>

<style>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  transition: opacity 0.3s;

  transform: translate(-50%, -50%);
}

.showLoader {
  opacity: 1 !important;
}

.hideContent {
  opacity: 0;
  transition: opacity 0.3s;
}
</style>
