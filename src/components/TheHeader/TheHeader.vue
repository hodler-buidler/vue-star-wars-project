<template>
    <div class='header'>
        <div class='header__container header_decoration_darkness'>
            <div class='brand-logo header__content'>
                <div>
                    <img class='brand-logo__img-piece' src='~assets/img/star-piece.png' alt='StarWars' />
                </div>
                <div class='brand-logo__sign'>CHARACTER Encyclopedia</div>
                <div>
                    <img class='brand-logo__img-piece' src='~assets/img/wars-piece.png' alt='StarWars' />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TheHeader',
    }
</script>

<style lang="scss" scoped>
.header {
    @include setBgImg('img/header-bg.png', center center no-repeat);
    background-size: cover;
    height: 46vh;

    &_decoration_darkness {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
    }

    &__container {
        @include flex(center, center);
    }
}

.brand-logo {
    width: 33vw; // making header block 1/3 of screen
    @extend %removeUserSelect;
    @include flex(center, center, column);

    &__sign {
        color: color(alternative);
        text-transform: uppercase;
        font-size: 1.8vw;
        font-weight: bold;
        line-height: 2;
        letter-spacing: 0.5vw;
        white-space: nowrap;
    }

    &__img-piece {
        width: 100%;
    }
}
</style>