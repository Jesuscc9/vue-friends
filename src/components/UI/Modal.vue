<template>
  <div class="modal-component z-10">
    <div class="overlay" @click="handleOverlayClick"></div>
    <div class="modal rounded-lg p-10">
      <div class="flex w-full justify-end">
        <button
          class="border w-7 h-7 rounded-xl grid place-content-center"
          @click="close"
        >
          <span class="font-bold">x</span>
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close')
    },
    handleOverlayClick() {
      this.$emit('close')
    },
  },
  emits: ['close'],
}
</script>

<style>
.modal-component {
  transition: all 0.2s;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 500px;
  background-color: white;
  max-width: 98%;
  z-index: 101;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
