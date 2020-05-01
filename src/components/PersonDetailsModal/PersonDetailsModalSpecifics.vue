<template>
    <div class='details-specifics'>
        <div class='detail-item'>
            <div class='detail-item__title'>
                <span class='detail-item__title-img'>
                    <img src='~assets/img/calendar.svg' alt='Birth year' />
                </span>
                <span>Birth year</span>
            </div>
            <div class='detail-item__content'>
                {{ person.birth_year }}
            </div>
        </div>

        <div class='detail-item'>
            <div class='detail-item__title'>
                <span class='detail-item__title-img'>
                    <img src='~assets/img/allien.svg' alt='Birth year' />
                </span>
                <span>Species</span>
            </div>
            <div class='detail-item__content'>
                <ui-simple-loader v-if='isSpeciesLoading' />
                <div v-else-if='isSpeciesEmpty'>---</div>
                <div v-else class='simple-list'>
                    <div
                        v-for='speciesItem in species'
                        class='simple-list__item'
                        :key='speciesItem.id'
                    >
                        {{ speciesItem.name }}
                    </div>
                </div>
            </div>
        </div>

        <div class='detail-item'>
            <div class='detail-item__title'>
                <span class='detail-item__title-img'>
                    <img src='~assets/img/gender.svg' alt='Birth year' />
                </span>
                <span>Gender</span>
            </div>
            <div class='detail-item__content'>
                {{ person.gender }}
            </div>
        </div>

        <div class='detail-item'>
            <div class='detail-item__title'>
                <span class='detail-item__title-img'>
                    <img src='~assets/img/homeworld.svg' alt='Birth year' />
                </span>
                <span>Homeworld</span>
            </div>
            <div class='detail-item__content'>
                <ui-simple-loader v-if='isHomeworldLoading' />
                <div v-else>{{ homeworld.name }}</div>
            </div>
        </div>

        <div class='detail-item'>
            <div class='detail-item__title'>
                <span class='detail-item__title-img'>
                    <img src='~assets/img/movie.svg' alt='Birth year' />
                </span>
                <span>Films</span>
            </div>
            <div class='detail-item__content'>
                <ui-simple-loader v-if='isFilmsLoading' />
                <div v-else class='simple-list'>
                    <div
                        v-for='film in films'
                        class='simple-list__item'
                        :key='film.id'
                    >
                        {{ film.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UiSimpleLoader from '@/ui/UiSimpleLoader/UiSimpleLoader';

    export default {
        name: 'PersonDetailsModalSpecifics',
        components: {UiSimpleLoader},
        props: {
            person: {
                type: Object,
                required: true
            },
        },
        computed: {
            homeworld() {
                return this.$store.getters['planets/getPlanetByPersonId'](this.person.id);
            },

            species() {
                return this.$store.getters['species/getSpeciesByPersonId'](this.person.id);
            },

            films() {
                return this.$store.getters['films/getFilmsByPersonId'](this.person.id);
            },

            isHomeworldLoading() {
                return !this.homeworld;
            },

            isSpeciesLoading() {
                var personSpeciesTotalNumber = this.person.speciesIds.length;
                var personSpeciesLoadedNumber = this.species.length;
                return personSpeciesTotalNumber != personSpeciesLoadedNumber;
            },

            isSpeciesEmpty() {
                return !this.person.speciesIds.length;
            },

            isFilmsLoading() {
                var personFilmsTotalNumber = this.person.filmsIds.length;
                var personFilmsLoadedNumber = this.films.length;
                return personFilmsTotalNumber != personFilmsLoadedNumber;
            }
        }
    }
</script>

<style lang="scss" scoped>
.details-specifics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px 0;
}

.detail-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: start;
    align-items: center;

    &__title {
        @include flex(center, center);
        margin-right: 24px;
    }

    &__title-img {
        margin-right: 11px;
        @extend %removeUserSelect;
    }

    &__content {
        color: color(alternative);
        text-transform: capitalize;
        font-weight: bold;
    }
}

@media screen and (max-width: 767px) {
    .details-specifics {
        grid-template-columns: 1fr;
    }

    .detail-item {
        grid-template-columns: 150px auto;
    }
}
</style>