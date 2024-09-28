import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

const database = new Database();

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");
    
    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = request.body;

    const user = {
      id: 1,
      name,
      email,
    };

    database.insert("users", user);

    return response.writeHead(201).end();
  }

  console.log(method, url);
  return response.writeHead(404).end("Not Found");
});

server.listen(3333, () => {
  console.log("Server running on port 3333");
});
