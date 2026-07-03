/**
 * Perform a type cast.
 * @param {*} expr The expression to type cast.
 * @param {string} type The type to cast to.
 * @returns {CastNode}
 */
export function cast(expr: any, type: string): CastNode;
/**
 * Cast an expression to a 32-bit integer type.
 * @param {*} expr The expression to type cast.
 * @returns {CastNode}
 */
export function int32(expr: any): CastNode;
/**
 * Cast an expression to a 32-bit floating point number type.
 * @param {*} expr The expression to type cast.
 * @returns {CastNode}
 */
export function float32(expr: any): CastNode;
/**
 * Cast an expression to a 64-bit floating point number type.
 * @param {*} expr The expression to type cast.
 * @returns {CastNode}
 */
export function float64(expr: any): CastNode;
import { CastNode } from '../ast/cast.js';
