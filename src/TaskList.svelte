<script>
    import Task from './Task.svelte';
    export let tasks;
</script>

{#each tasks as task (task.id)}
    <Task task={task} on:toggle />
{/each}
