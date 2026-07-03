/**
 * @template {ExprNode} T
 */
export class LogicalOpNode<T extends ExprNode> extends ExprNode {
    /**
     * Instantiate a logical operator node.
     * @param {string} op The logical operation.
     * @param {T[]} clauses The input clause expressions.
     */
    constructor(op: string, clauses: T[]);
    /**
     * The logical operator.
     * @type {string}
     * @readonly
     */
    readonly op: string;
    /**
     * The input clause expressions.
     * @type {T[]}
     * @readonly
     */
    readonly clauses: T[];
}
/**
 * @template {ExprNode} T
 * @extends {LogicalOpNode<T>}
 */
export class AndNode<T extends ExprNode> extends LogicalOpNode<T> {
    /**
     * Instantiate a logical AND operator node.
     * @param {T[]} clauses The input clause expressions.
     */
    constructor(clauses: T[]);
}
/**
 * @template {ExprNode} T
 * @extends {LogicalOpNode<T>}
 */
export class OrNode<T extends ExprNode> extends LogicalOpNode<T> {
    /**
     * Instantiate a logical OR operator node.
     * @param {T[]} clauses The input clause expressions.
     */
    constructor(clauses: T[]);
}
import { ExprNode } from './node.js';
