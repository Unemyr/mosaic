export class WithClauseNode extends SQLNode {
    /**
     * Instantiate a with clause node for a common table expression (CTE).
     * @param {string} name The common table expression (CTE) name.
     * @param {Query} query The common table expression (CTE) query.
     */
    constructor(name: string, query: Query);
    /**
     * The common table expression (CTE) name.
     * @type {string}
     * @readonly
     */
    readonly name: string;
    /**
     * The common table expression (CTE) query.
     * @type {Query}
     * @readonly
     */
    readonly query: Query;
}
import { SQLNode } from './node.js';
import { Query } from './query.js';
