/**
 * @typedef {[any, any] | import('../types.js').ParamLike} FrameExtent
 */
export class WindowClauseNode extends SQLNode {
    /**
     * Instantiate a window clause node.
     * @param {string} name The window name.
     * @param {WindowDefNode} def The window definition.
     */
    constructor(name: string, def: WindowDefNode);
    /**
     * The window name.
     * @type {string}
     * @readonly
     */
    readonly name: string;
    /**
     * The window definition.
     * @type {WindowDefNode}
     * @readonly
     */
    readonly def: WindowDefNode;
}
export class WindowNode extends ExprNode {
    /**
     * Instantiate a window node.
     * @param {WindowFunctionNode | AggregateNode} func The window function call.
     * @param {WindowDefNode} [over] The window definition or name.
     */
    constructor(func: WindowFunctionNode | AggregateNode, over?: WindowDefNode);
    /**
     * @type {WindowFunctionNode | AggregateNode}
     * @readonly
     */
    readonly func: WindowFunctionNode | AggregateNode;
    /**
     * @type {WindowDefNode}
     * @readonly
     */
    readonly def: WindowDefNode;
    /**
     * Return an updated window over a named window definition.
     * @param {string} name The window definition name.
     * @returns {WindowNode} A new window node.
     */
    over(name: string): WindowNode;
    /**
     * Return an updated window with the given partitions.
     * @param {...import('../types.js').ExprVarArgs} expr The partition by criteria.
     * @returns {WindowNode} A new window node.
     */
    partitionby(...expr: import("../types.js").ExprVarArgs[]): WindowNode;
    /**
     * Return an updated window with the given ordering.
     * @param {...import('../types.js').ExprVarArgs} expr The order by criteria.
     * @returns {WindowNode} A new window node.
     */
    orderby(...expr: import("../types.js").ExprVarArgs[]): WindowNode;
    /**
     * Return an updated window with the given rows frame.
     * @param {FrameExtent} extent The row-based window frame extent.
     * @returns {WindowNode} A new window node.
     */
    rows(extent: FrameExtent): WindowNode;
    /**
     * Return an updated window with the given range frame.
     * @param {FrameExtent} extent The range-based window frame extent.
     * @returns {WindowNode} A new window node.
     */
    range(extent: FrameExtent): WindowNode;
}
export class WindowFunctionNode extends FunctionNode {
    /**
     * Instantiate a window function call node.
     * @param {import('../types.js').WindowFunctionName} name The function name.
     * @param {ExprNode[]} [args=[]] The function arguments.
     */
    constructor(name: import("../types.js").WindowFunctionName, args?: ExprNode[]);
}
export class WindowDefNode extends SQLNode {
    /**
     * Instantiate a window definition node.
     * @param {string} [name] The base window definition name.
     * @param {ExprNode[]} [partition] The partition by criteria.
     * @param {ExprNode[]} [order] The order by criteria.
     * @param {WindowFrameNode} [frame] The window frame definition.
     */
    constructor(name?: string, partition?: ExprNode[], order?: ExprNode[], frame?: WindowFrameNode);
    /**
     * The base window definition name.
     * @type {string}
     * @readonly
     */
    readonly name: string;
    /**
     * The partition by criteria.
     * @type {ExprNode[]}
     * @readonly
     */
    readonly partition: ExprNode[];
    /**
     * The order by criteria.
     * @type {ExprNode[]}
     * @readonly
     */
    readonly order: ExprNode[];
    /**
     * The window frame definition.
     * @type {WindowFrameNode}
     * @readonly
     */
    readonly frame: WindowFrameNode;
    /**
     * Return an updated window definition with the given base name.
     * @param {string} name The base window definition name.
     * @returns {WindowDefNode} A new window definition node.
     */
    over(name: string): WindowDefNode;
    /**
     * Return an updated window definition with the given partitions.
     * @param {...import('../types.js').ExprVarArgs} expr The partition by criteria.
     * @returns {WindowDefNode} A new window definition node.
     */
    partitionby(...expr: import("../types.js").ExprVarArgs[]): WindowDefNode;
    /**
     * Return an updated window definition with the given ordering.
     * @param {...import('../types.js').ExprVarArgs} expr The order by criteria.
     * @returns {WindowDefNode} A new window definition node.
     */
    orderby(...expr: import("../types.js").ExprVarArgs[]): WindowDefNode;
    /**
     * Return an updated window definition with the given rows frame.
     * @param {FrameExtent} extent The row-based window frame extent.
     * @returns {WindowDefNode} A new window definition node.
     */
    rows(extent: FrameExtent): WindowDefNode;
    /**
     * Return an updated window definition with the given range frame.
     * @param {FrameExtent} extent The range-based window frame extent.
     * @returns {WindowDefNode} A new window definition node.
     */
    range(extent: FrameExtent): WindowDefNode;
}
export class WindowFrameNode extends SQLNode {
    /**
     * Instantiate a window frame definition node.
     * @param {FrameExtent} extent The frame extent as [preceding, following]
     *  row or interval offsets.
     * @param {boolean} [range] The frame type: `true` for range, otherwise rows.
     * @param {ExprNode} [exclude] The window exclusion criteria.
     */
    constructor(extent: FrameExtent, range?: boolean, exclude?: ExprNode);
    /**
     * The frame extent as [preceding, following] row or interval offsets.
     * @type {ParamNode | [any, any]}
     * @readonly
     */
    readonly extent: ParamNode | [any, any];
    /**
     * The frame type: `true` for range, otherwise rows.
     * @type {boolean}
     * @readonly
     */
    readonly range: boolean;
    /**
     * The window exclusion criteria.
     * @type {ExprNode}
     * @readonly
     */
    readonly exclude: ExprNode;
}
export type FrameExtent = [any, any] | import("../types.js").ParamLike;
import { SQLNode } from './node.js';
import { ExprNode } from './node.js';
import { AggregateNode } from './aggregate.js';
import { FunctionNode } from './function.js';
import { ParamNode } from './param.js';
