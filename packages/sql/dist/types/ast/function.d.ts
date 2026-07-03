export class FunctionNode extends ExprNode {
    /**
     * Instantiate a function node.
     * @param {string} name The function name.
     * @param {ExprNode[]} [args=[]] The function arguments.
     */
    constructor(name: string, args?: ExprNode[]);
    /**
     * The function name.
     * @type {string}
     * @readonly
     */
    readonly name: string;
    /**
     * The function arguments.
     * @type {ExprNode[]}
     * @readonly
     */
    readonly args: ExprNode[];
}
import { ExprNode } from './node.js';
