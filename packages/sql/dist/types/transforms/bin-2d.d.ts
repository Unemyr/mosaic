/**
 * Perform aggregation over a binned 2D domain. This method takes expressions
 * for the (non-truncated) x and y bin values; these expressions should be
 * in units of grid indices, but can contain fractional components. The
 * resulting query performs grouping and aggregation over the binned domain,
 * and uses a 2D integer bin index of the form (xbin + num_xbins * ybin).
 * @param {SelectQuery} q The input query. The FROM and WHERE clauses should
 *  be added to the query separately, either before or after this method.
 * @param {import('../types.js').ExprValue} xp The x bin expression.
 * @param {import('../types.js').ExprValue} yp The y bin expression.
 * @param {Record<string, import('../types.js').ExprValue>} aggs Named
 *  aggregate expressions over bins.
 * @param {number} xn The number of bins along the x dimension
 * @param {string[]} groupby Group by expressions.
 * @returns {SelectQuery} The input query, with binning expressions added.
 */
export function bin2d(q: SelectQuery, xp: import("../types.js").ExprValue, yp: import("../types.js").ExprValue, aggs: Record<string, import("../types.js").ExprValue>, xn: number, groupby: string[]): SelectQuery;
import { SelectQuery } from '../ast/query.js';
