/**
 * Create a window function that returns the number of the current row
 * within the partition, counting from 1.
 * @returns {WindowNode}
 */
export function row_number(): WindowNode;
/**
 * Create a window function that returns the rank of the current row with gaps.
 * This is the same as the row_number of its first peer.
 * @returns {WindowNode}
 */
export function rank(): WindowNode;
/**
 * Create a window function that returns the rank of the current row without
 * gaps. The function counts peer groups.
 * @returns {WindowNode}
 */
export function dense_rank(): WindowNode;
/**
 * Create a window function that returns the relative rank of the current row.
 * Computed as (rank() - 1) / (total partition rows - 1).
 * @returns {WindowNode}
 */
export function percent_rank(): WindowNode;
/**
 * Create a window function that returns the cumulative distribution. Computed
 * as (number of preceding or peer partition rows) / total partition rows.
 * @returns {WindowNode}
 */
export function cume_dist(): WindowNode;
/**
 * Create a window function that returns an integer ranging from 1 to the
 * argument value, dividing the partition as equally as possible.
 * @param {import('../types.js').NumberValue} num_buckets The number of
 *  quantile buckets.
 * @returns {WindowNode}
 */
export function ntile(num_buckets: import("../types.js").NumberValue): WindowNode;
/**
 * Create a window function that returns the expression evaluated at the row
 * that is offset rows before the current row within the partition.
 * If there is no such row, instead return default (which must be of the same
 * type as the expression). Both offset and default are evaluated with respect
 * to the current row. If omitted, offset defaults to 1 and default to null.
 * @param {import('../types.js').ExprValue} expr The expression to evaluate.
 * @param {import('../types.js').NumberValue} [offset] The row offset
 *  (default `1`).
 * @param {*} [defaultValue] The default value (default `null`).
 * @returns {WindowNode}
 */
export function lag(expr: import("../types.js").ExprValue, offset?: import("../types.js").NumberValue, defaultValue?: any): WindowNode;
/**
 * Create a window function that returns the expression evaluated at the row
 * that is offset rows after the current row within the partition.
 * If there is no such row, instead return default (which must be of the same
 * type as the expression). Both offset and default are evaluated with respect
 * to the current row. If omitted, offset defaults to 1 and default to null.
 * @param {import('../types.js').ExprValue} expr The expression to evaluate.
 * @param {import('../types.js').NumberValue} [offset] The row offset
 *  (default `1`).
 * @param {*} [defaultValue] The default value (default `null`).
 * @returns {WindowNode}
 */
export function lead(expr: import("../types.js").ExprValue, offset?: import("../types.js").NumberValue, defaultValue?: any): WindowNode;
/**
 * Create a window function that returns the expression evaluated at the row
 * that is the first row of the window frame.
 * @param {import('../types.js').ExprValue} expr The expression to evaluate.
 * @returns {WindowNode}
 */
export function first_value(expr: import("../types.js").ExprValue): WindowNode;
/**
 * Create a window function that returns the expression evaluated at the row
 * that is the last row of the window frame.
 * @param {import('../types.js').ExprValue} expr The expression to evaluate.
 * @returns {WindowNode}
 */
export function last_value(expr: import("../types.js").ExprValue): WindowNode;
/**
 * Create a window function that returns the expression evaluated at the
 * nth row of the window frame (counting from 1), or null if no such row.
 * @param {import('../types.js').ExprValue} expr The expression to evaluate.
 * @param {import('../types.js').NumberValue} nth The 1-based window frame index.
 * @returns {WindowNode}
 */
export function nth_value(expr: import("../types.js").ExprValue, nth: import("../types.js").NumberValue): WindowNode;
import { WindowNode } from '../ast/window.js';
