import { randomUUID } from 'node:crypto';

import { Database } from './database.js';
import { buildRoutePath } from './utils/buildRoutePath.js';

const database = new Database();

export const routes = [
  {
    resource: buildRoutePath('/posts'),
    GET: {
      handler: (request, response) => {
        const posts = database.select('posts');

        return response.end(JSON.stringify(posts));
      },
    },
    POST: {
      handler: (request, response) => {
        const { userId, content } = request.body;

        const post = database.insert('posts', {
          id: randomUUID(),
          userId,
          content,
        });

        return response.writeHead(201).end(JSON.stringify(post));
      },
    },
  },
  {
    resource: buildRoutePath('/posts/:id/test/:testId'),
    DELETE: {
      handler: (request, response) => {
        return response.end('ok');
      },
    },
  },
];