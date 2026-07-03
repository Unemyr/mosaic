/**
 * Perform a traversal of a SQL expression AST.
 * @param {import('../ast/node.js').SQLNode} node Root node for AST traversal.
 * @param {import('../types.js').VisitorCallback} visit Visitor callback function.
 * @return {import('../types.js').VisitorResult}
 */
export function walk(node: import("../ast/node.js").SQLNode, visit: import("../types.js").VisitorCallback): import("../types.js").VisitorResult;
