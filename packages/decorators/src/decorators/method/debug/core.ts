import pc from 'picocolors';

import { getFnKey } from '$core/decorators/utils/get-fn-name';
import { AnyFn } from '$core/types/any-fn';
import { resolveEnabled } from '$core/utils/resolve-enabled';

import { DebugFnCoreOptions } from './types';

export const runDebugCore = <OriginalFn extends AnyFn, DataType extends unknown>(
  options: DebugFnCoreOptions<OriginalFn, DataType>,
) => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- once is better name for this property
    once = false,
    enabled = true,
    label = '',
    shouldHideDebugPrefix = false,
    shouldHideTime = false,
    onceSeenKeys,
    data,
    formatter,
    originalThis,
    propertyKey,
    insertFnNameInMessageTemplate,
  } = options;

  if (!resolveEnabled(enabled)) {
    return;
  }

  const fnKey = getFnKey(originalThis, propertyKey);

  if (once) {
    if (onceSeenKeys.has(fnKey)) {
      return;
    }

    onceSeenKeys.add(fnKey);
  }

  const timestamp = new Date().toTimeString().slice(0, 8);

  const formattedData = formatter ? formatter(data) : data;

  const debug = !shouldHideDebugPrefix ? pc.bold(`[${pc.yellow('Debug')}]`) : '';

  const tag = label.length > 0 ? pc.bold(`[${pc.yellow(label)}]`) : '';
  const time = !shouldHideTime ? `[${pc.green(timestamp)}]` : '';

  const message = insertFnNameInMessageTemplate(pc.cyan(pc.bold(String(fnKey))));

  const shouldShowSpaceBeforeMessage = debug.length || tag.length || time.length;

  console.debug(`${debug}${tag}${time}${shouldShowSpaceBeforeMessage ? ' ' : ''}${message}`, formattedData);
};
