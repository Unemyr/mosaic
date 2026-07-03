export function load(method: any, tableName: any, fileName: any, options?: {}, defaults?: {}): string;
export function loadCSV(tableName: any, fileName: any, options: any): string;
export function loadJSON(tableName: any, fileName: any, options: any): string;
export function loadParquet(tableName: any, fileName: any, options: any): string;
/**
 * Load geometry data within a spatial file format.
 * This method requires that the DuckDB spatial extension is loaded.
 * Supports GeoJSON, TopoJSON, and other comomn spatial formats.
 * For TopoJSON, wet the layer option to indicate the feature to extract.
 */
export function loadSpatial(tableName: any, fileName: any, options?: {}): string;
export function loadObjects(tableName: any, data: any, options?: {}): string;
