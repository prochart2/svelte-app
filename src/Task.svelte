<script>
    import {createEventDispatcher} from 'svelte';
    import { toIcon } from './task';
    import TaskList from './TaskList.svelte';
    export let task;

    const dispatch = createEventDispatcher();
    const onClick = (id) => {
        dispatch('toggle', {
            id: id,
        });
    }
</script>

<li on:click={onClick(task.id)}>
    {toIcon(task)} : {task.body}
    <TaskList tasks={task.children} />
</li>
