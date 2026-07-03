/**
 * Create a new interval.
 * @param {string} unit The interval unit, such as day or year.
 * @param {number} steps The number interval unit steps.
 * @returns {IntervalNode}
 */
export function interval(unit: string, steps: number): IntervalNode;
/**
 * Given a date/time value, return the milliseconds since the UNIX epoch.
 * @param {import('../types.js').ExprValue} expr The date/time expression.
 * @returns {FunctionNode}
 */
export function epoch_ms(expr: import("../types.js").ExprValue): FunctionNode;
/**
 * Perform data binning according to the provided interval unit and steps.
 * @param {import('../types.js').ExprValue} expr The date/time expression to bin.
 * @param {string} unit The datetime interval unit to bin by.
 * @param {number} [steps=1] The number of interval steps.
 * @returns {FunctionNode}
 */
export function dateBin(expr: import("../types.js").ExprValue, unit: string, steps?: number): FunctionNode;
/**
 * Map date/times to a month value, all within the same year for comparison.
 * The resulting value is still date-typed.
 * @param {import('../types.js').ExprValue} expr The date/time expression.
 * @returns {FunctionNode}
 */
export function dateMonth(expr: import("../types.js").ExprValue): FunctionNode;
/**
 * Map date/times to a month and day value, all within the same year for
 * comparison. The resulting value is still date-typed.
 * @param {import('../types.js').ExprValue} expr The date/time expression.
 * @returns {FunctionNode}
 */
export function dateMonthDay(expr: import("../types.js").ExprValue): FunctionNode;
/**
 * Map date/times to a day of the month value, all within the same year and month
 * for comparison. The resulting value is still date-typed.
 * @param {import('../types.js').ExprValue} expr The date/time expression.
 * @returns {FunctionNode}
 */
export function dateDay(expr: import("../types.js").ExprValue): FunctionNode;
import { IntervalNode } from '../ast/interval.js';
import { FunctionNode } from '../ast/function.js';
