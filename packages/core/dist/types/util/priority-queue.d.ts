export class PriorityQueue {
    /**
     * Create a new priority queue instance.
     * @param {number} ranks An integer number of rank-order priority levels.
     */
    constructor(ranks: number);
    queue: {
        head: any;
        tail: any;
    }[];
    /**
     * Indicate if the queue is empty.
     * @returns {boolean} true if empty, false otherwise.
     */
    isEmpty(): boolean;
    /**
     * Insert an item into the queue with a given priority rank.
     * @param {*} item The item to add.
     * @param {number} rank The integer priority rank.
     * Priority ranks are integers starting at zero.
     * Lower ranks indicate higher priority.
     */
    insert(item: any, rank: number): void;
    /**
     * Remove a set of items from the queue, regardless of priority rank.
     * If a provided item is not in the queue it will be ignored.
     * @param {(item: *) => boolean} test A predicate function to test
     * if an item should be removed (true to drop, false to keep).
     */
    remove(test: (item: any) => boolean): void;
    /**
     * Remove and return the next highest priority item.
     * @returns {*} The next item in the queue,
     * or undefined if this queue is empty.
     */
    next(): any;
}
