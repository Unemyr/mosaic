export class SelectClauseNode extends SQLNode {
    /**
     * Instantiate a select node.
     * @param {ExprNode} expr The select expression.
     * @param {string} alias The output name.
     */
    constructor(expr: ExprNode, alias: string);
    /**
     * The select expression.
     * @type {ExprNode}
     * @readonly
     */
    readonly expr: ExprNode;
    /**
     * The output name.
     * @type {string}
     * @readonly
     */
    readonly alias: string;
}
import { SQLNode } from './node.js';
import { ExprNode } from './node.js';
