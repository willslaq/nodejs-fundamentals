import http from "node:http";
import { json } from "../middlewares/json.js";

const users = [];

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  if (method === "GET" && url === "/users") {
    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = request.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return response.writeHead(201).end();
  }

  console.log(method, url);
  return response.writeHead(404).end("Not Found");
});

server.listen(3333, () => {
  console.log("Server running on port 3333");
});
