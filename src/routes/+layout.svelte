<style lang="scss">
    header {
        box-shadow: $shadow;
        border-radius: 0 0 2rem 2rem;
        position: sticky;
    }
    header > div {
        padding-block: 2rem;
        @include container(xl)
    }
    h1 {
        font-size: 2rem;
    }
</style>

<template lang="pug">
    header
        div(class='container')
            h1 Hello World!
</template>