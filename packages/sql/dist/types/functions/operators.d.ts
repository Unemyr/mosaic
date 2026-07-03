/**
 * Logical and (AND) operator.
 * @param {...import('../types.js').ExprVarArgs} clauses The input expressions.
 * @returns {AndNode}
 */
export function and(...clauses: import("../types.js").ExprVarArgs[]): AndNode<any>;
/**
 * Logical or (OR) operator.
 * @param {...import('../types.js').ExprVarArgs} clauses The input expressions.
 * @returns {OrNode}
 */
export function or(...clauses: import("../types.js").ExprVarArgs[]): OrNode<any>;
/**
 * Logical not (NOT) operator.
 * @param {import('../types.js').ExprValue} expr The expression to negate.
 * @returns {UnaryOpNode}
 */
export function not(expr: import("../types.js").ExprValue): UnaryOpNode;
/**
 * Null check (IS NULL) operator.
 * @param {import('../types.js').ExprValue} expr The expression to test.
 * @returns {UnaryPosftixOpNode}
 */
export function isNull(expr: import("../types.js").ExprValue): UnaryPosftixOpNode;
/**
 * Non-null check (IS NOT NULL) operator.
 * @param {import('../types.js').ExprValue} expr The expression to test.
 * @returns {UnaryPosftixOpNode}
 */
export function isNotNull(expr: import("../types.js").ExprValue): UnaryPosftixOpNode;
/**
 * Bitwise not (~) operator.
 * @param {import('../types.js').ExprValue} expr The input expression.
 * @returns {UnaryOpNode}
 */
export function bitNot(expr: import("../types.js").ExprValue): UnaryOpNode;
/**
 * Bitwise and (&) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function bitAnd(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Bitwise or (|) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function bitOr(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Bit shift left (<<) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function bitLeft(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Bit shift right (>>) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function bitRight(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Addition (+) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function add(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Subtraction (-) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function sub(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Multiplication (*) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function mul(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Division (/) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function div(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Integer division (//) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function idiv(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Modulo (%) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function mod(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Exponentiation (**) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function pow(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Equality comparision (=) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function eq(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Non-equality comparision (<>) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function neq(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Less-than comparision (<) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function lt(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Greater-than comparision (>) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function gt(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Less-than or equal comparision (<=) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function lte(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Greater-than or equal comparision (>=) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function gte(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Null-inclusive non-equality (IS DISTINCT FROM) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function isDistinct(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Null-inclusive equality (IS NOT DISTINCT FROM) operator.
 * @param {import('../types.js').ExprValue} left The left argument.
 * @param {import('../types.js').ExprValue} right The right argument.
 * @returns {BinaryOpNode}
 */
export function isNotDistinct(left: import("../types.js").ExprValue, right: import("../types.js").ExprValue): BinaryOpNode;
/**
 * Range inclusion (BETWEEN) operator.
 * @param {import('../types.js').ExprValue} expr The expression to test.
 * @param {import('../types.js').ExprValue[]} extent The range extent.
 * @returns {BetweenOpNode}
 */
export function isBetween(expr: import("../types.js").ExprValue, extent: import("../types.js").ExprValue[]): BetweenOpNode;
/**
 * Range exclusion (NOT BETWEEN) operator.
 * @param {import('../types.js').ExprValue} expr The expression to test.
 * @param {import('../types.js').ExprValue[]} extent The range extent.
 * @returns {NotBetweenOpNode}
 */
export function isNotBetween(expr: import("../types.js").ExprValue, extent: import("../types.js").ExprValue[]): NotBetweenOpNode;
/**
 * Set inclusion (IN) operator.
 * @param {import('../types.js').ExprValue} expr The expression to test.
 * @param {import('../types.js').ExprValue[]} values The included values.
 * @returns {InOpNode}
 */
export function isIn(expr: import("../types.js").ExprValue, values: import("../types.js").ExprValue[]): InOpNode;
import { AndNode } from '../ast/logical-op.js';
import { OrNode } from '../ast/logical-op.js';
import { UnaryOpNode } from '../ast/unary-op.js';
import { UnaryPosftixOpNode } from '../ast/unary-op.js';
import { BinaryOpNode } from '../ast/binary-op.js';
import { BetweenOpNode } from '../ast/between-op.js';
import { NotBetweenOpNode } from '../ast/between-op.js';
import { InOpNode } from '../ast/in-op.js';
