<script lang="ts">
  import {
    Modal,
    initializeStores,
    type ModalComponent,
  } from '@skeletonlabs/skeleton';
  import { inject } from '@vercel/analytics';
  import { dev } from '$app/environment';
  import BodyCompEditEntryModal from '$lib/body-comp/components/body-comp-edit-entry-modal/body-comp-edit-entry-modal.svelte';
  import BottomBar from '$lib/root/components/bottom-bar/bottom-bar.svelte';
  import TopBar from '$lib/root/components/top-bar/top-bar.svelte';
  import '$lib/shared/assets/fonts/css/fontawesome.min.css';
  import '$lib/shared/assets/fonts/css/regular.min.css';
  import '$lib/shared/polyfills';
  import '../app.css';

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

  <BottomBar />
</div>
