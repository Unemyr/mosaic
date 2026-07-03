export class UnaryOpNode extends AbstractUnaryOpNode {
    /**
     * Instantiate a unary operator node.
     * @param {string} op The operator type.
     * @param {ExprNode} expr The input expression.
     */
    constructor(op: string, expr: ExprNode);
}
export class UnaryPosftixOpNode extends AbstractUnaryOpNode {
    /**
     * Instantiate a unary operator node.
     * @param {string} op The operator type.
     * @param {ExprNode} expr The input expression.
     */
    constructor(op: string, expr: ExprNode);
}
declare class AbstractUnaryOpNode extends ExprNode {
    /**
     * Instantiate an abstract unary operator node.
     * @param {string} type The node type.
     * @param {string} op The operator type.
     * @param {ExprNode} expr The input expression.
     */
    constructor(type: string, op: string, expr: ExprNode);
    /**
     * The operator type.
     * @type {string}
     * @readonly
     */
    readonly op: string;
    /**
     * The input expression.
     * @type {ExprNode}
     * @readonly
     */
    readonly expr: ExprNode;
}
import { ExprNode } from './node.js';
export {};
