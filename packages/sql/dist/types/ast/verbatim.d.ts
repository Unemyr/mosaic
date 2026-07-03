export class VerbatimNode extends ExprNode {
    /**
     * The verbatim content to include.
     * @type {string}
     * @readonly
     */
    readonly value: string;
}
import { ExprNode } from './node.js';
