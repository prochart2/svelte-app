<script>
    import { text } from "svelte/internal";
    import TaskList from './TaskList.svelte';

    let date = "2020-09-08";

    let taskList = [];
    let nextIndex = 0;
    let newTask = "";

    const makeTask = (body) => {
        nextIndex += 1;
        return {
            "idx": nextIndex,
            "status": "todo",
            "body": newTask,
        };
    }

    const addTask = (body) => {
        taskList = [...taskList, makeTask(body)];
        newTask = "";
    }

    const onNewTaskEntered = (event) => {
        if (event.keyCode != 13 || ! newTask) return;
        addTask(newTask);
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
    <TaskList taskList={taskList} />
    <h2>やったこと</h2>
    <h2>できなかったこと</h2>
    <h2>今日の学び</h2>
    <h2>感想</h2>
</div>


