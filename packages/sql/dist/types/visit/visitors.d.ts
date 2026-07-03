/**
 * Indicate if the input AST contains an aggregate expression.
 * The string content of verbatim nodes is analyzed to try to identify
 * unparsed aggregate functions calls within SQL strings.
 * @param {SQLNode} root The root of the AST to search.
 * @returns {number} Return 0 if no aggregate functions are found.
 *  Sets bit 1 if an AggregateFunction instance is found.
 *  Sets bit 2 if an aggregate embedded in verbatim text is found.
 */
export function isAggregateExpression(root: SQLNode): number;
/**
 * Collect all aggregate function nodes.
 * @param {SQLNode} root The root of the AST to search.
 * @returns {AggregateNode[]}
 */
export function collectAggregates(root: SQLNode): AggregateNode[];
/**
 * Collect all unique column references.
 * Multiple references to the same column are de-duplicated, even if
 * they are not object-equal node instances.
 * @param {SQLNode} root The root of the AST to search.
 * @returns {ColumnRefNode[]}
 */
export function collectColumns(root: SQLNode): ColumnRefNode[];
/**
 * Collect all unique dynamic parameter instances.
 * @param {SQLNode} root The root of the AST to search.
 * @returns {import('../types.js').ParamLike[]}
 */
export function collectParams(root: SQLNode): import("../types.js").ParamLike[];
import { SQLNode } from '../ast/node.js';
import { AggregateNode } from '../ast/aggregate.js';
import { ColumnRefNode } from '../ast/column-ref.js';
