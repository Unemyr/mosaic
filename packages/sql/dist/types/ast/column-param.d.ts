/**
 * Check if a value is a dynamic column reference node.
 * @param {*} value The value to check.
 * @returns {value is ColumnParamNode}
 */
export function isColumnParam(value: any): value is ColumnParamNode;
export class ColumnParamNode extends ColumnRefNode {
    /**
     * Instantiate a column param node.
     * @param {import('./param.js').ParamNode} param The column name as a
     *  parameter node.
     * @param {import('./table-ref.js').TableRefNode} [table] The table
     *  reference.
     */
    constructor(param: import("./param.js").ParamNode, table?: import("./table-ref.js").TableRefNode);
    /**
     * The column name as a parameter node.
     * @type {import('./param.js').ParamNode}
     * @readonly
     */
    readonly param: import("./param.js").ParamNode;
}
import { ColumnRefNode } from './column-ref.js';
