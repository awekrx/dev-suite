import { Enabled } from '$core/types/debug-fn-enabled';
import { StrictUndefined } from '$core/types/strict-undefined';

export const resolveEnabled = (enabled: StrictUndefined<Enabled>): boolean => {
  if (typeof enabled === 'function') {
    try {
      return !!enabled();
    } catch {
      return false;
    }
  }

  return enabled ?? true;
};
