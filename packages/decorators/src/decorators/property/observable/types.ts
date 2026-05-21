import { PropertyValueContext } from '$core/decorators/property/types';

export type ObservableChangeHandler = (
  args: PropertyValueContext & { nextValue: unknown; previousValue: unknown },
) => void;
