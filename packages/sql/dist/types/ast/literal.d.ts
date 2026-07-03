export function literalToSQL(value: any): string;
export class LiteralNode extends ExprNode {
    /**
     * Instantiate an literal node.
     * @param {*} value The literal value.
     */
    constructor(value: any);
    /**
     * The literal value.
     * @type {any}
     * @readonly
     */
    readonly value: any;
}
import { ExprNode } from './node.js';
