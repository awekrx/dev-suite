import { PropertyValueContext } from '$core/decorators/property/types';

export type DefaultValueResolver = unknown | ((args: PropertyValueContext) => unknown);
