<script lang="ts">
    import { accounts as mainAccounts } from '../stores';
    export let accounts = [];
    export let parentAccount = '';
    export let parentName = '';
    export let miscBalance = 0;

    $: childAccounts = accounts.filter(a => a.parentAccount == parentAccount);
    
    $: hasChild = parent => accounts.find(a => a.parentAccount == parent.id);

    $: childSum = (parent) => {
        let childs = accounts.filter(a => a.parentAccount == parent.id);
        let sum = parent.balance;

        if (childs) {
            childs.forEach(account => {
                sum += childSum(account);
            });
        }

        return sum;
    };
</script>

{#if childAccounts}
    <ul class="list-group list-group-flush">
        {#each childAccounts as account}
            <li class="list-group-item">{account.name} <span class="float-end">{childSum(account)}</span> </li>
            {#if hasChild(account)}
                <li class="list-group-item">
                    <svelte:self accounts={$mainAccounts} parentName={account.name} parentAccount={account.id} miscBalance={account.balance}/>
                </li>
            {/if}
        {/each}
        {#if miscBalance}
            <li class="list-group-item">
                {parentName} <span class="float-end">{miscBalance}</span>
            </li>
        {/if}
    </ul>
{/if}