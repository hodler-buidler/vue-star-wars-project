<template>
    <div class='content'>
        <transition name='fade'>
            <div v-if='isLoading' class='global-loader-container'>
                <ui-loader />
            </div>
        </transition>
        <slot v-if='!isLoading' />
    </div>
</template>

<script>
    import UiLoader from '@/ui/UiLoader/UiLoader';

    export default {
        name: 'TheContent',
        components: {UiLoader},
        props: {
            isLoading: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
.content {
    min-height: 54vh;
    padding: 0 17vw; // making content block 2/3 of screen 100% - 34% === 66%
    position: relative;
}

.global-loader-container {
    @include flex(center, center);
    position: absolute;
    background: color(default);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>