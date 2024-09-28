import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  const route = routes.find((route) => {
    return route.path.test(url) && route.method === method;
  });

  if (route) {
    const routeParams = request.url.match(route.path);

    console.log(routeParams);

    return route.handler(request, response);
  }

  console.log(route);

  return response.writeHead(404).end("Not Found");
});

server.listen(3333, () => {
  console.log("Server running on port 3333");
});
