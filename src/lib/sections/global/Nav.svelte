<script lang="ts">
    import { page } from "$app/stores"
    import NavIndicator from "$lib/animations/NavIndicator";
    import { onMount } from "svelte"

    let indicator: HTMLSpanElement
    let nav: HTMLElement

    let navIndicator: NavIndicator

    onMount(() => {
        navIndicator = new NavIndicator(indicator, nav)
    })
</script>

<style lang="scss">
    nav {
        margin-inline-start: auto;
        display: flex;
        align-items: center;
        gap: 2rem;
        position: relative;

        a {
            color: $color-dark;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.25rem;
        }

        span {
            display: block;
            width: .5rem;
            height: .5rem;
            background: darken($color-light, 40);
            border-radius: 100rem;
            position: absolute;
            top: calc(100% + 0.5rem);
            left: 0;
        }
    }
</style>

<nav bind:this={nav}>
    <a href="/about" aria-current={$page.url.pathname == '/about' ? 'page' : null}>About</a>
    <a href="/gallery" aria-current={$page.url.pathname == '/gallery' ? 'page' : null}>Gallery</a>
    <a href="/blog" aria-current={$page.url.pathname == '/blog' ? 'page' : null}>Blog</a>
    <a href="/contact" aria-current={$page.url.pathname == '/contact' ? 'page' : null}>Contact</a>
    <span style="opacity:0" bind:this={indicator}/>
</nav>