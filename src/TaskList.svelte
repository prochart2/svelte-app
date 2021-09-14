<script>
    import Task from './Task.svelte';
    import {createEventDispatcher} from 'svelte';
    export let tasks;

    const dispatch = createEventDispatcher();

    let lastLeftIdx = null;

    const onDragStart = (event) => {
        const idx = event.detail.idx;
        console.log("Drag started: " + idx);
    }

    const onDragEnd = (event) => {
        const idx = event.detail.idx;
        console.log("Drag end: " + idx);
        event.detail.target.style.background = "";
        if (lastLeftIdx != null && idx != lastLeftIdx) {
            dispatch('swap', {
                idx1: idx,
                idx2: lastLeftIdx,
            });
        }
    }

    const onDragEnter = (event) => {
        console.log("Drag Enter" + event.detail.idx);
        // event.detail.target.style.borderBottom = "solid";
        event.detail.target.style.background = "gray";
    }

    const onDragLeave = (event) => {
        console.log("Drag Leave" + event.detail.idx);
        lastLeftIdx = event.detail.idx;
        // event.detail.target.style.borderBottom = "hidden";
        event.detail.target.style.background = "";
    }

    const onDrop = (event) => {
        const idx = event.detail.idx;
        event.preventDefault()
        console.log("Drop: " + idx);
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
