<script lang="ts">
  import '$lib/assets/fonts/css/fontawesome.min.css';
  import '$lib/assets/fonts/css/regular.min.css';
</script>

<slot />

<style lang="scss">
  @use '$lib/styles/variables/breakpoints';
  @use '$lib/styles/variables/colors';

  :global(*) {
    margin: 0;
    padding: 0;

    box-sizing: border-box;

    font-family: sans-serif;
    color: colors.$text;
  }

  :global(body) {
    height: 100vw;
    background-color: colors.$background;

    @media (min-width: breakpoints.$tablet) {
      padding: 1rem 2rem;
    }

    @media (min-width: breakpoints.$desktop-small) {
      padding: 2rem 3rem;
    }
  }
</style>
