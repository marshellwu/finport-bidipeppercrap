<script>
    import { accounts } from '../stores';

    $: totalBalance = $accounts.reduce(function(sum, account) {
        return sum + account.balance;
    }, 0);

    $: balanceDifferent = $accounts.reduce(function(sum, account) {
        if (account.balanceType == 'DEBIT') return sum + account.balance;
        if (account.balanceType == 'CREDIT') return sum - account.balance;
    }, 0);
</script>

<div class="card text-bg-danger">
    <div class="card-header">Balance Summary</div>
    <div class="card-body">
        <p>
            Total Balance: Rp{totalBalance}
        </p>
        {#if balanceDifferent != 0}
            <div class="alert alert-danger mt-3 mb-0" role="alert">
                Unbalanced different: <strong>Rp{balanceDifferent}</strong>
            </div>
        {:else}
            <div class="alert alert-success mt-3 mb-0" role="alert">
                Accounts are balanced.
            </div>
        {/if}
    </div>
</div>