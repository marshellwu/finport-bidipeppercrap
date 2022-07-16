<script>
  import "bootstrap/dist/css/bootstrap.min.css";

  import ReportPrint from "../components/ReportPrint.svelte";
</script>

<div class="container noprint">
  <h1 class="display-1 text-center mt-3 mb-5">Finport</h1>
  <slot />
</div>

<ReportPrint />

<style>
  @media print {
    .noprint {
      display: none;
    }
  }
</style>