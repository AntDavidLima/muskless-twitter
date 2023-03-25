import { randomUUID } from 'node:crypto';

import { Database } from './database.js';
import { buildRoutePath } from './utils/buildRoutePath.js';

const database = new Database();

export const routes = [
  {
    resource: buildRoutePath('/posts'),
    GET: {
      handler: (request, response) => {
        const { search } = request.query;

        const posts = database.select(
          'posts',
          search ? { content: search } : null
        );

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
    resource: buildRoutePath('/posts/:id'),
    DELETE: {
      handler: (request, response) => {
        const { id } = request.params;

        const success = database.delete('posts', id);

        if (success) {
          return response.writeHead(204).end();
        }

        return response.writeHead(404).end();
      },
    },
    PUT: {
      handler: (request, response) => {
        const { id } = request.params;
        const { content } = request.body;

        const post = database.update('posts', id, { content });

        if (post) {
          return response.end(JSON.stringify(post));
        }

        return response.writeHead(404).end();
      },
    },
  },
];
