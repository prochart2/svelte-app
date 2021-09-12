<script>
    import Task from './Task.svelte';
    export let tasks;
</script>

<ul class="tasklist">
    {#each tasks as task (task.id)}
        <Task task={task} on:toggle />
    {/each}
</ul>

<style>
    .tasklist {
        list-style: none;
    }
</style>
