/**
 * Returns a named table or view reference.
 * @param {...(string | string[])} ids Table and namespace identifiers.
 *  For example 'name' or ['schema', 'name'].
 * @returns {TableRefNode | undefined} A table reference, or undefined
 *  if the input identifier list is empty.
 */
export function tableRef(...ids: (string | string[])[]): TableRefNode | undefined;
import { TableRefNode } from '../ast/table-ref.js';
