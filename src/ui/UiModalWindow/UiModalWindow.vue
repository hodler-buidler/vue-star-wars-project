<template>
    <transition name='zoom'>
        <div v-if='active' class='modal-window-background' @click.self='closeModal'>
            <div class='modal-window'>
                <div @click='closeModal' class='close-window'>
                    <i class='material-icons'>close</i>
                </div>
                <slot />
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'UiModalWindow',
        props: {
            active: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            closeModal() {
                this.$emit('close-modal');
            }
        }
    }
</script>

<style lang="scss" scoped>
.modal-window-background {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100vh;
    cursor: pointer;
    @include flex(center, center);
}

@supports ((-webkit-backdrop-filter: blur(30px)) or (backdrop-filter: blur(30px))) {
  .modal-window-background  {
    background: rgba(0, 0, 0, 0.01);
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
  }
}

@supports not ((-webkit-backdrop-filter: blur(30px)) or (backdrop-filter: blur(30px))) {
    .modal-window-background {
        background: rgba(0, 0, 0, 0.6);
    }
}

.modal-window {
    background-color: color(dark);
    width: 800px;
    height: 492px;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 80px;
    overflow: auto;
    position: relative;
    cursor: default;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
}

.close-window {
    font-size: 12px;
    color: color(alternative);
    position: absolute;
    top: 22px;
    right: 22px;
    cursor: pointer;
    @extend %fastTransition;
    @extend %removeUserSelect;

    &:hover {
        color: color(danger);
    }

    &:active {
        opacity: 0.7;
    }
}
</style>