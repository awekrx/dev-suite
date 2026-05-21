import { PropertyValueContext } from '$core/decorators/property/types';

export type MemoizedComputedResolver = (args: PropertyValueContext) => unknown;
