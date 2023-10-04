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

<style>
  .container {
    display: none;

    @media (min-width: 769px) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      height: 3rem;
      padding: 0.9rem 1rem;

      border-bottom: 1px solid #ddd;
    }

    @media (min-width: 1025px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    @media (min-width: 1201px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
  }

  .small-desktop-heading {
    display: none;

    @media (min-width: 1025px) {
      display: initial;
    }
  }

  .large-desktop-heading {
    display: none;

    @media (min-width: 1201px) {
      display: initial;
    }
  }
</style>
