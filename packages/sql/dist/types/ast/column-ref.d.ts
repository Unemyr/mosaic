/**
 * Check if a value is a column reference node.
 * @param {*} value The value to check.
 * @returns {value is ColumnRefNode}
 */
export function isColumnRef(value: any): value is ColumnRefNode;
export class ColumnRefNode extends ExprNode {
    /**
     * Instantiate a column reference node.
     * @param {import('./table-ref.js').TableRefNode} [table] The table reference.
     */
    constructor(type: any, table?: import("./table-ref.js").TableRefNode);
    /**
     * The table reference.
     * @type {import('./table-ref.js').TableRefNode}
     * @readonly
     */
    readonly table: import("./table-ref.js").TableRefNode;
    /**
     * Returns the column name.
     * @returns {string}
     */
    get column(): string;
}
export class ColumnNameRefNode extends ColumnRefNode {
    /**
     * Instantiate a column reference node.
     * @param {string} name The column name.
     * @param {import('./table-ref.js').TableRefNode} [table] The table reference.
     */
    constructor(name: string, table?: import("./table-ref.js").TableRefNode);
    /**
     * The column name.
     * @type {string}
     * @readonly
     */
    readonly name: string;
}
import { ExprNode } from './node.js';
