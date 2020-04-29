<template>
    <div class="avatar" :class='avatarClassNames' :style='{background: avatarBgColor}'>
        <span>{{ avatarLetter }}</span>
    </div>
</template>

<script>
    import randomColor from 'randomcolor';

    export default {
        name: 'UiEntityAvatar',
        props: {
            entityString: {
                type: String,
                required: true
            },

            size: {
                type: String,
                default: 'medium'
            },

            shape: {
                type: String,
                default: 'square'
            }
        },
        data() {
            return {
                avatarBgColor: randomColor({ luminosity: 'dark' })
            }
        },
        computed: {
            avatarLetter() {
                return this.entityString[0].toUpperCase();
            },

            avatarClassNames() {
                var classNames = [];
                classNames.push(this.sizeClassName);
                classNames.push(this.shapeClassName);
                return classNames;
            },

            sizeClassName() {
                return `avatar_size_${this.size}`;
            },

            shapeClassName() {
                return `avatar_shape_${this.shape}`;
            }
        }
    }
</script>

<style lang="scss" scoped>
.avatar {
    color: #fff;
    @include flex(center, center);
    @extend %removeUserSelect;

    &_shape {
        &_round {
            border-radius: 50%;
        }
    }

    &_size {
        &_small {
            width: 32px;
            height: 32px;
            font-size: 1rem;
        }

        &_medium {
            width: 64px;
            height: 64px;
            font-size: 2rem;
        }

        &_large {
            width: 80px;
            height: 80px;
            font-size: 3rem;
        }

        &_extra-large {
            width: 128px;
            height: 128px;
            font-size: 4rem;
        }
    }
}
</style>