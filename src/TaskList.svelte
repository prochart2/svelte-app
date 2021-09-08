<script>
    import Task from './Task.svelte';

    export let taskList;
</script>

{#each taskList as task (task.idx)}
    <Task task={task} />
{/each}
