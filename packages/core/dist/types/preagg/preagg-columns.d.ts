/**
 * Determine pre-aggregation columns for a given Mosaic client.
 * @param {MosaicClient} client The Mosaic client.
 * @returns An object with necessary column data to generate pre-aggregated
 *  columns, or null if the client can't be optimized or the client query
 *  contains an invalid or unsupported expression.
 */
export function preaggColumns(client: MosaicClient): {
    group: string[];
    preagg: Record<string, ExprNode>;
    output: Record<string, ExprNode>;
};
import { MosaicClient } from '../MosaicClient.js';
import { ExprNode } from '@uwdata/mosaic-sql';
