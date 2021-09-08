<script>
    import { onDestroy, text } from "svelte/internal";
    import TaskList from './TaskList.svelte';
    import { taskList } from './taskList';

    let date = "2020-09-08";

    let newTask = "";

    let tasks;
    const unsubscribe = taskList.subscribe(val => {
        tasks = val;
    });
    onDestroy(unsubscribe);
    console.dir(tasks);

    const onNewTaskEntered = (event) => {
        if (event.keyCode != 13 || ! newTask) return;
        taskList.addTask(newTask);
        newTask = "";
        console.log("onNew");
    }

    const onTaskStatuToggled = (event) => {
        taskList.toggleStatus(event.detail.idx);
    }
</script>

<p>
    ahiahi
</p>

<div>
    <h2>目標</h2>
    <h2>やること</h2>
    <input type="text"
           placeholder="やること追加"
           on:keyup={onNewTaskEntered}
           bind:value={newTask}>
    <TaskList tasks={tasks} on:toggle={onTaskStatuToggled} />
    <h2>やったこと</h2>
    <h2>できなかったこと</h2>
    <h2>今日の学び</h2>
    <h2>感想</h2>
</div>


