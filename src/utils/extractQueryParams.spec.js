import { describe, expect, it } from 'vitest';
import { extractQueryParams } from './extractQueryParams';

describe('Query params extraction', () => {
  it('Should be able to extract the key and value of a single query param', () => {
    const queryParams = extractQueryParams('?param=value');

    expect(queryParams).toStrictEqual({ param: 'value' });
  });

  it('Should be able to extract the keys and values from multiple query params', () => {
    const queryParams = extractQueryParams('?param1=value1&param2=value2');

    expect(queryParams).toStrictEqual({ param1: 'value1', param2: 'value2' });
  });
});
