/**
 * Return true if the floating point value is not a number, false otherwise.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function isNaN(expr: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
/**
 * Return true if the floating point value is finite, false otherwise.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function isFinite(expr: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
/**
 * Return true if the floating point value is infinite, false otherwise.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function isInfinite(expr: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
/**
 * Selects the largest value.
 * @param {...import('../types.js').ExprValue} expr The input expressions.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function greatest(...expr: import("../types.js").ExprValue[]): import("../ast/function.js").FunctionNode;
/**
 * Selects the smallest value.
 * @param {...import('../types.js').ExprValue} expr The input expressions.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function least(...expr: import("../types.js").ExprValue[]): import("../ast/function.js").FunctionNode;
/**
 * Compute the exponentional function `e ** expr`.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function exp(expr: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
/**
 * Compute a base 10 logarithm.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function log(expr: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
/**
 * Compute a natural logarithm.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function ln(expr: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
/**
 * Compute the sign of a number.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function sign(expr: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
/**
 * Compute the absolute value of a number.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function abs(expr: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
/**
 * Compute the square root of a number.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function sqrt(expr: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
/**
 * Rounds the number up.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function ceil(expr: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
/**
 * Rounds the number down.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function floor(expr: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
/**
 * Round to the given decimal places.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @param {import('../types.js').ExprValue} [places] The decimal places.
 *  Negative values are allowed, to round to tens, hundreds, etc.
 *  If unspecified, defaults to zero.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function round(expr: import("../types.js").ExprValue, places?: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
/**
 * Truncates the number.
 * @param {import('../types.js').ExprValue} expr The input number.
 * @returns {import('../ast/function.js').FunctionNode}
 */
export function trunc(expr: import("../types.js").ExprValue): import("../ast/function.js").FunctionNode;
