/**
 * Function that returns true if a string contains a regexp pattern,
 * false otherwise.
 * @param {import('../types.js').ExprValue} string The string match against.
 * @param {import('../types.js').StringValue} pattern The regular expression pattern to match.
 * @param {import('../types.js').StringValue} [options] Regular expression options:
 *  'c': case-sensitive matching
 *  'i': case-insensitive matching
 *  'l': match literals instead of regular expression tokens
 *  'm', 'n', 'p': newline sensitive matching
 *  'g': global replace, only available for regexp_replace
 *  's': non-newline sensitive matching
 * @returns {FunctionNode}
 */
export function regexp_matches(string: import("../types.js").ExprValue, pattern: import("../types.js").StringValue, options?: import("../types.js").StringValue): FunctionNode;
/**
 * Function that returns true if search_string is found within string.
 * @param {import('../types.js').ExprValue} string The string to match against.
 * @param {import('../types.js').StringValue} search_string The substring to search for.
 * @returns {FunctionNode}
 */
export function contains(string: import("../types.js").ExprValue, search_string: import("../types.js").StringValue): FunctionNode;
/**
 * Function that returns true if string begins with search_string.
 * @param {import('../types.js').ExprValue} string The string to match against.
 * @param {import('../types.js').StringValue} search_string The substring to search for.
 * @returns {FunctionNode}
 */
export function prefix(string: import("../types.js").ExprValue, search_string: import("../types.js").StringValue): FunctionNode;
/**
 * Function that returns true if string ends with search_string.
 * @param {import('../types.js').ExprValue} string The string to match against.
 * @param {import('../types.js').StringValue} search_string The substring to search for.
 * @returns {FunctionNode}
 */
export function suffix(string: import("../types.js").ExprValue, search_string: import("../types.js").StringValue): FunctionNode;
/**
 * Function that converts string to lower case.
 * @param {import('../types.js').ExprValue} string The string to convert.
 * @returns {FunctionNode}
 */
export function lower(string: import("../types.js").ExprValue): FunctionNode;
/**
 * Function that converts string to upper case.
 * @param {import('../types.js').ExprValue} string The string to convert.
 * @returns {FunctionNode}
 */
export function upper(string: import("../types.js").ExprValue): FunctionNode;
/**
 * Function that returns the number of characters in string.
 * @param {import('../types.js').ExprValue} value The string to measure.
 * @returns {FunctionNode}
 */
export function length(value: import("../types.js").ExprValue): FunctionNode;
import { FunctionNode } from '../ast/function.js';
