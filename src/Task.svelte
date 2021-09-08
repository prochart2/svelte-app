<script>
    export let task;

    const statusToIcon = (status) => {
        return {
            "todo": "⬜",
            "wip": "⏩",
            "done": "✅"
        }[status];
    }
</script>

<li>{task.idx}({statusToIcon(task.status)}) : {task.body}</li>
