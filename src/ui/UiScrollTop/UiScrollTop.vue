<template>
    <transition name='fadeIn'>
        <div v-show='showScrollTop' @click='scrollTop' class='scroll-top'>
            <i class='material-icons scroll-top__icon'>keyboard_arrow_up</i>
        </div>
    </transition>
</template>

<script>
    import debounce from '@/utils/helpers/debounce';

    export default {
        name: 'UiScrollTop',
        data() {
            return {
                minScrolledDistanceToAppear: 300,
                distanceToTop: document.documentElement.scrollTop || document.body.scrollTop
            }
        },
        computed: {
            showScrollTop() {
                return this.distanceToTop > this.minScrolledDistanceToAppear;
            }
        },
        created: function () {
            window.addEventListener('scroll', this.trackDistanceToTop)
        },
        beforeDestroy: function () {
            window.removeEventListener('scroll', this.trackDistanceToTop)
        },
        methods: {
            scrollTop() {
                scrollTop();
            },

            trackDistanceToTop: debounce(function () {
                this.distanceToTop = window.scrollY;
            }, 100)
        }
    }

    function scrollTop() {
        const distanceToTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (distanceToTop > 0) {
            window.requestAnimationFrame(scrollTop);
            let step = distanceToTop / 8;
            window.scrollTo(0, distanceToTop - step);
        }
    }
</script>

<style lang="scss" scoped>
    .scroll-top {
        color: color(alternative);
        position: fixed;
        right: 20px;
        bottom: 20px;
        background-color: color(default);
        border-radius: 50%;
        border: 3px solid color(dark);
        cursor: pointer;
        @extend %removeUserSelect;
        @extend %mediumTransition;

        &__icon {
            font-size: 2.2rem;
        }

        &:hover {
            color: color(primary);
            border-color: color(primary);
        }

        &:active {
            opacity: 0.5;
        }
    }
</style>