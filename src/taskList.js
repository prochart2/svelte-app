import { writable } from 'svelte/store';
import { makeTask, toIcon, toNextStatus } from './task';
import { db } from './firebase';
import { doc, setDoc, updateDoc} from "firebase/firestore";
import { fmt } from "./utils";

const createTaskList = (uid, date) => {
    const { subscribe, update } = writable([]);
    let userRef = doc(db, 'users', uid);
    let dialyRef = doc(userRef, 'dialy', fmt.format(date).replaceAll('/', '-'));
    setDoc(dialyRef, {});

    return {
        subscribe,
        addTask: body => update(tasks => {
            const newTask = makeTask(body);
            tasks.push(newTask);
            updateDoc(dialyRef, {tasks});
            return tasks;
        }),
        toggleStatus: id => update(tasks => {
            const targetIndex = tasks.findIndex(t => t.id == id);
            let targetTask = tasks.splice(targetIndex, 1)[0];
            targetTask = toNextStatus(targetTask);
            tasks.splice(targetIndex, 0, targetTask);
            return tasks;
        }),
        swap: (idx1, idx2) => update(tasks => {
            [tasks[idx1], tasks[idx2]] = [tasks[idx2], tasks[idx1]];
            console.log(`Swap ${idx1} <-> ${idx2}`);
            return tasks;
        }),
    };
}

export {
    createTaskList
};
