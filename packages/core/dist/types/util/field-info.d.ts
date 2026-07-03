/**
 * Queries information about fields of a table.
 * If the `fields` array contains a single field with the column set to '*',
 * the function will retrieve and return the table information using `getTableInfo`.
 * Otherwise, it will query individual field information using `getFieldInfo`
 * for each field in the `fields` array.
 * @param {import('../Coordinator.js').Coordinator} mc A Mosaic coordinator.
 * @param {import('../types.js').FieldInfoRequest[]} fields
 * @returns {Promise<import('../types.js').FieldInfo[]>}
 */
export function queryFieldInfo(mc: import("../Coordinator.js").Coordinator, fields: import("../types.js").FieldInfoRequest[]): Promise<import("../types.js").FieldInfo[]>;
export const Count: "count";
export const Nulls: "nulls";
export const Max: "max";
export const Min: "min";
export const Distinct: "distinct";
export namespace Stats {
    export { Count };
    export { Nulls };
    export { Max };
    export { Min };
    export { Distinct };
}
