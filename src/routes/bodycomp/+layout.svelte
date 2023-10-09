<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import IconButton from '$lib/components/shared/buttons/icon-button/icon-button.svelte';
  import { ICON_IMAGE, ICON_SIZE } from '$lib/components/shared/icon/icon.constants';
  import Icon from '$lib/components/shared/icon/icon.svelte';
  import { isDesktopWidth } from '$lib/utils/shared/breakpoints/breakpoint.util';

  let innerWidth: number;
  $: isDesktop = isDesktopWidth(innerWidth);

  $: path = $page.url.pathname.split('/').pop();

  const onKeyUp = (e: KeyboardEvent, path: string) => {
    if (e.key === 'Enter') {
      goto(`/bodycomp/${path}`);
    }
  };

  const goToLog = () => {
    goto('/bodycomp/log');
  };

  const goToOverview = () => {
    goto('/bodycomp/overview');
  };

  const goToSettings = () => {
    goto('/bodycomp/settings');
  };
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
  <nav class="bottom-nav">
    <div
      class="bottom-nav-tab"
      class:bottom-nav-tab-selected={path === 'log'}
      on:click={goToLog}
      role="tab"
      tabindex={0}
      on:keyup={e => onKeyUp(e, 'log')}
    >
      <Icon icon={ICON_IMAGE.log} size={ICON_SIZE.large} />
      <span>Log</span>
    </div>

    <div
      class="bottom-nav-tab"
      class:bottom-nav-tab-selected={path === 'overview'}
      on:click={goToOverview}
      role="tab"
      tabindex={0}
      on:keyup={e => onKeyUp(e, 'overview')}
    >
      <Icon icon={ICON_IMAGE.chartLine} size={ICON_SIZE.large} />
      <span>Overview</span>
    </div>

    <div
      class="bottom-nav-tab"
      class:bottom-nav-tab-selected={path === 'settings'}
      on:click={goToSettings}
      role="tab"
      tabindex={0}
      on:keyup={e => onKeyUp(e, 'settings')}
    >
      <Icon icon={ICON_IMAGE.cog} size={ICON_SIZE.large} />
      <span>Settings</span>
    </div>
  </nav>
{/if}

<svelte:window bind:innerWidth />

<style lang="scss">
  @use '$lib/styles/variables/colors';

  $top-nav-height: 4rem;

  .bottom-nav {
    display: flex;

    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;

    height: 5rem;

    background-color: colors.$secondary;
  }

  .bottom-nav-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    flex: 1;

    &-selected {
      background-color: #00000033;
    }
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
