/**
 * @typedef {Array | Int8Array | Uint8Array | Uint8ClampedArray
 *  | Int16Array | Uint16Array | Int32Array | Uint32Array
 *  | Float32Array | Float64Array
 * } Arrayish - an Array or TypedArray
 */
/**
 * @typedef {
 *  | { numRows: number, columns: Record<string,Arrayish> }
 *  | { numRows: number, values: Arrayish; }
 * } DataColumns
*/
/**
 * Convert input data to a set of column arrays.
 * @param {any} data The input data.
 * @returns {DataColumns} An object with named column arrays.
 */
export function toDataColumns(data: any): DataColumns;
/**
 * - an Array or TypedArray
 */
export type Arrayish = any[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
export type DataColumns = any | {
    numRows: number;
    columns: Record<string, Arrayish>;
} | {
    numRows: number;
    values: Arrayish;
};
