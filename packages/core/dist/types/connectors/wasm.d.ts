export function wasmConnector(options?: {}): {
    getDuckDB: () => Promise<duckdb.AsyncDuckDB>;
    getConnection: () => Promise<duckdb.AsyncDuckDBConnection>;
    /**
     * Query the DuckDB-WASM instance.
     * @param {object} query
     * @param {'exec' | 'arrow' | 'json'} [query.type] The query type.
     * @param {string} query.sql A SQL query string.
     * @returns the query result
     */
    query: (query: {
        type?: "exec" | "arrow" | "json";
        sql: string;
    }) => Promise<import("@uwdata/flechette").Table | Record<string, any>[]>;
};
import * as duckdb from '@duckdb/duckdb-wasm';
