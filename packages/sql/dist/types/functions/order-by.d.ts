/**
 * Indicate ascending sort order for an expression.
 * @param {import('../types.js').ExprValue} expr An expression to order by.
 * @param {boolean | undefined} [nullsFirst] Flag indicating if null values
 *  should be sorted first.
 * @returns {OrderByNode}
 */
export function asc(expr: import("../types.js").ExprValue, nullsFirst?: boolean | undefined): OrderByNode;
/**
 * Indicate descending sort order for an expression.
 * @param {import('../types.js').ExprValue} expr An expression to order by.
 * @param {boolean | undefined} [nullsFirst] Flag indicating if null values
 *  should be sorted first.
 * @returns {OrderByNode}
 */
export function desc(expr: import("../types.js").ExprValue, nullsFirst?: boolean | undefined): OrderByNode;
import { OrderByNode } from '../ast/order-by.js';
