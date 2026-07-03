/**
 * Check if a value is a selection query or set operation.
 * @param {*} value The value to check.
 * @returns {value is Query}
 */
export function isQuery(value: any): value is Query;
/**
 * Check if a value is a selection query.
 * @param {*} value The value to check.
 * @returns {value is SelectQuery}
 */
export function isSelectQuery(value: any): value is SelectQuery;
/**
 * Check if a value is a describe query.
 * @param {*} value The value to check.
 * @returns {value is DescribeQuery}
 */
export function isDescribeQuery(value: any): value is DescribeQuery;
export class Query extends ExprNode {
    /**
     * Create a new select query with the given SELECT expressions.
     * @param {...import('../types.js').SelectExpr} expr The SELECT expressions.
     * @returns {SelectQuery}
     */
    static select(...expr: import("../types.js").SelectExpr[]): SelectQuery;
    /**
     * Create a new select query with the given FROM expressions.
     * @param {...import('../types.js').FromExpr} expr The FROM expressions.
     * @returns {SelectQuery}
     */
    static from(...expr: import("../types.js").FromExpr[]): SelectQuery;
    /**
     * Create a new select query with the given WITH CTE queries.
     * @param {...import('../types.js').WithExpr} expr The WITH CTE queries.
     * @returns {SelectQuery}
     */
    static with(...expr: import("../types.js").WithExpr[]): SelectQuery;
    /**
     * Create a new UNION set operation over the given queries.
     * @param {...Query} queries The queries.
     * @returns {SetOperation}
     */
    static union(...queries: Query[]): SetOperation;
    /**
     * Create a new UNION ALL set operation over the given queries.
     * @param {...Query} queries The queries.
     * @returns {SetOperation}
     */
    static unionAll(...queries: Query[]): SetOperation;
    /**
     * Create a new INTERSECT set operation over the given queries.
     * @param {...Query} queries The queries.
     * @returns {SetOperation}
     */
    static intersect(...queries: Query[]): SetOperation;
    /**
     * Create a new EXCEPT set operation over the given queries.
     * @param {...Query} queries The queries.
     * @returns {SetOperation}
     */
    static except(...queries: Query[]): SetOperation;
    /**
     * Create a new describe query for the given input query.
     * @param {Query} query The query to describe.
     * @returns {DescribeQuery}
     */
    static describe(query: Query): DescribeQuery;
    /**
     * Instantiate a new query.
     */
    constructor(type: any);
    /** @type {ExprNode[]} */
    _orderby: ExprNode[];
    /** @type {number} */
    _limit: number;
    /** @type {number} */
    _offset: number;
    /** @type {Query | null} */
    cteFor: Query | null;
    /**
     * Return a list of subqueries.
     * @returns {Query[]}
     */
    get subqueries(): Query[];
    /**
     * Clone this query.
     * @returns {Query}
     */
    clone(): Query;
    /**
     * Add ORDER BY expressions.
     * @param  {...import('../types.js').OrderByExpr} expr Expressions to add.
     * @returns
     */
    orderby(...expr: import("../types.js").OrderByExpr[]): this;
    /**
     * Set the query result LIMIT.
     * @param {number} value The limit value.
     * @returns {this}
     */
    limit(value: number): this;
    /**
     * Set the query result OFFSET.
     * @param {number} value The offset value.
     * @returns {this}
     */
    offset(value: number): this;
}
export class SelectQuery extends Query {
    /**
     * Instantiate a new select query.
     */
    constructor();
    /** @type {WithClauseNode[]} */
    _with: WithClauseNode[];
    /** @type {SelectClauseNode[]} */
    _select: SelectClauseNode[];
    /** @type {FromClauseNode[]} */
    _from: FromClauseNode[];
    /** @type {ExprNode[]} */
    _where: ExprNode[];
    /** @type {SampleClauseNode} */
    _sample: SampleClauseNode;
    /** @type {ExprNode[]} */
    _groupby: ExprNode[];
    /** @type {ExprNode[]} */
    _having: ExprNode[];
    /** @type {WindowClauseNode[]} */
    _window: WindowClauseNode[];
    /** @type {ExprNode[]} */
    _qualify: ExprNode[];
    /**
     * Clone this query.
     * @returns {SelectQuery}
     */
    clone(): SelectQuery;
    /**
     * Add WITH common table expressions (CTEs).
     * @param  {...import('../types.js').WithExpr} expr Expressions to add.
     * @returns {this}
     */
    with(...expr: import("../types.js").WithExpr[]): this;
    /**
     * Add SELECT expressions.
     * @param {...import('../types.js').SelectExpr} expr Expressions to add.
     * @returns {this}
     */
    select(...expr: import("../types.js").SelectExpr[]): this;
    /**
     * Set SELECT expressions, replacing any prior expressions.
     * @param {...import('../types.js').SelectExpr} expr Expressions to add.
     * @returns {this}
     */
    setSelect(...expr: import("../types.js").SelectExpr[]): this;
    /**
     * Indicate if this query should retrieve distinct values only.
     * @param {boolean} value The distinct flag
     * @returns {this}
     */
    distinct(value?: boolean): this;
    _distinct: boolean;
    /**
     * Add table FROM expressions.
     * @param  {...import('../types.js').FromExpr} expr Expressions to add.
     * @returns {this}
     */
    from(...expr: import("../types.js").FromExpr[]): this;
    /**
     * Set FROM expressions, replacing any prior expressions.
     * @param {...import('../types.js').FromExpr} expr Expressions to add.
     * @returns {this}
     */
    setFrom(...expr: import("../types.js").FromExpr[]): this;
    /**
     * Set SAMPLE settings.
     * @param {number | SampleClauseNode} value Either a sample clause node
     *  or the sample size as either a row count or percentage.
     * @param {import('./sample.js').SampleMethod} [method] The sampling method
     *  to use.
     * @param {number} [seed] The random seed.
     * @returns {this}
     */
    sample(value: number | SampleClauseNode, method?: import("./sample.js").SampleMethod, seed?: number): this;
    /**
     * Add WHERE expressions.
     * @param  {...import('../types.js').FilterExpr} expr Expressions to add.
     * @returns {this}
     */
    where(...expr: import("../types.js").FilterExpr[]): this;
    /**
     * Set WHERE expressions, replacing any prior expressions.
     * @param {...import('../types.js').FilterExpr} expr Expressions to add.
     * @returns {this}
     */
    setWhere(...expr: import("../types.js").FilterExpr[]): this;
    /**
     * Add GROUP BY expressions.
     * @param  {...import('../types.js').GroupByExpr} expr Expressions to add.
     * @returns {this}
     */
    groupby(...expr: import("../types.js").GroupByExpr[]): this;
    /**
     * Set GROUP BY expressions, replacing any prior expressions.
     * @param {...import('../types.js').GroupByExpr} expr Expressions to add.
     * @returns {this}
     */
    setGroupby(...expr: import("../types.js").GroupByExpr[]): this;
    /**
     * Add HAVING expressions.
     * @param {...import('../types.js').FilterExpr} expr Expressions to add.
     * @returns {this}
     */
    having(...expr: import("../types.js").FilterExpr[]): this;
    /**
     * Add WINDOW definitions.
     * @param  {...any} expr Expressions to add.
     * @returns {this}
     */
    window(...expr: any[]): this;
    /**
     * Add QUALIFY expressions.
     * @param {...import('../types.js').FilterExpr} expr Expressions to add.
     * @returns {this}
     */
    qualify(...expr: import("../types.js").FilterExpr[]): this;
}
export class DescribeQuery extends SQLNode {
    /**
     * Instantiate a describe query.
     */
    constructor(query: any);
    query: any;
    /**
     * Clone this describe query.
     * @returns {DescribeQuery}
     */
    clone(): DescribeQuery;
}
export class SetOperation extends Query {
    /**
     * Instantiate a new set operation instance.
     * @param {string} op The set operation.
     * @param {Query[]} queries The subqueries.
     */
    constructor(op: string, queries: Query[]);
    /**
     * @type {string}
     * @readonly
     */
    readonly op: string;
    /**
     * @type {Query[]}
     * @readonly
     */
    readonly queries: Query[];
    /**
     * Clone this set operation.
     * @returns {SetOperation}
     */
    clone(): SetOperation;
}
import { ExprNode } from './node.js';
import { WithClauseNode } from './with.js';
import { SelectClauseNode } from './select.js';
import { FromClauseNode } from './from.js';
import { SampleClauseNode } from './sample.js';
import { WindowClauseNode } from './window.js';
import { SQLNode } from './node.js';
