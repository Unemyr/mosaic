export class BinaryOpNode extends ExprNode {
    /**
     * Instantiate a binary operator node.
     * @param {string} op The operator type.
     * @param {ExprNode} left The left input expression.
     * @param {ExprNode} right The right input expression.
     */
    constructor(op: string, left: ExprNode, right: ExprNode);
    /**
     * The operator type.
     * @type {string}
     * @readonly
     */
    readonly op: string;
    /**
     * The left input expression.
     * @type {ExprNode}
     * @readonly
     */
    readonly left: ExprNode;
    /**
     * The right input expression.
     * @type {ExprNode}
     * @readonly
     */
    readonly right: ExprNode;
}
import { ExprNode } from './node.js';
