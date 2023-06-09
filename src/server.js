import http from 'node:http';

import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extractQueryParams.js';

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  const routeResource = routes.find((route) => route.resource.test(url));

  if (routeResource === undefined) {
    return response.writeHead(404).end();
  }

  const routeMethod = routeResource[method];

  if (routeMethod === undefined) {
    return response.writeHead(501);
  }

  const routeParams = url.match(routeResource.resource);

  const { query, ...params } = routeParams.groups;

  request.params = params;
  request.query = query ? extractQueryParams(query) : {};

  return routeMethod.handler(request, response);
});

server.listen(3333);
