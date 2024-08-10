<script lang="ts">
  import {
    Modal,
    TabGroup,
    TabAnchor,
    initializeStores,
    type ModalComponent,
  } from '@skeletonlabs/skeleton';
  import { inject } from '@vercel/analytics';
  import { dev } from '$app/environment';
  import { page } from '$app/stores';
  import BodyCompEditEntryModal from '$lib/body-comp/components/body-comp-edit-entry-modal/body-comp-edit-entry-modal.svelte';
  import '$lib/shared/assets/fonts/css/fontawesome.min.css';
  import '$lib/shared/assets/fonts/css/regular.min.css';
  import '$lib/shared/polyfills';
  import '../app.css';
    import TopBar from '$lib/root/components/top-bar.svelte';

  initializeStores();

  const modalRegistry: Record<string, ModalComponent> = {
    bodyCompEditEntryModal: { ref: BodyCompEditEntryModal },
  };

  inject({ mode: dev ? 'development' : 'production' });
</script>

<Modal components={modalRegistry} />

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
  <TopBar />

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
      <TabAnchor
        href="/exercise"
        selected={$page.url.pathname.startsWith('/exercise')}
      >
        <!-- TODO: Update all FA icons to a common component -->
        <svelte:fragment slot="lead"
          ><i class="far fa-running" /></svelte:fragment
        >
        Exercise
      </TabAnchor>
      <TabAnchor
        href="/nutrition"
        selected={$page.url.pathname.startsWith('/nutrition')}
      >
        <svelte:fragment slot="lead"
          ><i class="far fa-apple-alt" /></svelte:fragment
        >
        Nutrition
      </TabAnchor>
      <TabAnchor
        href="/bodycomp/log"
        selected={$page.url.pathname.startsWith('/bodycomp')}
      >
        <svelte:fragment slot="lead"
          ><i class="far fa-heartbeat" /></svelte:fragment
        >
        Body Comp
      </TabAnchor>
    </TabGroup>
  </nav>
</div>
