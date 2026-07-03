/**
 * Compute line segment densities over a gridded 2D domain. The returned
 * query uses multiple subqueries (CTEs) to identify line segment end point
 * pairs, perform line rasterization in-database, normalize arc lengths,
 * and then sum results for all line series to produce a density map.
 * Based on Moritz and Fisher's work: https://arxiv.org/abs/1808.06019
 * @param {SelectQuery} q The base query over the data.
 * @param {import('../types.js').ExprValue} x Bin expression for x dimension.
 *  Provides gridded x coordinates, potentially with a fractional component.
 * @param {import('../types.js').ExprValue} y Bin expression for x dimension.
 *  Provides gridded y coordinates, potentially with a fractional component.
 * @param {string[]} z Group by columns that segment data into individual line
 *  series. An empty array indicates there is only a single line series.
 * @param {number} xn The number of grid bins for the x dimension.
 * @param {number} yn The number of grid bins for the y dimension.
 * @param {string[]} [groupby] Additional group by expressions. Separate
 *  line density maps are created for each of these groups.
 * @param {boolean} [normalize=true] Flag toggling approximate arc-length
 *  normalization to improve accuracy and reduce artifacts (default `true`).
 * @returns {SelectQuery}
 */
export function lineDensity(q: SelectQuery, x: import("../types.js").ExprValue, y: import("../types.js").ExprValue, z: string[], xn: number, yn: number, groupby?: string[], normalize?: boolean): SelectQuery;
import { SelectQuery } from '../ast/query.js';
