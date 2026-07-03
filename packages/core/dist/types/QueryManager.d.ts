export const Priority: Readonly<{
    High: 0;
    Normal: 1;
    Low: 2;
}>;
export class QueryManager {
    constructor(maxConcurrentRequests?: number);
    /** @type {PriorityQueue} */
    queue: PriorityQueue;
    db: any;
    clientCache: any;
    _logger: {
        debug(..._: any[]): void;
        info(..._: any[]): void;
        log(..._: any[]): void;
        warn(..._: any[]): void;
        error(..._: any[]): void;
    };
    _logQueries: boolean;
    _consolidate: {
        add(entry: any, priority: any): void;
    };
    /**
     * Requests pending with the query manager.
     * @type {QueryResult[]}
     */
    pendingResults: QueryResult[];
    /** @type {number} */
    maxConcurrentRequests: number;
    /** @type {boolean} */
    pendingExec: boolean;
    next(): void;
    /**
     * Add an entry to the query queue with a priority.
     * @param {object} entry The entry to add.
     * @param {*} [entry.request] The query request.
     * @param {QueryResult} [entry.result] The query result.
     * @param {number} priority The query priority, defaults to `Priority.Normal`.
     */
    enqueue(entry: {
        request?: any;
        result?: QueryResult;
    }, priority?: number): void;
    /**
     * Submit the query to the connector.
     * @param {*} request The request.
     * @param {QueryResult} result The query result.
     */
    submit(request: any, result: QueryResult): Promise<void>;
    cache(value: any): any;
    logger(value: any): any;
    logQueries(value: any): boolean;
    connector(connector: any): any;
    consolidate(flag: any): void;
    /**
     * Request a query result.
     * @param {*} request The request.
     * @param {number} priority The query priority, defaults to `Priority.Normal`.
     * @returns {QueryResult} A query result promise.
     */
    request(request: any, priority?: number): QueryResult;
    cancel(requests: any): void;
    clear(): void;
}
import { PriorityQueue } from './util/priority-queue.js';
import { QueryResult } from './util/query-result.js';
