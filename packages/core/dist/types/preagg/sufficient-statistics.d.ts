/**
 * Determine sufficient statistics to preaggregate the given node. This
 * method populates the *preagg* and *aggrs* arguments with necessary
 * information for preaggregation optimization.
 * @param {AggregateNode} node An aggregate function.
 * @param {Record<string, ExprNode>} preagg Map of column names to
 *  expressions to include in the preaggregation table.
 * @returns {ExprNode} Output aggregate expression that uses preaggregated
 *  sufficient statistics to service updates.
 */
export function sufficientStatistics(node: AggregateNode, preagg: Record<string, ExprNode>, avg: any): ExprNode;
import { AggregateNode } from '@uwdata/mosaic-sql';
import { ExprNode } from '@uwdata/mosaic-sql';
