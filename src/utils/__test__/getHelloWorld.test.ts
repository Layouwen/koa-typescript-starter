import { getHelloWorldStr } from '../getHelloWorld';

it('getHelloWorldStr', () => {
  expect(getHelloWorldStr()).not.toBe('Hello World!');
  expect(getHelloWorldStr()).toBe('hello world');
});
