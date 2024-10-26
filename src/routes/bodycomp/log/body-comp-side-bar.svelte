<script lang="ts">
  import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
  import { createEventDispatcher } from 'svelte';
  import { page } from '$app/stores';
  import Icon from '$lib/shared/components/display/icon/icon.svelte';
  import { IconImage } from '$lib/shared/types/icon-image.type';

  const dispatch = createEventDispatcher<{ change: void }>();

  const onChange = () => dispatch('change');
</script>

<AppRail>
  <AppRailAnchor
    href="/bodycomp/log"
    title="Body Composition Log"
    selected={$page.url.pathname === '/bodycomp/log'}
    on:click={onChange}
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
    on:click={onChange}
  >
    <svelte:fragment slot="lead">
      <Icon iconImage={IconImage.LineChart} />
    </svelte:fragment>
    <span>Overview</span>
  </AppRailAnchor>
</AppRail>
