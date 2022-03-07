import { useEffect, useRef } from "react";

/**
 * Capture the previous value of a state or prop.
 * @see https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 * @param {*} value The data whose previous value you wish to track
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/**
 * Create a ref whose current value will be focused when the provided dependencies do not match.
 * @param {Array} deps An array whose elements that will be compared to determine if the hook should run.
 * @param {Boolean} condition The condition that must be met for the hook to execute.
 * @param {Boolean} [needsTabIndex] Whether or not the element targeted by the ref needs `tabindex=-1` in order to be focusable.
 */
export function useRefwithFocus(deps, condition, needsTabIndex) {
  const ref = useRef(null);
  useEffect(() => {
    if (condition) {
      const el = ref.current;
      if (needsTabIndex) el.setAttribute("tabindex", "-1");
      el.focus();
      el.removeAttribute("tabindex");
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, deps);
  return ref;
}
