<script>
    import Task from './Task.svelte';
    export let tasks;

    const onDragStart = (event) => {
        const idx = event.detail.idx;
        console.log("Drag started: " + idx);
        console.dir(event);
        event.detail.target.style.background = "red";
    }

    const onDragEnd = (event) => {
        const idx = event.detail.idx;
        console.log("Drag end: " + idx);
        console.dir(event);
        event.detail.target.style.background = "";
    }

    const onDragEnter = (event) => {
        const idx = event.detail.idx;
        console.log("Drag enter: " + idx);
        console.dir(event);
        event.detail.target.style.background = "green";
    }

    const onDragLeave = (event) => {
        const idx = event.detail.idx;
        console.log("Drag leave: " + idx);
        console.dir(event);
        event.detail.target.style.background = "";
    }

    const onDrop = (event) => {
        const idx = event.detail.idx;
        event.preventDefault()
        console.log("Drop: " + idx);
        console.dir(event);
        event.detail.target.style.background = "yellow";
    }
</script>

<ul class="tasklist">
    {#each tasks as task, idx}
        <Task
            task={task}
            idx={idx}
            on:dragstart={onDragStart}
            on:dragend={onDragEnd}
            on:dragenter={onDragEnter}
            on:dragleave={onDragLeave}
            on:drop={onDrop}
            on:toggle />
    {/each}
</ul>

<style>
    .tasklist {
        list-style: none;
    }
</style>
