/**
 * Create a SQL query that embeds the given data for loading.
 * @param {*} data The dataset as an array of objects.
 * @param {object} [options] Loading options.
 * @param {string[]|object} [options.columns] The columns to include.
 *   If not specified, the keys of the first data object are used.
 * @returns {string} SQL query string to load data.
 */
export function sqlFrom(data: any, { columns }?: {
    columns?: string[] | object;
}): string;
