import { PropertyValueContext } from '$core/decorators/property/types';

export type ValidatePredicate = (args: PropertyValueContext & { value: unknown }) => boolean | undefined;
