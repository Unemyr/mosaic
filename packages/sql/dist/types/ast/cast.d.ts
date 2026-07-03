export class CastNode extends ExprNode {
    /**
     * Instantiate a cast node.
     * @param {ExprNode} expr The expression to type cast.
     * @param {string} type The type to cast to.
     */
    constructor(expr: ExprNode, type: string);
    /**
     * The expression to type cast.
     * @type {ExprNode}
     * @readonly
     */
    readonly expr: ExprNode;
    /**
     * The type to cast to.
     * @type {string}
     * @readonly
     */
    readonly cast: string;
}
import { ExprNode } from './node.js';
