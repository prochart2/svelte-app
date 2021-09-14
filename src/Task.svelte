<script>
    import {createEventDispatcher} from 'svelte';
    import { toIcon, makeTask } from './task';
    import TaskList from './TaskList.svelte';
    export let task;

    const dispatch = createEventDispatcher();
    const onClick = (id) => {
        dispatch('toggle', {
            id: id,
        });
    }
    let clicked = false;

    let newChild = "";
    const onNewChildEntered = (event) => {
        if (event.keyCode != 13 || ! newChild) return;
        task.children = [
            ...task.children,
            makeTask(newChild)
        ];
        newChild = "";
        task = task;
    }

    const onDragStart = (event) => {
        dispatch('dragstart', {
            target: event.target,
            id: task.id,
        })
    }
</script>

<li draggable="true" on:dragstart={onDragStart}>
    <span on:click={onClick(task.id)}>{toIcon(task)}</span>
    <span on:click="{() => clicked = !clicked}">{task.body}</span>
    {#if clicked}
        <input type="text"
            bind:value={newChild}
            on:keyup={onNewChildEntered}
            on:blur={() => clicked = false}>
    {/if}
    <TaskList tasks={task.children} />
</li>
