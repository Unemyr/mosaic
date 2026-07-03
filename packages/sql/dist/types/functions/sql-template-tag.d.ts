/**
 * @typedef {import('../ast/node.js').ExprNode
 *  | import('../types.js').ParamLike
 *  | string | number | boolean | Date
 * } TemplateValue
 */
/**
 * Template tag function for SQL fragments. Interpolated values
 * may be strings, other SQL expression objects (such as column
 * references), primitive values, or dynamic parameters.
 * @param {TemplateStringsArray} strings Template string constants.
 * @param {...TemplateValue} exprs Template expression values.
 */
export function sql(strings: TemplateStringsArray, ...exprs: TemplateValue[]): FragmentNode;
export type TemplateValue = import("../ast/node.js").ExprNode | import("../types.js").ParamLike | string | number | boolean | Date;
import { FragmentNode } from '../ast/fragment.js';
