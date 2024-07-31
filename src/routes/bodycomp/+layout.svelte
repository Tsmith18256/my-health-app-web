<script lang="ts">
  import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
</script>

<div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
  <aside>
    <AppRail>
      <AppRailAnchor
        href="/bodycomp/log"
        title="Body Composition Log"
        selected={$page.url.pathname === '/bodycomp/log'}
      >
        <svelte:fragment slot="lead"
          ><i class="far fa-clipboard-list" /></svelte:fragment
        >
        <span>Log</span>
      </AppRailAnchor>
      <AppRailAnchor
        href="/bodycomp/overview"
        title="Body Composition Overview"
        selected={$page.url.pathname === '/bodycomp/overview'}
      >
        <svelte:fragment slot="lead"
          ><i class="far fa-chart-line" /></svelte:fragment
        >
        <span>Overview</span>
      </AppRailAnchor>
      <AppRailAnchor
        href="/bodycomp/settings"
        title="Body Composition Settings"
        selected={$page.url.pathname === '/bodycomp/settings'}
      >
        <svelte:fragment slot="lead"><i class="far fa-cog" /></svelte:fragment>
        <span>Settings</span>
      </AppRailAnchor>
    </AppRail>
  </aside>

  <main class="space-y-4 p-4">
    <slot />
  </main>
</div>
