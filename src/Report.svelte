<script>
import { text } from "svelte/internal";

    let date = "2020-09-08";

    let todoList = [];
    let nextIndex = 1;
    let newTodo = "";

    const addTodo = (event) => {
        if (event.keyCode != 13 || ! newTodo) return;
        todoList = [...todoList, {
            "idx": nextIndex,
            "status": "todo",
            "body": newTodo,
        }];
        nextIndex += 1;
        newTodo = "";
    }

    const statusToIcon = (status) => {
        return {
            "todo": "⬜",
            "wip": "⏩",
            "done": "✅"
        }[status]
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
           on:keyup={addTodo}
           bind:value={newTodo}>
    {#each todoList as todo (todo.idx)}
        <li>{todo.idx}({statusToIcon(todo.status)}) : {todo.body}</li>
    {/each}

    <h2>やったこと</h2>
    <h2>できなかったこと</h2>
    <h2>今日の学び</h2>
    <h2>感想</h2>
</div>


