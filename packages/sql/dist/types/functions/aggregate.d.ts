/**
 * Compute an arg_max aggregate.
 * @param {import('../types.js').ExprValue} y The argument to return.
 * @param {import('../types.js').ExprValue} x The expression to maximize.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function argmax(y: import("../types.js").ExprValue, x: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute an arg_min aggregate.
 * @param {import('../types.js').ExprValue} y The argument to return.
 * @param {import('../types.js').ExprValue} x The expression to minimize.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function argmin(y: import("../types.js").ExprValue, x: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute an array aggregation.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function arrayAgg(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute an average aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function avg(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a correlation aggregate.
 * @param {import('../types.js').ExprValue} x The x expression to aggregate.
 * @param {import('../types.js').ExprValue} y The y expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function corr(x: import("../types.js").ExprValue, y: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a count aggregate.
 * @param {import('../types.js').ExprValue} [expr] An optional expression
 *  to count. If specified, only non-null expression values are counted.
 *  If omitted, all rows within a group are counted.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function count(expr?: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a sample covariance aggregate.
 * @param {import('../types.js').ExprValue} x The x expression to aggregate.
 * @param {import('../types.js').ExprValue} y The y expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function covariance(x: import("../types.js").ExprValue, y: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a population covariance aggregate.
 * @param {import('../types.js').ExprValue} x The x expression to aggregate.
 * @param {import('../types.js').ExprValue} y The y expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function covarPop(x: import("../types.js").ExprValue, y: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute an entropy aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function entropy(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a first aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function first(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a sample kurtosis aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function kurtosis(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a median absolute deviation (MAD) aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function mad(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a maximum aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function max(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a median aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function median(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a minimum aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function min(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a mode aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function mode(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a last aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function last(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a product aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function product(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a quantile aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @param {import('../types.js').ExprValue} p The quantile value.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function quantile(expr: import("../types.js").ExprValue, p: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a linear regression reg_avgX aggregate.
 * @param {import('../types.js').ExprValue} x The x expression to aggregate.
 * @param {import('../types.js').ExprValue} y The y expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function regrAvgX(x: import("../types.js").ExprValue, y: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a linear regression reg_avgY aggregate.
 * @param {import('../types.js').ExprValue} x The x expression to aggregate.
 * @param {import('../types.js').ExprValue} y The y expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function regrAvgY(x: import("../types.js").ExprValue, y: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a linear regression count aggregate.
 * This returns the count of rows where both x and y are non-null.
 * @param {import('../types.js').ExprValue} x The x expression to aggregate.
 * @param {import('../types.js').ExprValue} y The y expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function regrCount(x: import("../types.js").ExprValue, y: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a linear regression intercept aggregate.
 * @param {import('../types.js').ExprValue} x The x expression to aggregate.
 * @param {import('../types.js').ExprValue} y The y expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function regrIntercept(x: import("../types.js").ExprValue, y: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a linear regression R^2 aggregate.
 * @param {import('../types.js').ExprValue} x The x expression to aggregate.
 * @param {import('../types.js').ExprValue} y The y expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function regrR2(x: import("../types.js").ExprValue, y: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a linear regression regr_sxx aggregate.
 * @param {import('../types.js').ExprValue} x The x expression to aggregate.
 * @param {import('../types.js').ExprValue} y The y expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function regrSXX(x: import("../types.js").ExprValue, y: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a linear regression regr_sxy aggregate.
 * @param {import('../types.js').ExprValue} x The x expression to aggregate.
 * @param {import('../types.js').ExprValue} y The y expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function regrSXY(x: import("../types.js").ExprValue, y: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a linear regression regr_syy aggregate.
 * @param {import('../types.js').ExprValue} x The x expression to aggregate.
 * @param {import('../types.js').ExprValue} y The y expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function regrSYY(x: import("../types.js").ExprValue, y: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a linear regression slope aggregate.
 * @param {import('../types.js').ExprValue} x The x expression to aggregate.
 * @param {import('../types.js').ExprValue} y The y expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function regrSlope(x: import("../types.js").ExprValue, y: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a skewness aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function skewness(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a sample standard deviation aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function stddev(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a population standard deviation aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function stddevPop(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a string aggregation.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function stringAgg(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a sum aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function sum(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a sample variance aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function variance(expr: import("../types.js").ExprValue): AggregateNode;
/**
 * Compute a population variance aggregate.
 * @param {import('../types.js').ExprValue} expr The expression to aggregate.
 * @returns {AggregateNode} A SQL aggregate function call.
 */
export function varPop(expr: import("../types.js").ExprValue): AggregateNode;
import { AggregateNode } from '../ast/aggregate.js';
