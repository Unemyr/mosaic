/**
 * Set or retrieve the coordinator instance.
 * @param {Coordinator} [instance] the coordinator instance to set
 * @returns {Coordinator} the coordinator instance
 */
export function coordinator(instance?: Coordinator): Coordinator;
/**
 * A Mosaic Coordinator manages all database communication for clients and
 * handles selection updates. The Coordinator also performs optimizations
 * including query caching, consolidation, and pre-aggregation.
 * @param {*} [db] Database connector. Defaults to a web socket connection.
 * @param {object} [options] Coordinator options.
 * @param {*} [options.logger=console] The logger to use, defaults to `console`.
 * @param {*} [options.manager] The query manager to use.
 * @param {boolean} [options.cache=true] Boolean flag to enable/disable query caching.
 * @param {boolean} [options.consolidate=true] Boolean flag to enable/disable query consolidation.
 * @param {import('./preagg/PreAggregator.js').PreAggregateOptions} [options.preagg]
 *  Options for the Pre-aggregator.
 */
export class Coordinator {
    constructor(db?: {
        readonly connected: boolean;
        query(query: {
            type?: "exec" | "arrow" | "json" | "create-bundle" | "load-bundle";
            sql?: string;
            queries?: string[];
            name?: string;
        }): Promise<any>;
    }, { logger, manager, cache, consolidate, preagg }?: {
        logger?: Console;
        manager?: QueryManager;
        cache?: boolean;
        consolidate?: boolean;
        preagg?: {};
    });
    /** @type {QueryManager} */
    manager: QueryManager;
    preaggregator: PreAggregator;
    /**
     * Clear the coordinator state.
     * @param {object} [options] Options object.
     * @param {boolean} [options.clients=true] If true, disconnect all clients.
     * @param {boolean} [options.cache=true] If true, clear the query cache.
     */
    clear({ clients, cache }?: {
        clients?: boolean;
        cache?: boolean;
    }): void;
    filterGroups: Map<any, any>;
    clients: Set<any>;
    /**
     * Get or set the database connector.
     * @param {*} [db] The database connector to use.
     * @returns The current database connector.
     */
    databaseConnector(db?: any): any;
    /**
     * Get or set the logger.
     * @param {*} logger  The logger to use.
     * @returns The current logger
     */
    logger(logger: any, ...args: any[]): any;
    _logger: any;
    /**
     * Cancel previosuly submitted query requests. These queries will be
     * canceled if they are queued but have not yet been submitted.
     * @param {QueryResult[]} requests An array
     *  of query result objects, such as those returned by the `query` method.
     */
    cancel(requests: QueryResult[]): void;
    /**
     * Issue a query for which no result (return value) is needed.
     * @param { import('./types.js').QueryType[] |
     *  import('./types.js').QueryType} query The query or an array of queries.
     *  Each query should be either a Query builder object or a SQL string.
     * @param {object} [options] An options object.
     * @param {number} [options.priority] The query priority, defaults to
     *  `Priority.Normal`.
     * @returns {QueryResult} A query result promise.
     */
    exec(query: import("./types.js").QueryType[] | import("./types.js").QueryType, { priority }?: {
        priority?: number;
    }): QueryResult;
    /**
     * Issue a query to the backing database. The submitted query may be
     * consolidate with other queries and its results may be cached.
     * @param {import('./types.js').QueryType} query The query as either a Query
     *  builder object or a SQL string.
     * @param {object} [options] An options object.
     * @param {'arrow' | 'json'} [options.type] The query result format type.
     * @param {boolean} [options.cache=true] If true, cache the query result
     *  client-side within the QueryManager.
     * @param {boolean} [options.persist] If true, request the database
     *  server to persist a cached query server-side.
     * @param {number} [options.priority] The query priority, defaults to
     *  `Priority.Normal`.
     * @returns {QueryResult} A query result promise.
     */
    query(query: import("./types.js").QueryType, { type, cache, priority, ...options }?: {
        type?: "arrow" | "json";
        cache?: boolean;
        persist?: boolean;
        priority?: number;
    }): QueryResult;
    /**
     * Issue a query to prefetch data for later use. The query result is cached
     * for efficient future access.
     * @param {import('./types.js').QueryType} query The query as either a Query
     *  builder object or a SQL string.
     * @param {object} [options] An options object.
     * @param {'arrow' | 'json'} [options.type] The query result format type.
     * @returns {QueryResult} A query result promise.
     */
    prefetch(query: import("./types.js").QueryType, options?: {
        type?: "arrow" | "json";
    }): QueryResult;
    /**
     * Create a bundle of queries that can be loaded into the cache.
     *
     * @param {string} name The name of the bundle.
     * @param {[string | {sql: string},  {alias: string}]} queries The queries to save into the bundle.
     * @param {number} priority Request priority.
     * @returns {QueryResult} A query result promise.
     */
    createBundle(name: string, queries: [string | {
        sql: string;
    }, {
        alias: string;
    }], priority?: number): QueryResult;
    /**
     * Load a bundle into the cache.
     * @param {string} name The name of the bundle.
     * @param {number} priority Request priority.
     * @returns {QueryResult} A query result promise.
     */
    loadBundle(name: string, priority?: number): QueryResult;
    /**
     * Update client data by submitting the given query and returning the
     * data (or error) to the client.
     * @param {MosaicClient} client A Mosaic client.
     * @param {import('./types.js').QueryType} query The data query.
     * @param {number} [priority] The query priority.
     * @returns {Promise} A Promise that resolves upon completion of the update.
     */
    updateClient(client: MosaicClient, query: import("./types.js").QueryType, priority?: number): Promise<any>;
    /**
     * Issue a query request for a client. If the query is null or undefined,
     * the client is simply updated. Otherwise `updateClient` is called. As a
     * side effect, this method clears the current preaggregator state.
     * @param {MosaicClient} client The client to update.
     * @param {import('./types.js').QueryType | null} [query] The query to issue.
     */
    requestQuery(client: MosaicClient, query?: import("./types.js").QueryType | null): Promise<any>;
    /**
     * Connect a client to the coordinator.
     * @param {MosaicClient} client The Mosaic client to connect.
     */
    connect(client: MosaicClient): Promise<void>;
    initializeClient(client: any): Promise<any>;
    /**
     * Disconnect a client from the coordinator.
     * @param {MosaicClient} client The Mosaic client to disconnect.
     */
    disconnect(client: MosaicClient): void;
}
import { QueryManager } from './QueryManager.js';
import { PreAggregator } from './preagg/PreAggregator.js';
import { QueryResult } from './util/query-result.js';
import { MosaicClient } from './MosaicClient.js';
