/**
 * Compute densities over a 2D domain using linear binning. The weight of
 * each data point is linearly distributed over adjacent bins, providing
 * a better base for subsequent kernel density estimation. This method takes
 * expressions for the (non-truncated) x and y bin values; these expressions
 * should be in units of grid indices, but can contain fractional components.
 * @param {SelectQuery} q The input query. The FROM and WHERE clauses should
 *  be added to the query separately, before this method is invoked.
 * @param {import('../types.js').ExprValue} xp The x grid bin expression
 * @param {import('../types.js').ExprValue} yp The y grid bin expression
 * @param {import('../types.js').ExprValue | undefined} weight Point weights.
 * @param {number} xn The number of x grid bins.
 * @param {string[]} [groupby] Group by expressions.
 * @returns {SelectQuery} A linear binning query for bin `index` and
 *  aggregate `density` columns, in addition to any group by expressions.
 */
export function binLinear2d(q: SelectQuery, xp: import("../types.js").ExprValue, yp: import("../types.js").ExprValue, weight: import("../types.js").ExprValue | undefined, xn: number, groupby?: string[]): SelectQuery;
import { SelectQuery } from '../ast/query.js';
