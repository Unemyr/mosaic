/**
 * @typedef {import('./util/selection-types.js').SelectionClause} SelectionClause
 * @typedef {import('./util/selection-types.js').Scale} Scale
 * @typedef {import('./util/selection-types.js').Extent} Extent
 * @typedef {import('./util/selection-types.js').MatchMethod} MatchMethod
 * @typedef {import('./util/selection-types.js').BinMethod} BinMethod
 */
/**
 * Generate a selection clause for a single selected point value.
 * @param {import('@uwdata/mosaic-sql').ExprValue} field The table column or expression to select.
 * @param {*} value The selected value.
 * @param {object} options Additional clause properties.
 * @param {*} options.source The source component generating this clause.
 * @param {Set<MosaicClient>} [options.clients] The Mosaic clients associated
 *  with this clause. These clients are not filtered by this clause in
 *  cross-filtering contexts.
 * @returns {SelectionClause} The generated selection clause.
 */
export function clausePoint(field: import("@uwdata/mosaic-sql").ExprValue, value: any, { source, clients }: {
    source: any;
    clients?: Set<MosaicClient>;
}): SelectionClause;
/**
 * Generate a selection clause for multiple selected point values.
 * @param {import('@uwdata/mosaic-sql').ExprValue[]} fields The table columns or expressions to select.
 * @param {any[][] | null | undefined} value The selected values, as an array of
 *  arrays. Each subarray contains values for each *fields* entry.
 * @param {object} options Additional clause properties.
 * @param {*} options.source The source component generating this clause.
 * @param {Set<MosaicClient>} [options.clients] The Mosaic clients associated
 *  with this clause. These clients are not filtered by this clause in
 *  cross-filtering contexts.
 * @returns {SelectionClause} The generated selection clause.
 */
export function clausePoints(fields: import("@uwdata/mosaic-sql").ExprValue[], value: any[][] | null | undefined, { source, clients }: {
    source: any;
    clients?: Set<MosaicClient>;
}): SelectionClause;
/**
 * Generate a selection clause for a selected 1D interval.
 * @param {import('@uwdata/mosaic-sql').ExprValue} field The table column or expression to select.
 * @param {Extent | null | undefined} value The selected interval as a [lo, hi] array.
 * @param {object} options Additional clause properties.
 * @param {*} options.source The source component generating this clause.
 * @param {Set<MosaicClient>} [options.clients] The Mosaic clients associated
 *  with this clause. These clients are not filtered by this clause in
 *  cross-filtering contexts.
 * @param {Scale} [options.scale] The scale mapping descriptor.
 * @param {BinMethod} [options.bin] A binning method hint.
 * @param {number} [options.pixelSize=1] The interactive pixel size.
 * @returns {SelectionClause} The generated selection clause.
 */
export function clauseInterval(field: import("@uwdata/mosaic-sql").ExprValue, value: Extent | null | undefined, { source, clients, bin, scale, pixelSize }: {
    source: any;
    clients?: Set<MosaicClient>;
    scale?: Scale;
    bin?: BinMethod;
    pixelSize?: number;
}): SelectionClause;
/**
 * Generate a selection clause for multiple selected intervals.
 * @param {import('@uwdata/mosaic-sql').ExprValue[]} fields The table columns or expressions to select.
 * @param {Extent[] | null | undefined} value The selected intervals, as an array of extents.
 * @param {object} options Additional clause properties.
 * @param {*} options.source The source component generating this clause.
 * @param {Set<MosaicClient>} [options.clients] The Mosaic clients associated
 *  with this clause. These clients are not filtered by this clause in
 *  cross-filtering contexts.
 * @param {Scale[]} [options.scales] The scale mapping descriptors,
 *  in an order matching the given *fields* and *value* extents.
 * @param {BinMethod} [options.bin] A binning method hint.
 * @param {number} [options.pixelSize=1] The interactive pixel size.
 * @returns {SelectionClause} The generated selection clause.
 */
export function clauseIntervals(fields: import("@uwdata/mosaic-sql").ExprValue[], value: Extent[] | null | undefined, { source, clients, bin, scales, pixelSize }: {
    source: any;
    clients?: Set<MosaicClient>;
    scales?: Scale[];
    bin?: BinMethod;
    pixelSize?: number;
}): SelectionClause;
/**
 * Generate a selection clause for text search matching.
 * @param {import('@uwdata/mosaic-sql').ExprValue} field The table column or expression to select.
 * @param {string | null | undefined} value The selected text search query string.
 * @param {object} options Additional clause properties.
 * @param {*} options.source The source component generating this clause.
 * @param {Set<MosaicClient>} [options.clients] The Mosaic clients associated
 *  with this clause. These clients are not filtered by this clause in
 *  cross-filtering contexts.
 * @param {MatchMethod} [options.method] The
 *  text matching method to use. Defaults to `'contains'`.
 * @returns {SelectionClause} The generated selection clause.
 */
export function clauseMatch(field: import("@uwdata/mosaic-sql").ExprValue, value: string | null | undefined, { source, clients, method }: {
    source: any;
    clients?: Set<MosaicClient>;
    method?: MatchMethod;
}): SelectionClause;
export type SelectionClause = import("./util/selection-types.js").SelectionClause;
export type Scale = import("./util/selection-types.js").Scale;
export type Extent = import("./util/selection-types.js").Extent;
export type MatchMethod = import("./util/selection-types.js").MatchMethod;
export type BinMethod = import("./util/selection-types.js").BinMethod;
import { MosaicClient } from './MosaicClient.js';
