import { PropertyValueContext } from '$core/decorators/property/types';

export type TransformMapper = (args: PropertyValueContext & { value: unknown }) => unknown;
