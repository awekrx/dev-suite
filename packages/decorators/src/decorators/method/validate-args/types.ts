import { ZodType } from 'zod';

import { AnyFn } from '$core/types/any-fn';

export type ValidateArgsOptions<OriginalFn extends AnyFn> = {
  schema: ZodType<Parameters<OriginalFn>>;
};
