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

let nextIdx = 0;

const makeTask = (body) => {
    nextIdx += 1;
    return {
        idx: nextIdx,
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
