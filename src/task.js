const statusIconMap = {
    todo: "⬜",
    wip: "⏩",
    done: "✅"
}

const nextStatusMap = {
    todo: "wip",
    wip: "done",
    done: "todo",
}

let nextId = 0;

const makeTask = (body) => {
    nextId += 1;
    return {
        id: nextId,
        body: body,
        status: "todo",
    }
}

const toIcon = (task) => {
    return statusIconMap[task.status];
}

const toNextStatus = (task) => {
    return {
        ...task,
        status: nextStatusMap[task.status],
    }
}

export {
    makeTask,
    toIcon,
    toNextStatus,
}
