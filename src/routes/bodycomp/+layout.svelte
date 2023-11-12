<script lang="ts">
  import { ICON_IMAGES, ICON_SIZES, Icon } from '@tsmith18256/ty-ui';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import IconButton from '$lib/components/shared/buttons/icon-button/icon-button.svelte';
  import { isDesktopWidth } from '$lib/utils/shared/breakpoint/breakpoint.util';

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
    <span class="top-nav-settings-button">
      <!-- TODO: MHA-35 - Replace with TyUI component -->
      <IconButton icon={ICON_IMAGES.cog} size={ICON_SIZES.large} on:click={goToSettings} title="Settings" tabindex={0} />
    </span>

    {#if path === 'settings'}
      <!-- TODO: MHA-35 - Replace with TyUI component -->
      <IconButton
        icon={ICON_IMAGES.chevronLeft}
        size={ICON_SIZES.large}
        on:click={goToLog}
        title="Go back"
        tabindex={0}
      />
    {/if}
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
      <Icon icon={ICON_IMAGES.log} size={ICON_SIZES.large} />
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
      <Icon icon={ICON_IMAGES.chartLine} size={ICON_SIZES.large} />
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
      <Icon icon={ICON_IMAGES.cog} size={ICON_SIZES.large} />
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
    // Using a reverse row makes it easier to use space-between because there will always be an icon on the right side,
    // but the one on the left side will not always appear.
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    top: 0;
    right: 0;
    left: 0;

    height: $top-nav-height;
    padding: 0 1.25rem;

    border-bottom: 2px solid colors.$border;
  }

  .top-nav-settings-button {
    justify-self: flex-end;
  }

  .with-top-nav {
    padding-top: $top-nav-height;
  }
</style>
