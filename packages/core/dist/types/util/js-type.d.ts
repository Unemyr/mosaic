/**
 * Maps a SQL data type to its corresponding JavaScript type.
 * @param {string} type The name of a SQL data type
 * @returns {import('../types.js').JSType} The corresponding JavaScript type name
 * @throws {Error} Throws an error if the given SQL type name is unsupported or unrecognized.
 */
export function jsType(type: string): import("../types.js").JSType;
