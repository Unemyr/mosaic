/**
 * M4 is an optimization for value-preserving time-series aggregation
 * (https://www.vldb.org/pvldb/vol7/p797-jugel.pdf). This implementation uses
 * an efficient version with a single scan and the aggregate functions
 * argmin and argmax, following https://arxiv.org/pdf/2306.03714.pdf.
 * This method can bin along either the *x* or *y* dimension, as determined
 * by the caller-provided *bin* expression.
 * @param {import('../types.js').FromExpr} input The base query or table.
 * @param {import('../types.js').ExprValue} bin An expression that maps
 *  time-series values to fractional pixel positions.
 * @param {string} x The x dimension column name.
 * @param {string} y The y dimension column name.
 * @param {import('../ast/node.js').ExprNode[]} [groups] Additional
 *  groupby columns, for example for faceted charts.
 * @returns {Query} The resulting M4 query.
 */
export function m4(input: import("../types.js").FromExpr, bin: import("../types.js").ExprValue, x: string, y: string, groups?: import("../ast/node.js").ExprNode[]): Query;
import { Query } from '../ast/query.js';
