<template>
    <div>
        <div @click='showDetails' class='person-card'>
            <div class='person-card__content'>
                <div class='person-card__data-item'>
                    <ui-entity-avatar size='large' shape='round' :entity-string='person.name' />
                </div>
                <div class='person-card__name person-card__data-item'>
                    {{ person.name }}
                </div>
                <div class='person-card__species person-card__data-item'>
                    <span v-if='isSpeciesEmpty'>----</span>
                    <span v-else-if='isSpeciesLoading'>
                        <ui-simple-loader />
                    </span>
                    <span v-else>
                        <span v-for='(speciesItem, index) in personSpecies' :key='speciesItem.id'>
                            {{ speciesItem.name }}
                            <span v-show="!isLastSpeciesItem(index, personSpecies)">|</span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
        <person-details-modal
            :person='person'
            :active='isPersonDetailsActive'
            @close='closeDetails'
        />
    </div>
</template>

<script>
    import UiEntityAvatar from '@/ui/UiEntityAvatar/UiEntityAvatar';
    import UiSimpleLoader from '@/ui/UiSimpleLoader/UiSimpleLoader';
    import PersonDetailsModal from '@/components/PersonDetailsModal/PersonDetailsModal';

    export default {
        name: 'PersonCard',
        components: {UiEntityAvatar, UiSimpleLoader, PersonDetailsModal},
        props: {
            person: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                isPersonDetailsActive: false
            }
        },
        computed: {
            isSpeciesLoading() {
                var personSpeciesTotalNumber = this.person.speciesIds.length;
                var personSpeciesLoadedNumber = this.personSpecies.length;
                return personSpeciesTotalNumber != personSpeciesLoadedNumber;
            },

            isSpeciesEmpty() {
                return !this.person.speciesIds.length;
            },

            personSpecies() {
                return this.$store.getters['species/getSpeciesByPersonId'](this.person.id);
            }
        },
        methods: {
            isLastSpeciesItem(index, speciesArray) {
                return index == (speciesArray.length - 1);
            },

            showDetails() {
                this.isPersonDetailsActive = true;
            },

            closeDetails() {
                this.isPersonDetailsActive = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
$card-vertical-padding: 92px;
$card-horizontal-padding: 15px;
$card-vertical-padding-responsive: 33px;

.person-card {
    background: color(dark);
    border-radius: 8px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
    @include flex(center, center);
    padding: $card-vertical-padding $card-horizontal-padding;
    cursor: pointer;
    @extend %mediumTransition;
    text-align: center;

    &:hover {
        box-shadow: 0px 10px 40px rgba(37, 136, 167, 0.38);
    }

    &__content {
        @include flex(center, center, column)
    }

    &__name {
        font-weight: bold;
        color: color(alternative);
        text-transform: capitalize;
    }

    &__data-item {
        margin: 6px 0;
    }
}

@media screen and (max-width: 1024px) {
    .person-card {
        padding: $card-vertical-padding-responsive $card-horizontal-padding;
    }
}    
</style>