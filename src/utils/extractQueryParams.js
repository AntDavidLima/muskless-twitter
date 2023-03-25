export function extractQueryParams(query) {
  return query
    .substr(1)
    .split('&')
    .reduce((params, item) => {
      const [key, value] = item.split('=');

      params[key] = value;

      return params;
    }, {});
}
