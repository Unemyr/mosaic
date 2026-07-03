export class BetweenOpNode extends AbstractBetweenOpNode {
    /**
     * Instantiate a between operator node.
     * @param {ExprNode} expr The input expression.
     * @param {[ExprNode, ExprNode]} extent
     *  The range extent.
     */
    constructor(expr: ExprNode, extent: [ExprNode, ExprNode]);
}
export class NotBetweenOpNode extends AbstractBetweenOpNode {
    /**
     * Instantiate a not between operator node.
     * @param {ExprNode} expr The input expression.
     * @param {[ExprNode, ExprNode]} extent
     *  The range extent.
     */
    constructor(expr: ExprNode, extent: [ExprNode, ExprNode]);
}
declare class AbstractBetweenOpNode extends ExprNode {
    /**
     * Instantiate an abstract between operator node.
     * @param {string} type The node type.
     * @param {ExprNode} expr The input expression.
     * @param {[ExprNode, ExprNode]} extent The range extent.
     */
    constructor(type: string, expr: ExprNode, extent: [ExprNode, ExprNode]);
    /**
     * The input expression.
     * @type {ExprNode}
     * @readonly
     */
    readonly expr: ExprNode;
    /**
     * The range extent.
     * @type {[ExprNode, ExprNode]}
     * @readonly
     */
    readonly extent: [ExprNode, ExprNode];
    /**
     * Generate a SQL query string for this node.
     * @returns {string}
     */
    toSQL(op: any): string;
}
import { ExprNode } from './node.js';
export {};
