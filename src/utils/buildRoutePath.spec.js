import { describe, expect, it } from 'vitest';
import { buildRoutePath } from './buildRoutePath';

describe('Route path building', () => {
  it('should match the base path', () => {
    const pathRegex = buildRoutePath('/resource');

    const match = pathRegex.test('/resource');

    expect(match).toBe(true);
  });

  it('should match a simple path with an extra /', () => {
    const pathRegex = buildRoutePath('/resource');

    const match = pathRegex.test('/resource/');

    expect(match).toBe(true);
  });

  it('should match a declared sub-resource path', () => {
    const pathRegex = buildRoutePath('/resource/subResource');

    const match = pathRegex.test('/resource/subResource');

    expect(match).toBe(true);
  });

  it('should match a declared sub-resource path with an extra /', () => {
    const pathRegex = buildRoutePath('/resource/subResource');

    const match = pathRegex.test('/resource/subResource/');

    expect(match).toBe(true);
  });

  it('should not match the basepath without the first /', () => {
    const pathRegex = buildRoutePath('/resource');

    const match = pathRegex.test('resource');

    expect(match).toBe(false);
  });

  it('should not match another path', () => {
    const pathRegex = buildRoutePath('/resource');

    const match = pathRegex.test('/another');

    expect(match).toBe(false);
  });

  it('should not match a simple path with two extra /', () => {
    const pathRegex = buildRoutePath('/resource');

    const match = pathRegex.test('/resource//');

    expect(match).toBe(false);
  });

  it('should not match a non-declared sub-resource path', () => {
    const pathRegex = buildRoutePath('/resource');

    const match = pathRegex.test('/resource/subResource');

    expect(match).toBe(false);
  });

  it('should match a resource with multiple path params', () => {
    const pathRegex = buildRoutePath(
      '/resource/:firstParam/subResource/:secondParam'
    );

    const match = pathRegex.test('/resource/1/subResource/2');

    expect(match).toBe(true);
  });

  it('should match a resource with multiple path params and an extra /', () => {
    const pathRegex = buildRoutePath(
      '/resource/:firstParam/subResource/:secondParam'
    );

    const match = pathRegex.test('/resource/1/subResource/2/');

    expect(match).toBe(true);
  });

  it('should not match a resource with a missing path param', () => {
    const pathRegex = buildRoutePath(
      '/resource/:firstParam/subResource/:secondParam'
    );

    const match = pathRegex.test('/resource/1/subResource/');

    expect(match).toBe(false);
  });

  it('should not match a non declared sub-resource path with path params', () => {
    const pathRegex = buildRoutePath('/resource/:param');

    const match = pathRegex.test('/resource/1/subResource');

    expect(match).toBe(false);
  });

  it('should match a path with a query param', () => {
    const pathRegex = buildRoutePath('/resource');

    const match = pathRegex.test('/resource?param1=value1');

    expect(match).toBe(true);
  });

  it('should match a path with multiple query params', () => {
    const pathRegex = buildRoutePath('/resource');

    const match = pathRegex.test('/resource?param1=value1&param2=value2');

    expect(match).toBe(true);
  });

  it('should match a resource with multiple path params and multiple query params', () => {
    const pathRegex = buildRoutePath(
      '/resource/:firstParam/subResource/:secondParam'
    );

    const match = pathRegex.test(
      '/resource/1/subResource/2?param1=value1&param2=value2'
    );

    expect(match).toBe(true);
  });

  it('should not match a path with a query param that does not has a value', () => {
    const pathRegex = buildRoutePath('/resource');

    const match = pathRegex.test('/resource?param1');

    expect(match).toBe(false);
  });

  it('should not match a path that does not separate the query params with an &', () => {
    const pathRegex = buildRoutePath('/resource');

    const match = pathRegex.test(
      '/resource?param1=value1param2=value2&param3=value3'
    );

    expect(match).toBe(false);
  });

  it('should not match a path with a ? and no params', () => {
    const pathRegex = buildRoutePath('/resource');

    const match = pathRegex.test('/resource?');

    expect(match).toBe(false);
  });
});
