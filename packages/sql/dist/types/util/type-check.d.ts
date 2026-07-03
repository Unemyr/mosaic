/**
 * Check if a value is a string.
 * @param {*} value The value to check.
 * @returns {value is string}
 */
export function isString(value: any): value is string;
/**
 * Check if a value is an array.
 * @param {*} value The value to check.
 * @returns {value is Array}
 */
export function isArray(value: any): value is any[];
/**
 * Check if a value is a dynamic parameter.
 * @param {*} value The value to check.
 * @returns {value is import('../types.js').ParamLike}
 */
export function isParamLike(value: any): value is import("../types.js").ParamLike;
