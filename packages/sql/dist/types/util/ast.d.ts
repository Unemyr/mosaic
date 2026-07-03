/**
 * Interpret a value as a SQL AST node. String values are assumed to be
 * column references. All other primitive values are interpreted as
 * SQL literals. Dynamic parameters are interpreted as param AST nodes,
 * while existing AST nodes are left as-is.
 * @param {*} value The value to interpret as a SQL AST node.
 * @returns {ExprNode}
 */
export function asNode(value: any): ExprNode;
/**
 * Interpret a value as a verbatim SQL AST node. String values will be
 * passed through to queries as verbatim text. All other primitive values
 * are interpreted as SQL literals. Dynamic parameters are interpreted
 * as param AST nodes, while existing AST nodes are left as-is.
 * @param {*} value The value to interpret as a verbatim AST node.
 * @returns {ExprNode}
 */
export function asVerbatim(value: any): ExprNode;
/**
 * Interpret a value as a literal AST node. All other primitive values
 * are interpreted as SQL literals. Dynamic parameters are interpreted
 * as param AST nodes, while existing AST nodes are left as-is.
 * @param {*} value The value to interpret as a literal AST node.
 * @returns {ExprNode}
 */
export function asLiteral(value: any): ExprNode;
/**
 * Interpret a value as a table reference AST node. String values are parsed
 * assuming dot ('.') delimiters (as in `schema.table`). Array values are
 * interpreted as pre-parsed name paths (as in `['schema', 'table']`). Any
 * other values are left as-is.
 * @param {string | string[] | TableRefNode} value The value to interpret as a
 *  table reference AST node.
 * @returns {TableRefNode}
 */
export function asTableRef(value: string | string[] | TableRefNode): TableRefNode;
/**
 * Parse a string as a column reference, potentially with
 * dot ('.') delimited table, schema, and database references.
 * @param {string} ref The column reference string.
 * @returns {import('../ast/column-ref.js').ColumnRefNode}
 */
export function parseColumnRef(ref: string): import("../ast/column-ref.js").ColumnRefNode;
/**
 * Parse a string as a table reference, potentially with
 * dot ('.') delimited schema and database references.
 * @param {string} ref The table reference string.
 * @returns {import('../ast/table-ref.js').TableRefNode}
 */
export function parseTableRef(ref: string): import("../ast/table-ref.js").TableRefNode;
/**
 * Create a new window definition node. The return value is an empty
 * window definition. Use chained calls such as `partitionby` and `orderby`
 * to specify the window settings.
 * @returns {WindowDefNode}
 */
export function over(): WindowDefNode;
import { ExprNode } from '../ast/node.js';
import { TableRefNode } from '../ast/table-ref.js';
import { WindowDefNode } from '../ast/window.js';
