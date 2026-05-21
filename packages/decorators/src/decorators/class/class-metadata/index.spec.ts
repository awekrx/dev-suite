import { CLASS_METADATA_SYMBOL, classMetadata } from './index';

describe('classMetadata decorator', () => {
  it('assigns metadata to class constructor', () => {
    class Example {}

    const Decorated = classMetadata({ metadata: { domain: 'payments' } })(Example);

    new Decorated();

    const metadata = (Decorated as unknown as Record<symbol, unknown>)[CLASS_METADATA_SYMBOL] as Record<
      string,
      unknown
    >;

    expect(metadata).toMatchObject({ domain: 'payments' });
  });

  it('merges metadata across decorations', () => {
    class Example {}

    const First = classMetadata({ metadata: { domain: 'payments' } })(Example);
    const Second = classMetadata({ metadata: { feature: 'risk' } })(First);

    new Second();

    const metadata = (Second as unknown as Record<symbol, unknown>)[CLASS_METADATA_SYMBOL] as Record<string, unknown>;

    expect(metadata).toMatchObject({ domain: 'payments', feature: 'risk' });
  });
});
