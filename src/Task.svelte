<script>
    import {createEventDispatcher} from 'svelte';

    export let task;
    const dispatch = createEventDispatcher();

    const getNextStatus = (curr) => {
        return {
            todo: "wip",
            wip: "done",
            done: "todo",
        }[curr];
    }

    const statusToIcon = (status) => {
        return {
            todo: "⬜",
            wip: "⏩",
            done: "✅"
        }[status];
    }

    const onClick = (idx) => {
        let nextStatus = getNextStatus(task.status);
        dispatch('toggle', {
            idx: idx,
            status: nextStatus,
        });
    }


</script>

<li on:click={onClick(task.idx)}>
    {task.idx}({statusToIcon(task.status)}) : {task.body}
</li>
