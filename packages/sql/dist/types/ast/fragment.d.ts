export class FragmentNode extends ExprNode {
    /**
     * Instantiate a fragment node with arbitrary content.
     * @param {ExprNode[]} spans The consecutive parts making up the fragment.
     */
    constructor(spans: ExprNode[]);
    /**
     * The consecutive parts making up the fragment.
     * @type {ExprNode[]}
     * @readonly
     */
    readonly spans: ExprNode[];
}
import { ExprNode } from './node.js';
