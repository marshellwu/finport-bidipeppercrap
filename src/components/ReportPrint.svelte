<script>
    import { accounts } from '../stores';
    import ReportBalanceSheet from "./ReportBalanceSheet.svelte";

    $: debit = $accounts.filter(a => a.balanceType == 'DEBIT');
    $: credit = $accounts.filter(a => a.balanceType == 'CREDIT');
</script>

<div class="printable container">
    <div class="row">
        <div class="col">
            <h1 class="mt-5 mb-3">⚖ Neraca Dagang</h1>
            <div class="row">
                <div class="col">
                    <ReportBalanceSheet accounts={debit} />
                </div>
                <div class="col">
                    <ReportBalanceSheet accounts={credit} />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .printable {
        display: none;
    }

    @media print {
        .printable {
            display: block;
        }
    }
</style>