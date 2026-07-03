/**
 * Function that converts geometry data to GeoJSON format.
 * @param {import('../types.js').ExprValue} expr The input expression.
 * @returns {FunctionNode}
 */
export function geojson(expr: import("../types.js").ExprValue): FunctionNode;
/**
 * Function that returns a spatial x position (using ST_X).
 * @param {import('../types.js').ExprValue} expr The input expression.
 * @returns {FunctionNode}
 */
export function x(expr: import("../types.js").ExprValue): FunctionNode;
/**
 * Function that returns a spatial y position (using ST_Y).
 * @param {import('../types.js').ExprValue} expr The input expression.
 * @returns {FunctionNode}
 */
export function y(expr: import("../types.js").ExprValue): FunctionNode;
/**
 * Function that returns the centroid point for geometry data.
 * @param {import('../types.js').ExprValue} expr The input expression.
 * @returns {FunctionNode}
 */
export function centroid(expr: import("../types.js").ExprValue): FunctionNode;
/**
 * Function that returns the centroid x-coordinate for geometry data.
 * @param {import('../types.js').ExprValue} expr The input expression.
 * @returns {FunctionNode}
 */
export function centroidX(expr: import("../types.js").ExprValue): FunctionNode;
/**
 * Function that returns yhe centroid y-coordinate for geometry data.
 * @param {import('../types.js').ExprValue} expr The input expression.
 * @returns {FunctionNode}
 */
export function centroidY(expr: import("../types.js").ExprValue): FunctionNode;
import { FunctionNode } from '../ast/function.js';
