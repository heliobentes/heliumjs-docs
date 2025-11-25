import { defineHTTPRequest, defineMethod } from "helium/server";

type Task = {
    name: string;
    status: "open" | "closed";
    description: string;
    date: string;
    priority: number;
};

const generateTasks = () => {
    const tasks = [];
    for (let i = 1; i <= 1000; i++) {
        tasks.push({
            name: `Task ${i}`,
            status: i % 2 === 0 ? "open" : "closed",
            description: `This is the description for task ${i}.`,
            date: new Date().toISOString(),
            priority: Math.ceil(Math.random() * 5),
        });
    }
    return tasks as Task[];
};

export const getTasks = defineMethod(async () => {
    const tasks = generateTasks();

    await new Promise((resolve) => setTimeout(resolve, 100));

    return tasks;
});

export const getTasksByHttp = defineHTTPRequest("GET", "/api/get-tasks", async () => {
    const tasks = generateTasks();

    await new Promise((resolve) => setTimeout(resolve, 100));

    return tasks;
});
