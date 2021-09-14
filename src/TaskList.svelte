<script>
    import Task from './Task.svelte';
    export let tasks;

    const onDragStart = (event) => {
        const id = event.detail.id;
        console.log("Drag started: " + id);
        console.dir(event);
        event.detail.target.style.background = "red";
    }
</script>

<ul class="tasklist">
    {#each tasks as task (task.id)}
        <Task task={task} on:dragstart={onDragStart} on:toggle />
    {/each}
</ul>

<style>
    .tasklist {
        list-style: none;
    }
</style>
