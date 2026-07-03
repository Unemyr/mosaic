/**
 * @typedef {'reservoir' | 'bernoulli' | 'system'} SampleMethod
 */
export class SampleClauseNode extends SQLNode {
    /**
     * Instantiate a sample clause node.
     * @param {number} size The sample size as either a row count or percentage.
     * @param {boolean} [perc=false] Flag indicating if the sampling unit is
     *   rows (`false`) or a percentage (`true`).
     * @param {SampleMethod} [method] The sampling method. If unspecified,
     *   a default method is applied based on the sampling unit.
     * @param {number} [seed] The random seed.
     */
    constructor(size: number, perc?: boolean, method?: SampleMethod, seed?: number);
    /**
     * The sample size as either a row count or percentage.
     * @type {number}
     * @readonly
     */
    readonly size: number;
    /**
     * Flag indicating if the sampling unit is rows (`false`) or a
     * percentage (`true`).
     * @type {boolean}
     * @readonly
     */
    readonly perc: boolean;
    /**
     * The sampling method.
     * @type {SampleMethod}
     * @readonly
     */
    readonly method: SampleMethod;
    /**
     * The random seed.
     * @type {number}
     * @readonly
     */
    readonly seed: number;
}
export type SampleMethod = "reservoir" | "bernoulli" | "system";
import { SQLNode } from './node.js';
