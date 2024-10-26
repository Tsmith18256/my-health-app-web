<script lang="ts">
  import BodyCompSideBar from './log/body-comp-side-bar.svelte';
</script>

<div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
  <aside class="hidden md:block">
    <BodyCompSideBar />
  </aside>

  <main class="space-y-4 p-4">
    <slot />
  </main>
</div>
