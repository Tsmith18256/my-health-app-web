<script lang="ts">
  import { AppBar, getDrawerStore } from '@skeletonlabs/skeleton';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Icon, { IconImage } from '$lib/shared/components/display/icon/icon.svelte';

  let isDrawerOpen = false;

  const navigationButtons = [
    {
      route: '/exercise',
      label: 'Exercise',
    },
    {
      route: '/nutrition',
      label: 'Nutrition',
    },
    {
      route: '/bodycomp',
      label: 'Body Comp',
    },
  ] as const;

  const drawerStore = getDrawerStore();

  const getButtonClass = (buttonRoute: string, pathname: string) => {
    if (pathname.startsWith(buttonRoute)) {
      return 'variant-filled-primary';
    }

    return 'variant-filled-surface';
  };

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      drawerStore.close();
    } else {
      drawerStore.open({
        id: 'navigation-drawer',
        width: 'w-20',
        rounded: 'rounded-none'
      });
    }
  };
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <button class="btn md:hidden" type="button" on:click={toggleDrawer}>
      <Icon iconImage={IconImage.HamburgerMenu} />
    </button>
    <h3 class="h3">My Health App</h3>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    {#each navigationButtons as button}
      <button
        class="btn {getButtonClass(button.route, $page.url.pathname)} hidden md:flex"
        type="button"
        on:click={() => goto(button.route)}
      >
        {button.label}
      </button>
    {/each}
  </svelte:fragment>
</AppBar>
