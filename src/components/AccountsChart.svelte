<script lang="ts">
    import AccountCreateForm from "./AccountCreateForm.svelte";
    import AccountChartList from "./AccountsChartList.svelte";
</script>

<div class="row mb-5">
    <div class="col">
        <AccountCreateForm />
    </div>
</div>
<div class="row">
    <div class="col">
        <h1 class="mb-3">Chart of Accounts</h1>
        <AccountChartList />
    </div>
</div>