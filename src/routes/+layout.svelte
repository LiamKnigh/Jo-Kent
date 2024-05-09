<script lang="ts">
    import logo from "$lib/images/logo.png";
    import { page } from "$app/stores";
    import { fly } from 'svelte/transition';
    import { bounceOut, expoIn, backInOut } from "svelte/easing";
    import { tweened, type Tweened } from 'svelte/motion';


    const indicatorLeft: Tweened<number> = tweened(0, {
		duration: 500,
		easing: backInOut
	});
    let indicatorVisible: boolean = false;
    let indicator: HTMLElement;

    function showIndicator() {
        indicatorVisible = true;
    }

    function moveIndicator(e: MouseEvent|FocusEvent) {
        const target = e.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'a' && target.parentElement) {
            const targetBounding = target.getBoundingClientRect()
            const parentBounding = target.parentElement.getBoundingClientRect()
            const indicatorBounding = indicator.getBoundingClientRect()

            $indicatorLeft = targetBounding.left - parentBounding.left + (targetBounding.width / 2) - (indicatorBounding.width / 2)
        }
    }

    function hideIndicator() {
        indicatorVisible = false;
    }
</script>

<style lang="scss">

    :global(body) {background: $color-dark;}


    header {
        background-color: $color-light;
        box-shadow: $shadow;
        border-radius: 0 0 2rem 2rem;
        position: sticky;
    }
    header > div {
        padding-block: 1rem;
        display: flex;
        align-items: center;
        @include container(xl)
    }
    img {
        height: 5rem;
    }
    nav {
        margin-inline-start: auto;
        display: flex;
        align-items: center;
        gap: 2rem;
        position: relative;
    }
    nav a {
        color: $color-dark;
        text-decoration: none;
        font-weight: 600;
        font-size: 1.25rem;
    }
    nav span {
        display: block;
        width: .5rem;
        height: .5rem;
        background: $color-dark;
        border-radius: 100rem;
        position: absolute;
        top: calc(100% + 0.5rem);
        left: 0;
    }
</style>

<template>
    <header>
        <div>
            <a href="/" aria-current={$page.url.pathname == '/' ? 'page' : null}>
                <img src={logo} alt="Jo Kent Logo">
            </a>
            <nav
                on:mouseenter={showIndicator} on:focusin={showIndicator}
                on:mouseover={moveIndicator} on:focusin={moveIndicator}
                on:mouseleave={hideIndicator} on:focusout={hideIndicator}
                on:focus={null}
            >
                <a href="/about" aria-current={$page.url.pathname == '/about' ? 'page' : null}>About</a>
                <a href="/gallery" aria-current={$page.url.pathname == '/gallery' ? 'page' : null}>Gallery</a>
                <a href="/blog" aria-current={$page.url.pathname == '/blog' ? 'page' : null}>Blog</a>
                <a href="/contact" aria-current={$page.url.pathname == '/contact' ? 'page' : null}>Contact</a>
                {#if indicatorVisible}
                    <span style="margin-inline-start: {$indicatorLeft}px" bind:this={indicator} in:fly={{duration: 500, easing: bounceOut, y: 20}} out:fly={{delay: 150, duration: 500, easing: expoIn, y: 20}}/>
                {/if}
            </nav>
        </div>
    </header>
</template>