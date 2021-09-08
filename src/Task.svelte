<script>
    import {createEventDispatcher} from 'svelte';
    import { toIcon } from './task';
    export let task;

    const dispatch = createEventDispatcher();
    const onClick = (idx) => {
        dispatch('toggle', {
            idx: idx,
        });
    }
</script>

<li on:click={onClick(task.idx)}>
    {toIcon(task)} : {task.body}
</li>
