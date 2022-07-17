<script lang="ts">
    import { accounts } from '../stores';

    import AccountCreateForm from './AccountCreateForm.svelte';

    const deleteAccount = (i) => {
        $accounts.splice(i, 1);

        $accounts = $accounts;
    }

    function getParent(id) {
        const account = $accounts.find(a => a.id == id);

        if (!account) return '';
        return account;
    }

    $: getHierachy = id => {
        const account = $accounts.find(a => a.id == id);

        let parent = undefined;
        if (account.parentAccount) parent = getParent(account.parentAccount);

        let hierarchy = parent ? parent.name + ':' : '';

        while (parent) {
            parent = getParent(parent.parentAccount);
            if (!parent) break;

            hierarchy = `${parent.name}:${hierarchy}`;
        }

        return hierarchy;
    }
</script>

<table class="table">
    <caption>Chart of Accounts</caption>
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Balance</th>
            <th scope="col" colspan="2">Balance Type</th>
        </tr>
    </thead>
    <tbody>
        {#each $accounts as account, i}
            <tr>
                <th scope="row">{getHierachy(account.id)}{account.name}</th>
                <td>{account.balance}</td>
                <td class="align-middle">
                    <span class={'badge' + (account.balanceType == 'DEBIT' ? ' bg-success' : ' bg-danger')}>{account.balanceType}</span>
                </td>
                <td>
                    <button type="button" class="btn btn-outline-danger" on:click={() => deleteAccount(i)}>🗑</button>
                    <button type="button" class={'btn' + (!account.editMode ? ' btn-outline-primary' : ' btn-primary')} on:click={() => account.editMode = !account.editMode ? true : false}>✏</button>
                </td>
            </tr>
            {#if account.editMode}
                <tr>
                    <td colspan="4">
                        <AccountCreateForm index={i} newAccount={account}/>
                    </td>
                </tr>
            {/if}
        {/each}
    </tbody>
</table>