<div class="container">
  <strong>Date</strong>
  <strong>Weight</strong>
  <strong>Body fat</strong>
  <strong class="small-desktop-heading">Waist</strong>
  <strong class="small-desktop-heading">Neck</strong>
  <strong class="large-desktop-heading">Chest skinfold</strong>
  <strong class="large-desktop-heading">Ab skinfold</strong>
  <strong class="large-desktop-heading">Thigh skinfold</strong>
</div>

<style lang="scss">
  @use '$lib/shared/styles/variables/breakpoints';
  @use '$lib/shared/styles/variables/colors';

  .container {
    display: none;

    @media (min-width: breakpoints.$tablet) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      height: 3rem;
      padding: 0.9rem 1rem;

      border-bottom: 1px solid colors.$border;
    }

    @media (min-width: breakpoints.$desktop-small) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    @media (min-width: breakpoints.$desktop-large) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
  }

  .small-desktop-heading {
    display: none;

    @media (min-width: breakpoints.$desktop-small) {
      display: initial;
    }
  }

  .large-desktop-heading {
    display: none;

    @media (min-width: breakpoints.$desktop-large) {
      display: initial;
    }
  }
</style>
