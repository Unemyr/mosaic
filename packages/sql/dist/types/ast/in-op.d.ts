export class InOpNode extends ExprNode {
    /**
     * Instantiate an in operator node.
     * @param {ExprNode} expr The input expression.
     * @param {ExprNode[]} values The value set.
     */
    constructor(expr: ExprNode, values: ExprNode[]);
    /**
     * The input expression.
     * @type {ExprNode}
     * @readonly
     */
    readonly expr: ExprNode;
    /**
     * The value set.
     * @type {ExprNode[]}
     * @readonly
     */
    readonly values: ExprNode[];
}
import { ExprNode } from './node.js';
