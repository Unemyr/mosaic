/**
 * Create a column reference.
 * @param {string | import('../types.js').ParamLike} name The column name,
 *  as a string or as a dynamic parameter.
 * @param {string | string[] | TableRefNode} [table] The table reference.
 * @returns {import('../ast/column-ref.js').ColumnRefNode}
 */
export function column(name: string | import("../types.js").ParamLike, table?: string | string[] | TableRefNode): import("../ast/column-ref.js").ColumnRefNode;
import { TableRefNode } from '../ast/table-ref.js';
