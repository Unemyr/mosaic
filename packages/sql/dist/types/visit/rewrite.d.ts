/**
 * Rewrite a SQL expression, based on a map of nodes to replace.
 * This method updates the expression in place.
 * @param {ExprNode} node The root AST node of the expression.
 * @param {Map<ExprNode, ExprNode>} map The rewrite map.
 *  When encountered, key nodes are replaced by value nodes.
 * @returns {ExprNode}
 */
export function rewrite(node: ExprNode, map: Map<ExprNode, ExprNode>): ExprNode;
import { ExprNode } from '../ast/node.js';
