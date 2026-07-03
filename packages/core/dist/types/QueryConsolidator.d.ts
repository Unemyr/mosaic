/**
 * Create a consolidator to combine structurally compatible queries.
 * @param {*} enqueue Query manager enqueue method
 * @param {*} cache Client-side query cache (sql -> data)
 * @returns A consolidator object
 */
export function consolidator(enqueue: any, cache: any): {
    add(entry: any, priority: any): void;
};
