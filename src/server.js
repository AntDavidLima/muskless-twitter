import http from 'node:http';

import { json } from './middlewares/json.js';

const posts = [];

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  if (method === 'GET' && url === '/posts') {
    return response.end(JSON.stringify(posts));
  }

  if (method === 'POST' && url === '/posts') {
    const { userId, title, content } = request.body;
    posts.push({ id: posts.length + 1, userId, title, content });

    return response.writeHead(201).end(JSON.stringify(posts[posts.length - 1]));
  }

  return response.writeHead(404).end('Pagina não encontrada');
});

server.listen(3333);
