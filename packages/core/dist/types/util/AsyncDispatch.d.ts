/**
 * Event dispatcher supporting asynchronous updates. If an event handler
 * callback returns a Promise, the dispatcher waits for all such Promises
 * to settle before dispatching future events of the same type.
 */
export class AsyncDispatch {
    _callbacks: Map<any, any>;
    /**
     * Add an event listener callback for the provided event type.
     * @param {string} type The event type.
     * @param {(value: *) => void | Promise} callback The event handler
     *  callback function to add. If the callback has already been
     *  added for the event type, this method has no effect.
     */
    addEventListener(type: string, callback: (value: any) => void | Promise<any>): void;
    /**
     * Remove an event listener callback for the provided event type.
     * @param {string} type The event type.
     * @param {(value: *) => void | Promise} callback The event handler
     *  callback function to remove.
     */
    removeEventListener(type: string, callback: (value: any) => void | Promise<any>): void;
    /**
     * Lifecycle method that returns the event value to emit.
     * This default implementation simply returns the input value as-is.
     * Subclasses may override this method to implement custom transformations
     * prior to emitting an event value to all listeners.
     * @param {string} type The event type.
     * @param {*} value The event value.
     * @returns The (possibly transformed) event value to emit.
     */
    willEmit(type: string, value: any): any;
    /**
     * Lifecycle method that returns a filter function for updating the
     * queue of unemitted event values prior to enqueueing a new value.
     * This default implementation simply returns null, indicating that
     * any other unemitted event values should be dropped (that is, all
     * queued events are filtered).
     * @param {string} type The event type.
     * @param {*} value The new event value that will be enqueued.
     * @returns {(value: *) => boolean|null} A dispatch queue filter
     *  function, or null if all unemitted event values should be filtered.
     */
    emitQueueFilter(type: string, value: any): (value: any) => boolean | null;
    /**
     * Cancel all unemitted event values for the given event type.
     * @param {string} type The event type.
     */
    cancel(type: string): void;
    /**
     * Returns a promise that resolves when any pending updates complete for
     * the event of the given type currently being processed. The Promise will
     * resolve immediately if the queue for the given event type is empty.
     * @param {string} type The event type to wait for.
     * @returns {Promise} A pending event promise.
     */
    pending(type: string): Promise<any>;
    /**
     * Emit an event value to listeners for the given event type.
     * If a previous emit has not yet resolved, the event value
     * will be queued to be emitted later.
     * The actual event value given to listeners will be the result
     * of passing the input value through the emitValue() method.
     * @param {string} type The event type.
     * @param {*} value The event value.
     */
    emit(type: string, value: any): void;
}
/**
 * Queue for managing unemitted event values.
 */
export class DispatchQueue {
    /**
     * Clear the queue state of all event values.
     */
    clear(): void;
    next: any;
    /**
     * Indicate if the queue is empty.
     * @returns {boolean} True if queue is empty, false otherwise.
     */
    isEmpty(): boolean;
    /**
     * Add a new value to the queue, and optionally filter the
     * current queue content in response.
     * @param {*} value The value to add.
     * @param {(value: *) => boolean} [filter] An optional filter
     *  function to apply to existing queue content. If unspecified
     *  or falsy, all previously queued values are removed. Otherwise,
     *  the provided function is applied to all queue entries. The
     *  entry is retained if the filter function returns a truthy value,
     *  otherwise the entry is removed.
     */
    enqueue(value: any, filter?: (value: any) => boolean): void;
    /**
     * Remove and return the next queued event value.
     * @returns {*} The next event value in the queue.
     */
    dequeue(): any;
}
