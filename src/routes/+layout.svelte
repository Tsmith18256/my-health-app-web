<script lang="ts">
  import '$lib/assets/fonts/css/fontawesome.min.css';
  import '$lib/assets/fonts/css/regular.min.css';
</script>

<slot />

<style>
  :global(*) {
    margin: 0;
    padding: 0;

    box-sizing: border-box;

    font-family: sans-serif;
    color: var(--text-color);
  }

  :global(:root) {
    --primary-color: #0E21A0;
    --secondary-color: #4D2DB7;
    --ternary-color: #9D44C0;
    --quaternary-color: #EC53B0;
    --background-color: #030826;
    --text-color: #DDD;
  }

  :global(body) {
    height: 100vw;
    padding: 2rem 3rem;

    background-color: var(--background-color);
  }
</style>
