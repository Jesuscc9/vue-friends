<template>
  <Transition>
    <div class="modal-component z-10" v-if="showModal">
      <div class="overlay" @click="handleOverlayClick"></div>
      <div class="modal rounded-lg p-10">
        <div class="flex w-full justify-end">
          <button
            ref="closeButton"
            class="rounded-xl grid place-content-center relative bottom-6 left-6 text-gray-500 hover:text-gray-700 transition-colors"
            @click="close"
          >
            <font-awesome-icon :icon="['fa', 'xmark']" class="w-5 h-5 m-2" />
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Modal',
  props: ['show'],
  methods: {
    close() {
      this.$emit('close')
    },
    handleOverlayClick() {
      this.$emit('close')
    },
    handleEscClic(e) {
      if (e.code.toLowerCase() === 'escape') {
        this.$emit('close')
      }
    },
  },
  emits: ['close'],
  mounted() {
    document.addEventListener('keydown', this.handleEscClic)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscClic)
  },
  watch: {
    show(newVal) {
      this.showModal = newVal
    },
  },
  data: () => ({
    showModal: false,
  }),
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
