export class IntervalNode extends ExprNode {
    /**
     * Instantiate an interval node.
     * @param {string} name The interval name.
     * @param {number} [steps=1] The interval steps.
     */
    constructor(name: string, steps?: number);
    /**
     * The interval name.
     * @type {string}
     * @readonly
     */
    readonly name: string;
    /**
     * The interval steps.
     * @type {number}
     * @readonly
     */
    readonly steps: number;
}
import { ExprNode } from './node.js';
