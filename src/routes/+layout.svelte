<script lang="ts">
  import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import '$lib/shared/assets/fonts/css/fontawesome.min.css';
  import '$lib/shared/assets/fonts/css/regular.min.css';
  import '$lib/shared/polyfills';
  import '../app.css';
</script>

<div class="grid h-screen grid-rows-[1fr_auto]">
  <slot />

  <nav>
    <TabGroup
      justify="justify-center"
      active="variant-filled-primary"
      hover="hover:variant-soft-primary"
      flex="flex-1 lg:flex-none"
      rounded=""
      border=""
      class="bg-surface-100-800-token w-full"
    >
      <TabAnchor href="/exercise" selected={$page.url.pathname.startsWith('/exercise')}>
        <svelte:fragment slot="lead"><i class="far fa-running" /></svelte:fragment>
        Exercise
      </TabAnchor>
      <TabAnchor
        href="/nutrition"
        selected={$page.url.pathname.startsWith('/nutrition')}
      >
      <svelte:fragment slot="lead"><i class="far fa-apple-alt" /></svelte:fragment>
        Nutrition
      </TabAnchor>
      <TabAnchor href="/bodycomp/log" selected={$page.url.pathname.startsWith('/bodycomp')}>
        <svelte:fragment slot="lead"><i class="far fa-heartbeat" /></svelte:fragment>
        Body Comp
      </TabAnchor>
    </TabGroup>
  </nav>
</div>
