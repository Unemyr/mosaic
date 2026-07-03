/**
 * Throttle invocations of a callback function. The callback must return
 * a Promise. Upon repeated invocation, the callback will not be invoked
 * until a prior Promise resolves. If multiple invocations occurs while
 * waiting, only the most recent invocation will be pending.
 * @template E, T
 * @param {(event: E) => Promise<T>} callback The callback function.
 * @param {boolean} [debounce=true] Flag indicating if invocations
 *  should also be debounced within the current animation frame.
 * @returns {(event: E) => void} A new function that throttles
 *  access to the callback.
 */
export function throttle<E, T>(callback: (event: E) => Promise<T>, debounce?: boolean): (event: E) => void;
