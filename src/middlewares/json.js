export async function json(request, response) {
  const buffer = [];

  for await (const chunk of request) {
    buffer.push(chunk);
  }

  const stringfiedBody = Buffer.concat(buffer).toString();

  try {
    request.body = JSON.parse(stringfiedBody);
  } catch (error) {
    request.body = null;
  }

  response.setHeader('Content-Type', 'application/json');
}
