<script lang="ts">
    import { page } from "$app/stores"
    import Logo from "$lib/components/Logo.svelte";
    import Nav from "$lib/sections/global/Nav.svelte";
</script>

<style lang="scss">

    :global(body) {background: $color-dark} //temp


    header {
        background-color: $color-light;
        box-shadow: $shadow;
        border-radius: 0 0 2rem 2rem;
        position: sticky;

        > div {
            padding-block: 1rem;
            display: flex;
            align-items: center;
            @include container(xl);
        }
    }
</style>

<template>
    <header>
        <div>
            <a href="/" aria-current={$page.url.pathname == '/' ? 'page' : null}>
                <Logo />
            </a>
            <Nav />
        </div>
    </header>
    <main>

        <slot/>
    </main>
    <footer>

    </footer>
</template>