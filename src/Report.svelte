<script>
    import { each, onDestroy } from "svelte/internal";
    import TaskList from './TaskList.svelte';
    import { taskList } from './taskList';

    let date = "2020-09-08";

    // Aim
    let aims = ["ahi"];
    let newAim = "";

    const onNewAimEntered = (event) => {
        if (event.keyCode != 13 || ! newAim) return;
        aims = [...aims, newAim];
        console.log(newAim);
        newAim = "";
    }


    // Tasks
    let newTask = "";
    let tasks;
    const unsubscribe = taskList.subscribe(val => {
        tasks = val;
    });
    $: undones = tasks.filter(task => task.status != "done");
    $: dones = tasks.filter(task => task.status == "done");
    onDestroy(unsubscribe);

    const onNewTaskEntered = (event) => {
        if (event.keyCode != 13 || ! newTask) return;
        taskList.addTask(newTask);
        newTask = "";
    }

    const onTaskStatuToggled = (event) => {
        taskList.toggleStatus(event.detail.id);
    }


    // Learned
    let learned = "";

    // Impressions
    let impressions = "";
</script>

<p>
    ahiahi
</p>

<div>
    <h2>目標</h2>
    <input type="text"
           bind:value={newAim}
           on:keyup={onNewAimEntered}>
    <p>
        {#each aims as aim}
            <li>{aim}</li>
        {/each}
    </p>
    <h2>やること</h2>
    <input type="text"
           placeholder="やること追加"
           on:keyup={onNewTaskEntered}
           bind:value={newTask}>
    <TaskList tasks={tasks} on:toggle={onTaskStatuToggled} />
    <h2>やったこと</h2>
    <TaskList tasks={dones} on:toggle={onTaskStatuToggled} />
    <h2>できなかったこと</h2>
    <TaskList tasks={undones} on:toggle={onTaskStatuToggled} />
    <h2>今日の学び</h2>
    <textarea cols="30" rows="5" bind:value={learned}></textarea>
    <h2>感想</h2>
    <textarea cols="30" rows="5" bind:value={impressions}></textarea>
</div>


