import { persist } from './index';

describe('persist decorator', () => {
  it('reads persisted value and writes updates', () => {
    const storage = new Map<string, unknown>();

    const adapter = {
      get: jest.fn((key: string) => storage.get(key)),
      set: jest.fn((key: string, value: unknown) => {
        storage.set(key, value);
      }),
    };

    class Example {
      value!: string;
    }

    persist({ adapter, key: 'example:value' })(Example.prototype, 'value');
    storage.set('example:value', 'from-store');

    const instance = new Example();

    expect(instance.value).toBe('from-store');

    instance.value = 'updated';
    expect(adapter.set).toHaveBeenCalledWith('example:value', 'updated');
  });
});
