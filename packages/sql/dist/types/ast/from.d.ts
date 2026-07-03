export class FromClauseNode extends SQLNode {
    /**
     * Instantiate a from node.
     * @param {SQLNode} expr The from expression.
     * @param {string} alias The output name.
     */
    constructor(expr: SQLNode, alias: string);
    /**
     * The from expression.
     * @type {SQLNode}
     * @readonly
     */
    readonly expr: SQLNode;
    /**
     * The output name.
     * @type {string}
     * @readonly
     */
    readonly alias: string;
}
import { SQLNode } from './node.js';
