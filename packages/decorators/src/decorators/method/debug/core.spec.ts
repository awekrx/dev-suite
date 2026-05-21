import { runDebugCore } from './core';

describe('runDebugCore', () => {
  const base = {
    originalThis: { constructor: { name: 'Example' } },
    propertyKey: 'run',
    onceSeenKeys: new Set<string>(),
    insertFnNameInMessageTemplate: (fnName: string) => `Function ${fnName}`,
  };

  it('prints formatted debug data', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation(() => undefined);

    runDebugCore({
      ...base,
      data: ['a'],
      formatter: (args) => args.join(','),
      shouldHideDebugPrefix: true,
      shouldHideTime: true,
    });

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Function'), 'a');
    spy.mockRestore();
  });

  it('honors once option for same method key', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation(() => undefined);
    const onceSeenKeys = new Set<string>();

    runDebugCore({ ...base, data: 1, once: true, onceSeenKeys, shouldHideDebugPrefix: true, shouldHideTime: true });
    runDebugCore({ ...base, data: 2, once: true, onceSeenKeys, shouldHideDebugPrefix: true, shouldHideTime: true });

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
