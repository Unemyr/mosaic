/**
 * Test if an AST node is a specific function call.
 * @param {import('../ast/node.js').SQLNode} node The SQL AST node to test.
 * @param {string} name The function name.
 * @returns {node is FunctionNode}
 */
export function isFunctionCall(node: import("../ast/node.js").SQLNode, name: string): node is FunctionNode;
/**
 * Create a new function call AST node.
 * @param {string} name The function name.
 * @param  {...any} args The function arguments.
 * @returns {FunctionNode}
 */
export function fn(name: string, ...args: any[]): FunctionNode;
/**
 * Create a new aggregate function AST node.
 * @param {string} name The function name.
 * @param  {...any} args The function arguments.
 * @returns {AggregateNode}
 */
export function aggFn(name: string, ...args: any[]): AggregateNode;
/**
 * Create a new window AST node. The output node has an empty window
 * definition. Use chained calls such as `partitionby` and `orderby`
 * to specify the window settings.
 * @param {import('../types.js').WindowFunctionName} name The function name.
 * @param  {...any} args The function arguments.
 * @returns {WindowNode}
 */
export function winFn(name: import("../types.js").WindowFunctionName, ...args: any[]): WindowNode;
/**
 * Process a list of expression inputs. Nested arrays are flattened,
 * null results are removed, and each input is cast (as needed) to
 * be a proper SQL AST node. By default, strings are assumed to be
 * column names, while other primitive values map to SQL literals.
 * Use an alternative *cast* function to change this behavior.
 * @param {any[]} list The list of expression inputs.
 * @param {function} [cast] A function that casts an input value
 *  to a desired type. By default, `asNode` is used to coerce
 *  inputs to AST nodes as needed.
 * @returns {ReturnType<cast>[]}
 */
export function exprList(list: any[], cast?: Function): ReturnType<Function>[];
/**
 * Process a list of function arguments, stripping any undefined
 * values from the end of the list.
 * @template T
 * @param {T[]} list The input function arguments.
 * @returns {T[]} The prepared argument list.
 */
export function argsList<T>(list: T[]): T[];
import { FunctionNode } from '../ast/function.js';
import { AggregateNode } from '../ast/aggregate.js';
import { WindowNode } from '../ast/window.js';
