<script lang="ts">
  import {
    Drawer,
    getDrawerStore,
    initializeStores,
  } from '@skeletonlabs/skeleton';
  import { inject } from '@vercel/analytics';
  import { dev } from '$app/environment';
  import '$lib/shared/assets/fonts/css/fontawesome.min.css';
  import '$lib/shared/assets/fonts/css/regular.min.css';
  import '../app.css';
  import BodyCompSideBar from './bodycomp/log/body-comp-side-bar.svelte';
  import BottomBar from './bottom-bar.svelte';
  import TopBar from './top-bar.svelte';

  let { children } = $props();

  initializeStores();

  const drawerStore = getDrawerStore();

  inject({ mode: dev ? 'development' : 'production' });

  const closeDrawer = () => {
    drawerStore.close();
  };
</script>

<Drawer>
  {#if $drawerStore.id === 'navigation-drawer'}
    <BodyCompSideBar onChange={closeDrawer} />
  {/if}
</Drawer>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
  <TopBar />

  {@render children()}

  <BottomBar />
</div>
