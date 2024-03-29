import { type MutableRefObject, type Ref, type RefCallback, useCallback } from "react";

/**
 * More efficient version of a mergeRefs function as a hook
 */
function useMergedRef<T = any>(...refs: Ref<T>[]): RefCallback<T> {
  return useCallback((value) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref && typeof ref === "object") {
        (ref as MutableRefObject<T | null>).current = value;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

export default useMergedRef;
