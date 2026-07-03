/**
 * Create a new synchronizer instance to aid synchronization
 * of updates on multiple pending operations.
 */
export function synchronizer(): {
    /**
     * Mark an item as pending.
     * @param {*} item An item to synchronize on.
     */
    pending(item: any): void;
    /**
     * Mark a pending item as ready, indicating it is
     * ready for a synchronized update.
     * @param {*} item An item to synchronize on.
     * @returns {boolean} True if the synchronizer is ready to
     *  resolve, false otherwise.
     */
    ready(item: any): boolean;
    /**
     * Resolve the current synchronization cycle, causing the synchronize
     * promise to resolve and thereby trigger downstream updates.
     */
    resolve(): void;
    /**
     * The promise for the current synchronization cycle.
     * @return {Promise} The synchronization promise.
     */
    readonly promise: Promise<any>;
};
