import { writable } from 'svelte/store';
import { makeTask, toIcon, toNextStatus } from './task';

const createTaskList = () => {
    const { subscribe, update } = writable([]);

    return {
        subscribe,
        addTask: body => update(tasks => {
            tasks.push(makeTask(body));
            return tasks;
        }),
        toggleStatus: id => update(tasks => {
            const targetIndex = tasks.findIndex(t => t.id == id);
            let targetTask = tasks.splice(targetIndex, 1)[0];
            targetTask = toNextStatus(targetTask);
            tasks.splice(targetIndex, 0, targetTask);
            return tasks;
        }),
    };
}

export const taskList = createTaskList();
