<template>
    <div class='footer'>
        <div class='footer__sign'>STAR WARS CHARACTER Encyclopedia, 2019</div>
    </div>
</template>

<script>
    export default {
        name: 'TheFooter'
    }
</script>

<style lang="scss" scoped>
.footer {
    background: color(dark);
    @include flex(center, center, column);

    &__sign {
        text-transform: uppercase;
        color: color(alternative);
        text-align: center;
        font-weight: bold;
        padding: 1.8rem;
        letter-spacing: 0.15rem;
        line-height: 1.6;
    }
}
</style>