export function buildRoutePath(path) {
  const routeParametersRegex = /:(\w+)/g;
  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    '(?<$1>[a-z0-9-_]+)'
  );

  return new RegExp(
    `^${pathWithParams}(?<query>(\\?\\w+=\\w+(&\\w+=\\w+)*)?)?/?$`
  );
}
