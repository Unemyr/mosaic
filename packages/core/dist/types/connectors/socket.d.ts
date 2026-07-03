export function socketConnector(uri?: string): {
    readonly connected: boolean;
    /**
     * Query the DuckDB server.
     * @param {object} query
     * @param {'exec' | 'arrow' | 'json' | 'create-bundle' | 'load-bundle'} [query.type] The query type.
     * @param {string} [query.sql] A SQL query string.
     * @param {string[]} [query.queries] The queries used to create a bundle.
     * @param {string} [query.name] The name of a bundle to create or load.
     * @returns the query result
     */
    query(query: {
        type?: "exec" | "arrow" | "json" | "create-bundle" | "load-bundle";
        sql?: string;
        queries?: string[];
        name?: string;
    }): Promise<any>;
};
