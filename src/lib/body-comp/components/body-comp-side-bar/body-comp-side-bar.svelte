<script lang="ts">
  import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import Icon, { IconImage } from '$lib/shared/components/display/icon/icon.svelte';
</script>

<AppRail>
  <AppRailAnchor
    href="/bodycomp/log"
    title="Body Composition Log"
    selected={$page.url.pathname === '/bodycomp/log'}
  >
    <svelte:fragment slot="lead">
      <Icon iconImage={IconImage.Log} />
    </svelte:fragment>
    <span>Log</span>
  </AppRailAnchor>
  <AppRailAnchor
    href="/bodycomp/overview"
    title="Body Composition Overview"
    selected={$page.url.pathname === '/bodycomp/overview'}
  >
    <svelte:fragment slot="lead">
      <Icon iconImage={IconImage.LineChart} />
    </svelte:fragment>
    <span>Overview</span>
  </AppRailAnchor>
  <AppRailAnchor
    href="/bodycomp/settings"
    title="Body Composition Settings"
    selected={$page.url.pathname === '/bodycomp/settings'}
  >
    <svelte:fragment slot="lead">
      <Icon iconImage={IconImage.Settings} />
    </svelte:fragment>
    <span>Settings</span>
  </AppRailAnchor>
</AppRail>
