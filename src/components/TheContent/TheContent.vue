<template>
    <div class='content'>
        <div v-if='isLoading' class='global-loader-container'>
            <ui-loader />
        </div>
        <slot v-else />
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
    position: relative;
}

.global-loader-container {
    @include flex(center, center);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>