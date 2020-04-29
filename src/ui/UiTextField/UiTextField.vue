<template>
    <div class='field_wrap'>
        <div class='field'>
            <input 
                v-model='fieldValue'
                class='text-field field__input'
                :class='inputClassNames'
                :id='inputId'
                v-bind='$attrs'
            />
            <label class='field__label' :for='inputId'>
                <span>{{ label }}</span>
            </label>
            <div v-show='icon' class='field__icon'>
                <i class='material-icons icon'>{{ icon }}</i>
            </div>
        </div>
    </div>
</template>

<script>
    import randIdMixin from '@/utils/mixins/randId';

    export default {
        name: 'UiTextField',
        mixins: [randIdMixin],
        props: {
            value: {
                type: String,
                default: ''
            },

            label: {
                type: String,
                default: ''
            },

            icon: {
                type: String,
                default: ''
            },

            theme: {
                type: String,
                default: 'default'
            }
        },
        data() {
            return {
                fieldValue: this.value,
                inputId: this.randId()
            }
        },
        computed: {
            inputClassNames() {
                var classNames = [];
                if (this.fieldValue) classNames.push('field_has-value');
                if (this.icon) classNames.push('field_has-icon');
                classNames.push(`text-field_theme_${this.theme}`);
                return classNames;
            },


        },
        watch: {
            fieldValue(newValue) {
                this.$emit('input', newValue);
            }
        }
    }
</script>

<style lang="scss" scoped>
$input-font-size: 1rem;
$label-transform-distance: 0.9rem;
$label-font-size: 0.7rem;
$field-hight: $input-font-size + $label-transform-distance + $label-font-size;
$icon-font-size: 1.4rem;

.field {
    position: relative;
    width: 100%;

    &_wrap {
        min-height: $field-hight;
        @include flex(stretch, flex-end)
    }

    &__label {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        cursor: text;
        @extend %fastTransition
    }

    &__input:focus~&__label, .field_has-value~&__label {
        top: -$label-transform-distance;
        font-size: $label-font-size;
    }

    &_has-icon {
        padding-right: 2rem;
    }

    &__icon {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 1rem
    }
}

.icon {
    font-size: $icon-font-size;
    line-height: 0.8;
}

.text-field {
    width: 100%;
    outline: none;
    background: transparent;
    font-size: $input-font-size;
    border: none;
    padding: 0.1rem auto;
    box-sizing: border-box;
    transition: 0.3s all;
    border-bottom: 1px solid transparent;

    &_theme {
        &_default {
            color: color(secondary);
            border-color: color(secondary);

            &:focus {
                color: color(alternative);
                border-color: transparent;
            }
        }
    }
    
}
</style>