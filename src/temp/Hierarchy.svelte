<script lang="ts">
    import { accounts } from '../stores';

    function getParent(name) {
        const account = $accounts.find(a => a.name == name);

        if (!account) return '';
        return account.parentAccount;
    }

    $: getHierachy = index => {
        const account = $accounts[index];

        let parent = account.parentAccount;
        let hierarchy = parent ? parent + ':' : '';

        while (parent) {
            parent = getParent(parent);
            if (!parent) continue;

            hierarchy = `${parent}:${hierarchy}`;
        }

        return hierarchy;
    }
</script>

{#each $accounts as account, i}
    <p>{getHierachy(i)}{account.name}</p>
{/each}