import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const users = database.select("users");

      return response.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const { name, email } = request.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", user);

      return response.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (request, response) => {
      return response.end();
      //   const { id } = request.params;

      //   database.delete("users", id);

      //   return response.writeHead(204).end();
    },
  },
];
