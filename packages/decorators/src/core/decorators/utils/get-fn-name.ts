import { ClassMethodThis } from '$core/types/class-method-this';

export const getFnKey = (originalThis: ClassMethodThis, propertyKey: PropertyKey): string =>
  `${originalThis.constructor.name}:${String(propertyKey)}`;
