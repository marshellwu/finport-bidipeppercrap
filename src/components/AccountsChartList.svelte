<script lang="ts">
    import { accounts } from '../stores';

    import AccountCreateForm from './AccountCreateForm.svelte';

    const deleteAccount = (name) => {
        const index = $accounts.findIndex(account => account.name == name);
        $accounts.splice(index, 1);

        $accounts = $accounts;
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
                <th scope="row">{account.name}</th>
                <td>{account.balance}</td>
                <td>{account.balanceType}</td>
                <td>
                    <button type="button" class="btn btn-outline-danger" on:click={() => deleteAccount(account.name)}>🗑</button>
                    <button type="button" class="btn btn-outline-primary" on:click={() => account.editMode = !account.editMode ? true : false}>✏</button>
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