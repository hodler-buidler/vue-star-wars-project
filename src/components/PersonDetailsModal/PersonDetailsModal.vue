<template>
    <ui-modal-window :active='active' @close-modal='close'>
        <div class='person-details'>
            <div class='person-details__header'>
                <div class='person-details__avatar'>
                    <ui-entity-avatar size='large' shape='round' :entity-string='person.name' />
                </div>
                <div class='person-details__name'>
                    {{ person.name }}
                </div>
            </div>

            <div class='person-details__separator'></div>

            <person-details-modal-specifics :person='person' />
        </div>
    </ui-modal-window>
</template>

<script>
    import UiModalWindow from '@/ui/UiModalWindow/UiModalWindow';
    import UiEntityAvatar from '@/ui/UiEntityAvatar/UiEntityAvatar';
    import PersonDetailsModalSpecifics from '@/components/PersonDetailsModal/PersonDetailsModalSpecifics';

    export default {
        name: 'PersonDetailsModal',
        components: {UiModalWindow, UiEntityAvatar, PersonDetailsModalSpecifics},
        props: {
            person: {
                type: Object,
                required:  true
            },

            active: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                isFirstTimeActive: true
            }
        },
        watch: {
            active(newValue) {
                if (newValue && this.isFirstTimeActive) {
                    this.loadPersonData();
                    console.log('load person data');
                    this.isFirstTimeActive = false;
                }
            }
        },
        methods: {
            loadPersonData() {
                this.$store.dispatch('species/loadByIds', this.person.speciesIds);
                this.$store.dispatch('films/loadByIds', this.person.filmsIds);
                this.$store.dispatch('planets/loadByIds', [this.person.homeworldId]);
            },

            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss" scoped>
.person-details {
    @include flex(space-between, normal, column);
    height: 100%;

    &__header {
        @include flex(normal, center)
    }

    &__avatar {
        margin-right: 1rem;
    }

    &__name {
        color: color(alternative);
        font-weight: bold;
        font-size: 1.33rem;
    }

    &__separator {
        min-height: 2px;
        background-color: color(secondary);
        margin: 20px 0;
    }
}

@media screen and (max-width: 767px) {
    .person-details {
        justify-content: normal;

        &__separator {
            margin: 30px 0;
        }
    }
}
</style>