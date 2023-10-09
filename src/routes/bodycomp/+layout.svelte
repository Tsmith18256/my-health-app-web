<script lang="ts">
  import IconButton from '$lib/components/shared/buttons/icon-button/icon-button.svelte';
  import { ICON_IMAGE, ICON_SIZE } from '$lib/components/shared/icon/icon.constants';
  import { isDesktopWidth } from '$lib/utils/shared/breakpoints/breakpoint.util';

  let innerWidth: number;
  $: isDesktop = isDesktopWidth(innerWidth);
</script>

{#if isDesktop}
  <nav class="top-nav">
    <IconButton icon={ICON_IMAGE.cog} size={ICON_SIZE.large} title="Settings" tabindex={1} />
  </nav>
{/if}

<main class:with-top-nav={isDesktop}>
  <slot />
</main>

{#if !isDesktop}
  <nav class="bottom-nav" />
{/if}

<svelte:window bind:innerWidth />

<style lang="scss">
  @use '$lib/styles/variables/colors';

  $top-nav-height: 4rem;

  .bottom-nav {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;

    height: 5rem;

    background-color: red;
  }

  .top-nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    position: fixed;
    top: 0;
    right: 0;
    left: 0;

    height: $top-nav-height;
    padding: 0 2rem;

    border-bottom: 2px solid colors.$border;
  }

  .with-top-nav {
    padding-top: $top-nav-height;
  }
</style>
