export class OrderByNode extends ExprNode {
    /**
     * Instantiate an order by entry node.
     * @param {ExprNode} expr The expression to order by.
     * @param {boolean | undefined} [desc] Flag indicating descending order.
     * @param {boolean | undefined} [nullsFirst] Flag indicating if null
     *  values should be sorted first.
     */
    constructor(expr: ExprNode, desc?: boolean | undefined, nullsFirst?: boolean | undefined);
    /**
     * The expression to order by.
     * @type {ExprNode}
     * @readonly
     */
    readonly expr: ExprNode;
    /**
     * Flag indicating descending order.
     * @type {boolean | undefined}
     * @readonly
     */
    readonly desc: boolean | undefined;
    /**
     * Flag indicating if null values should be sorted first.
     * @type {boolean | undefined}
     * @readonly
     */
    readonly nullsFirst: boolean | undefined;
}
import { ExprNode } from './node.js';
