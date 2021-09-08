<script>
    import Task from './Task.svelte';
    export let tasks;
</script>

{#each tasks as task (task.idx)}
    <Task task={task} on:toggle />
{/each}
