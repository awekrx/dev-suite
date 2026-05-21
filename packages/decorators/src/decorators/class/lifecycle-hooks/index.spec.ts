import { lifecycleHooks } from './index';

describe('lifecycleHooks decorator', () => {
  type Destroyable = {
    destroy: () => void;
  };

  it('calls onInit after construction', () => {
    const onInit = jest.fn();

    class Example {
      onInit() {
        onInit();
      }
    }

    const Decorated = lifecycleHooks()(Example);

    new Decorated();

    expect(onInit).toHaveBeenCalledTimes(1);
  });

  it('wires destroy method to onDestroy hook', () => {
    const onDestroy = jest.fn();

    class Example {
      onDestroy() {
        onDestroy();
      }
    }

    const Decorated = lifecycleHooks()(Example);
    const instance = new Decorated() as unknown as Destroyable;

    instance.destroy();

    expect(onDestroy).toHaveBeenCalledTimes(1);
  });

  it('preserves original destroy behavior', () => {
    const originalDestroy = jest.fn();
    const hookDestroy = jest.fn();

    class Example {
      destroy() {
        originalDestroy();
      }

      onDestroy() {
        hookDestroy();
      }
    }

    const Decorated = lifecycleHooks()(Example);
    const instance = new Decorated() as unknown as Destroyable;

    instance.destroy();

    expect(originalDestroy).toHaveBeenCalledTimes(1);
    expect(hookDestroy).toHaveBeenCalledTimes(1);
  });
});
