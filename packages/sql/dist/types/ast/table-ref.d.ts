/**
 * Check if a value is a table reference node.
 * @param {*} value The value to check.
 * @returns {value is TableRefNode}
 */
export function isTableRef(value: any): value is TableRefNode;
export class TableRefNode extends ExprNode {
    /**
     * Instantiate a table reference node.
     * @param {string | string[]} table The table name.
     */
    constructor(table: string | string[]);
    /**
     * The table name, including namespaces.
     * @type {string[]}
     * @readonly
     */
    readonly table: string[];
    /**
     * The table name without database or schema namespaces.
     * @returns {string}
     */
    get name(): string;
}
import { ExprNode } from './node.js';
