<script>
    import { onDestroy } from "svelte/internal";
    import TaskList from './TaskList.svelte';
    import { createTaskList } from './taskList';
    import { fmt } from "./utils";
    import { doc, setDoc, getDoc} from "firebase/firestore";
    import { db } from './firebase';
    import { Link } from "svelte-routing";

    export let uid;
    export let date_str;

    // Date
    const date = date_str === "new" ? new Date() : new Date(date_str);
    let date_text = fmt.format(date);

    // Aim
    let aims = [];
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
    let taskList = createTaskList(uid, date);
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

    const onTasksSwapped = event => {
        const [idx1, idx2] = [
            event.detail.idx1,
            event.detail.idx2,
        ];
        taskList.swap(idx1, idx2);
    }

    // Fetch exist data from firestore
    let userRef = doc(db, 'users', uid);
    let dialyRef = doc(userRef, 'dialy', fmt.format(date).replaceAll('/', '-'));
    getDoc(dialyRef)
    .then(doc => {
        console.log("fetched.")
        if (doc.exists()) {
            const tasks = doc.data()['tasks']
            taskList.update(tasks || []);
        } else {
            setDoc(dialyRef, {});
            taskList.update([]);
        }
    });

    // Learned
    let learned = "";

    // Impressions
    let impressions = "";
</script>

<h2>
    {date_text}
</h2>

<Link to="">戻る</Link><br>
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
    <TaskList
        tasks={tasks}
        on:toggle={onTaskStatuToggled}
        on:swap={onTasksSwapped}/>
    <h2>やったこと</h2>
    <TaskList tasks={dones} on:toggle={onTaskStatuToggled} />
    <h2>できなかったこと</h2>
    <TaskList tasks={undones} on:toggle={onTaskStatuToggled} />
    <h2>今日の学び</h2>
    <textarea cols="30" rows="5" bind:value={learned}></textarea>
    <h2>感想</h2>
    <textarea cols="30" rows="5" bind:value={impressions}></textarea>
</div>


