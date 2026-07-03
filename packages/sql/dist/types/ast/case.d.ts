export class CaseNode extends ExprNode {
    /**
     * Instantiate a case node.
     * @param {ExprNode} [expr] An optional base expression, that comes
     *  immediately after the CASE keyword. If specified, this case statement
     *  acts like a switch statement, with WHEN expressions as values to
     *  match against the switch value rather than boolean conditions.
     * @param {WhenNode[]} [when] An array of WHEN/THEN expression nodes.
     * @param {ExprNode} [elseExpr] An ELSE expression.
     */
    constructor(expr?: ExprNode, when?: WhenNode[], elseExpr?: ExprNode);
    /**
     * The optional base expression.
     * @type {ExprNode}
     * @readonly
     */
    readonly expr: ExprNode;
    /**
     * An array of WHEN/THEN expression nodes.
     * @type {WhenNode[]}
     * @readonly
     */
    readonly _when: WhenNode[];
    /**
     * An ELSE expression.
     * @type {ExprNode}
     * @readonly
     */
    readonly _else: ExprNode;
    /**
     * Return a new case node with the given conditional added as
     * the last WHEN / THEN pair.
     * @param {import('../types.js').ExprValue} cond
     *  The WHEN condition expression.
     * @param {import('../types.js').ExprValue} value
     *  The THEN value expression.
     * @returns {CaseNode}
     */
    when(cond: import("../types.js").ExprValue, value: import("../types.js").ExprValue): CaseNode;
    /**
     * Return a new case node with the given ELSE expression.
     * @param {import('../types.js').ExprValue} expr The ELSE expression.
     * @returns {CaseNode}
     */
    else(expr: import("../types.js").ExprValue): CaseNode;
}
export class WhenNode extends SQLNode {
    /**
     * Instantiate a case node.
     * @param {ExprNode} when The WHEN condition expression.
     * @param {ExprNode} then The THEN value expression.
     */
    constructor(when: ExprNode, then: ExprNode);
    /**
     * The condition expression.
     * @type {ExprNode}
     * @readonly
     */
    readonly when: ExprNode;
    /**
     * The value expression.
     * @type {ExprNode}
     * @readonly
     */
    readonly then: ExprNode;
}
import { ExprNode } from './node.js';
import { SQLNode } from './node.js';
