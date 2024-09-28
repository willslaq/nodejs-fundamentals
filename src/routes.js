import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import { importFromCSV } from "./streams/import-from-csv.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const { search } = request.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
            }
          : null
      );

      return response.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const data = request.body;

      console.log(data);

      const missingFields = [];
      if (!data.title) missingFields.push("title");
      if (!data.description) missingFields.push("description");

      if (missingFields.length > 0) {
        return response.writeHead(400).end(
          JSON.stringify({
            message: `Missing fields: ${missingFields.join(", ")}`,
          })
        );
      }

      const tasks = {
        id: randomUUID(),
        title: data.title,
        description: data.description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert("tasks", tasks);

      return response.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      const { title, description } = request.body;

      const currentTask = database.select("tasks", { id })[0];

      if (!currentTask) {
        return response.writeHead(404).end("Task not found!");
      }

      const updatedTask = {
        ...currentTask,
        ...(title && { title }),
        ...(description && { description }),
        updated_at: new Date(),
      };

      database.update("tasks", id, updatedTask);

      return response.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;

      if (!database.select("tasks", { id }).length) {
        return response.writeHead(404).end("Task not found!");
      }

      database.delete("tasks", id);

      return response.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (request, response) => {
      const { id } = request.params;

      const currentTask = database.select("tasks", { id })[0];

      if (!currentTask) {
        return response.writeHead(404).end("Task not found!");
      }

      if (currentTask.completed_at) {
        return response.writeHead(400).end("Task already completed!");
      }

      const updatedTask = {
        ...currentTask,
        completed_at: new Date(),
        updated_at: new Date(),
      };

      database.update("tasks", id, updatedTask);

      return response.writeHead(204).end();
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/upload-tasks"),
    handler: async (request, response) => {
      await importFromCSV();

      return response.writeHead(201).end();
    },
  },
];
