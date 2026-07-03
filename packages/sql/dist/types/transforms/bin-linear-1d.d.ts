/**
 * Perform linear binning in one dimension.
 * @param {import('../ast/query.js').SelectQuery} query The base query to bin.
 * @param {import('../types.js').ExprValue} x The expression to bin.
 * @param {import('../types.js').ExprValue} [weight] The expression to weight by.
 * @param {string[]} [groupby] Group by expressions.
 * @returns {Query}
 */
export function binLinear1d(query: import("../ast/query.js").SelectQuery, x: import("../types.js").ExprValue, weight?: import("../types.js").ExprValue, groupby?: string[]): Query;
import { Query } from '../ast/query.js';
