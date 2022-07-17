<script lang="ts">
    import { accounts } from '../stores';

    export let index = -1;

    export let newAccount = {
        id: crypto.randomUUID(),
        name: '',
        balance: 0,
        parentAccount: undefined,
        balanceType: 'DEBIT'
    };

    $: canCreate = !newAccount.name ? true : false;

    function clearForm() {
        newAccount.id = crypto.randomUUID();
        newAccount.name = '';
        newAccount.balance = 0;
        newAccount.parentAccount = undefined;
        newAccount.balanceType = 'DEBIT';
    }

    const addToAccounts = () => {
        $accounts = [{...newAccount}, ...$accounts];

        clearForm();

        document.getElementById('accountName')?.focus();
    };

    const editMode = index < 0;

    const forms = {
        accountName: editMode ? "accountName" : `accountName-${index}`,
        accountBalance: editMode ? "accountBalance" : `accountBalance-${index}`,
        accountParent: editMode ? "accountParent" : `accountParent-${index}`,
        accountBalanceType: editMode ? "accountBalanceType" : `accountBalanceType-${index}`,
        accountDebit: editMode ? "accountDebit" : `accountDebit-${index}`,
        accountCredit: editMode ? "accountCredit" : `accountCredit-${index}`
    };

    function getParent(id) {
        const parent = $accounts.find(account => account.id == id);

        if (!parent) return '';
        return parent;
    }

    $: parentAccountOptions = id => {
        const options = [];

        $accounts.forEach(account => {
            if (account.parentAccount == id) return;

            let parent = undefined;
            if (account.parentAccount) parent = getParent(account.parentAccount);

            while (parent) {
                if (parent.parentAccount == id) break;
                
                parent = getParent(parent.parentAccount);
                if (!parent) break;
            }

            options.push(account);
        });

        return options;
    }
</script>

<div class="card">
    <div class="card-header">{editMode ? "Create Account" : "Edit Account"}</div>
    <div class="card-body">
        <div class="row">
            <div class="col">
                <div class="row mb-3 g-3 align-items-center">
                    <div class="col-5">
                        <label for={forms.accountName} class="form-label">Name</label>
                    </div>
                    <div class="col">
                        <input bind:value={newAccount.name} type="text" name={forms.accountName} id={forms.accountName} class="form-control" placeholder="Cash">
                    </div>
                </div>
                <div class="row mb-3 g-3 align-items-center">
                    <div class="col-5">
                        <label for={forms.accountBalance} class="form-label">Balance</label>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <span class="input-group-text">Rp</span>
                            <input bind:value={newAccount.balance} type="number" name={forms.accountBalance} id={forms.accountBalance} class="form-control" placeholder="Rp2,000,000">
                        </div>
                    </div>
                </div>
                <div class="row g-3 align-items-center">
                    <div class="col-5">
                        <label for={forms.accountParent} class="form-label">Parent Account</label>
                    </div>
                    <div class="col">
                        <select bind:value={newAccount.parentAccount} name={forms.accountParent} id={forms.accountParent} class="form-select" disabled={$accounts.length === 0}>
                            {#if $accounts.length === 0}
                                <option value="" selected>No account were created</option>
                            {:else}
                                <option value="" selected default>No Parent</option>
                                {#each parentAccountOptions(newAccount.id) as account}
                                    {#if account.id != newAccount.id}
                                        <option value={account.id}>{account.name}</option>
                                    {/if}
                                {/each}
                            {/if}
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="card">
                    <div class="card-header">Balance Type</div>
                    <div class="card-body">
                        <div class="form-check">
                            <input bind:group={newAccount.balanceType} type="radio" name={forms.accountBalanceType} id={forms.accountDebit} class="form-check-input" value="DEBIT" checked>
                            <label for={forms.accountDebit} class="form-check-label">Debit</label>
                        </div>
                        <div class="form-check">
                            <input bind:group={newAccount.balanceType} type="radio" name={forms.accountBalanceType} id={forms.accountCredit} class="form-check-input" value="CREDIT">
                            <label for={forms.accountCredit} class="form-check-label">Credit</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {#if !newAccount.editMode}
            <div class="row mt-3">
                <div class="col-3 d-grid mx-auto">
                    <button on:click={addToAccounts} class="btn btn-primary btn-lg" type="button" disabled={canCreate}>Create</button>
                </div>
            </div>
        {/if}
    </div>
</div>