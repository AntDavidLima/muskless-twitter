import http from 'node:http';

import { json } from './middlewares/json.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';

const database = new Database();

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  if (method === 'GET' && url === '/posts') {
    const posts = database.select('posts');
    return response.end(JSON.stringify(posts));
  }

  if (method === 'POST' && url === '/posts') {
    const { userId, content } = request.body;

    const post = database.insert('posts', {
      id: randomUUID(),
      userId,
      content,
    });

    return response.writeHead(201).end(JSON.stringify(post));
  }

  return response.writeHead(404).end('Pagina não encontrada');
});

server.listen(3333);
