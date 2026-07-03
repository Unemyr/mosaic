export class ParamNode extends ExprNode {
    /**
     * Instantiate a param node with a dynamic parameter.
     * @param {import('../types.js').ParamLike} param The dynamic parameter.
     */
    constructor(param: import("../types.js").ParamLike);
    /**
     * The dynamic parameter.
     * @type {import('../types.js').ParamLike}
     * @readonly
     */
    readonly param: import("../types.js").ParamLike;
    /**
     * Returns the current parameter value.
     * @returns {*}
     */
    get value(): any;
}
import { ExprNode } from './node.js';
