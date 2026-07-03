export class AggregateNode extends ExprNode {
    /**
     * Instantiate an aggregate function node.
     * @param {string} name The aggregate function name.
     * @param {ExprNode[]} args The aggregate function arguments.
     * @param {boolean} [distinct] The distinct flag.
     * @param {ExprNode} [filter] Filter expression.
     */
    constructor(name: string, args: ExprNode[], distinct?: boolean, filter?: ExprNode);
    /**
     * The aggregate function name.
     * @type {string}
     * @readonly
     */
    readonly name: string;
    /**
     * The aggregate function arguments.
     * @type {ExprNode[]}
     * @readonly
     */
    readonly args: ExprNode[];
    /**
     * The distinct flag.
     * @type {boolean}
     * @readonly
     */
    readonly isDistinct: boolean;
    /**
     * Filter criteria.
     * @type {ExprNode}
     * @readonly
     */
    readonly filter: ExprNode;
    /**
     * Return a new derived aggregate over distinct values.
     * @param {boolean} [isDistinct=true] The distinct flag.
     * @returns {AggregateNode} A new aggregate node.
     */
    distinct(isDistinct?: boolean): AggregateNode;
    /**
     * Return a new derived aggregate function that filters values.
     * @param {ExprNode | string} filter The filter expression.
     * @returns {AggregateNode} A new aggregate node.
     */
    where(filter: ExprNode | string): AggregateNode;
    /**
     * Return a new window function over this aggregate.
     * @returns {WindowNode} A new window node.
     */
    window(): WindowNode;
    /**
     * Return a new window function over this aggregate with the given partitions.
     * @param {...import('../types.js').ExprVarArgs} expr The partition by criteria.
     * @returns {WindowNode} A new window node.
     */
    partitionby(...expr: import("../types.js").ExprVarArgs[]): WindowNode;
    /**
     * Return a new window function over this aggregate with the given ordering.
     * @param {...import('../types.js').ExprVarArgs} expr The order by criteria.
     * @returns {WindowNode} A new window node.
     */
    orderby(...expr: import("../types.js").ExprVarArgs[]): WindowNode;
}
/**
 * An array of known aggregate function names.
 * From https://duckdb.org/docs/sql/functions/aggregates.html.
 */
export const aggregateNames: string[];
import { ExprNode } from './node.js';
import { WindowNode } from './window.js';
