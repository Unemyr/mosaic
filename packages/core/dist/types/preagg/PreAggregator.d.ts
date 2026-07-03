/**
 * @typedef {object} PreAggregateOptions
 * @property {string} [schema] Database schema (namespace) in which to write
 *  pre-aggregated materialzied views (default 'mosaic').
 * @property {boolean} [options.enabled=true] Flag to enable or disable the
 *  pre-aggregation. This flag can be updated later via the `enabled` property.
 */
/**
 * Build and query optimized pre-aggregated materaialized views, for fast
 * computation of groupby aggregate queries over compatible client queries
 * and selections. The materialized views contains pre-aggregated data for a
 * Mosaic client, subdivided by possible query values from an active selection
 * clause. These materialized views are database tables that can be queried
 * for rapid updates.
 *
 * Compatible client queries must consist of only groupby dimensions and
 * supported aggregate functions. Compatible selections must contain an active
 * clause that exposes metadata for an interval or point value predicate.
 *
 * Materialized views are written to a dedicated schema (namespace) that
 * can be set using the *schema* constructor option. This schema acts as a
 * persistent cache, and materialized view tables may be used across sessions.
 * The `dropSchema` method issues a query to remove *all* tables within this
 * schema. This may be needed if the original tables have updated data, but
 * should be used with care.
 */
export class PreAggregator {
    /**
     * Create a new manager of materialized views of pre-aggregated data.
     * @param {import('../Coordinator.js').Coordinator} coordinator A Mosaic coordinator.
     * @param {PreAggregateOptions} [options] Pre-aggregation options.
     */
    constructor(coordinator: import("../Coordinator.js").Coordinator, { schema, enabled }?: PreAggregateOptions);
    /** @type {Map<import('../MosaicClient.js').MosaicClient, PreAggregateInfo | Skip | null>} */
    entries: Map<import("../MosaicClient.js").MosaicClient, PreAggregateInfo | {
        skip: boolean;
        result: any;
    } | null>;
    active: any;
    mc: import("../Coordinator.js").Coordinator;
    _schema: string;
    _enabled: boolean;
    /**
     * Set the enabled state of this manager. If false, any local state is
     * cleared and subsequent request calls will return null until re-enabled.
     * This method has no effect on any pre-aggregated tables already in the
     * database.
     * @param {boolean} [state] The enabled state to set.
     */
    set enabled(state: boolean);
    /**
     * Get the enabled state of this manager.
     * @returns {boolean} The current enabled state.
     */
    get enabled(): boolean;
    /**
     * Set the database schema used for pre-aggregated materialized view tables.
     * Upon changes, any local state is cleared. This method does _not_ drop any
     * existing materialized views, use `dropSchema` before changing the schema
     * to also remove existing materalized views in the database.
     * @param {string} [schema] The schema name to set.
     */
    set schema(schema: string);
    /**
     * Get the database schema used for pre-aggregated materialized view tables.
     * @returns {string} The current schema name.
     */
    get schema(): string;
    /**
     * Issues a query through the coordinator to drop the current schema for
     * pre-aggregated materialized views. *All* materialized view tables in the
     * schema will be removed and local state is cleared. Call this method if
     * the underlying base tables have been updated, causing materialized view
     * to become stale and inaccurate. Use this method with care! Once dropped,
     * the schema will be repopulated by future pre-aggregation requests.
     * @returns A query result promise.
     */
    dropSchema(): import("../util/query-result.js").QueryResult;
    /**
     * Clear the cache of pre-aggregation entries for the current active
     * selection clause. This method does _not_ drop any existing materialized
     * views. Use `dropSchema` to remove existing materialized view tables from
     * the database.
     */
    clear(): void;
    /**
     * Return pre-aggregation information for the active state of a
     * client-selection pair, or null if the client has unstable filters.
     * This method has multiple possible side effects, including materialized
     * view creation and updating internal caches.
     * @param {import('../MosaicClient.js').MosaicClient} client A Mosaic client.
     * @param {import('../Selection.js').Selection} selection A Mosaic selection
     *  to filter the client by.
     * @param {import('../util/selection-types.js').SelectionClause} activeClause
     *  A representative active selection clause for which to (possibly) generate
     *  materialized views of pre-aggregates.
     * @returns {PreAggregateInfo | Skip | null} Information and query generator
     * for pre-aggregated tables, or null if the client has unstable filters.
     */
    request(client: import("../MosaicClient.js").MosaicClient, selection: import("../Selection.js").Selection, activeClause: import("../util/selection-types.js").SelectionClause): PreAggregateInfo | {
        skip: boolean;
        result: any;
    } | null;
}
/**
 * Metadata and query generator for materialized views of pre-aggregated data.
 * This object provides the information needed to generate and query the
 * materialized views for a client-selection pair relative to a specific
 * active clause and selection state.
 */
export class PreAggregateInfo {
    /**
     * Create a new pre-aggregation information instance.
     * @param {object} options Options object.
     * @param {string} options.table The materialized view table name.
     * @param {string} options.create The table creation query.
     * @param {*} options.active Active column information.
     * @param {SelectQuery} options.select Base query for requesting updates
     *  using a pre-aggregated materialized view.
     */
    constructor({ table, create, active, select }: {
        table: string;
        create: string;
        active: any;
        select: SelectQuery;
    });
    /**
     * The name of the materialized view.
     * @type {string}
     */
    table: string;
    /**
     * The SQL query used to generate the materialized view.
     * @type {string}
     */
    create: string;
    /**
     * A result promise returned for the materialized view creation query.
     * @type {Promise | null}
     */
    result: Promise<any> | null;
    /**
     * Definitions and predicate function for the active columns,
     * which are dynamically filtered by the active clause.
     */
    active: any;
    /**
     * Select query (sans where clause) for materialized views.
     * @type {SelectQuery}
     */
    select: SelectQuery;
    /**
     * Boolean flag indicating a client that should be skipped.
     * This value is always false for a created materialized view.
     * @type {boolean}
     */
    skip: boolean;
    /**
     * Generate a materialized view query for the given predicate.
     * @param {import('@uwdata/mosaic-sql').ExprNode} predicate The current
     *  active clause predicate.
     * @returns {SelectQuery} A materialized view query.
     */
    query(predicate: import("@uwdata/mosaic-sql").ExprNode): SelectQuery;
}
export type PreAggregateOptions = {
    /**
     * Database schema (namespace) in which to write
     * pre-aggregated materialzied views (default 'mosaic').
     */
    schema?: string;
    /**
     * Flag to enable or disable the
     * pre-aggregation. This flag can be updated later via the `enabled` property.
     */
    enabled?: boolean;
};
import { SelectQuery } from '@uwdata/mosaic-sql';
