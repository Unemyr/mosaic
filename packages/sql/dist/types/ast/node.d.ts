/**
 * Check if a value is a SQL AST node.
 * @param {*} value The value to check.
 * @returns {value is SQLNode}
 */
export function isNode(value: any): value is SQLNode;
export class SQLNode {
    /**
     * Instantiate a SQL AST node.
     * @param {string} type The SQL AST node type.
     */
    constructor(type: string);
    /**
     * The SQL AST node type.
     * @type {string}
     * @readonly
     */
    readonly type: string;
}
/**
 * AST node corresponding to an individual expression.
 */
export class ExprNode extends SQLNode {
}
