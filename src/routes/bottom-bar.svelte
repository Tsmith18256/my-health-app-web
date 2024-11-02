<script lang="ts">
  import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import Icon from '$lib/shared/components/display/icon/icon.svelte';
  import { IconImage } from '$lib/shared/types/icon-image.type';
</script>

<nav class="sticky bottom-0 z-10 block md:hidden">
  <TabGroup
    class="bg-surface-100-800-token"
    justify="justify-center"
    active="variant-filled-primary"
    hover="hover:variant-soft-primary"
    flex="flex-1 lg:flex-none"
    rounded=""
    border=""
  >
    <TabAnchor
      href="/exercise"
      selected={$page.url.pathname.startsWith('/exercise')}
    >
      <svelte:fragment slot="lead">
        <Icon iconImage={IconImage.Exercise} />
      </svelte:fragment>
      Exercise
    </TabAnchor>
    <TabAnchor
      href="/nutrition"
      selected={$page.url.pathname.startsWith('/nutrition')}
    >
      <svelte:fragment slot="lead">
        <Icon iconImage={IconImage.Nutrition} />
      </svelte:fragment>
      Nutrition
    </TabAnchor>
    <TabAnchor
      href="/bodycomp/log"
      selected={$page.url.pathname.startsWith('/bodycomp')}
    >
      <svelte:fragment slot="lead">
        <Icon iconImage={IconImage.BodyComp} />
      </svelte:fragment>
      Body Comp
    </TabAnchor>
  </TabGroup>
</nav>
