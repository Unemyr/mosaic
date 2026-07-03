/**
 * Test if a value is a Param instance.
 * @param {*} x The value to test.
 * @returns {x is Param} True if the input is a Param, false otherwise.
 */
export function isParam(x: any): x is Param;
/**
 * Represents a dynamic parameter that dispatches updates
 * upon parameter changes.
 */
export class Param extends AsyncDispatch {
    /**
     * Create a new Param instance with the given initial value.
     * @param {*} value The initial value of the Param.
     * @returns {Param} The new Param instance.
     */
    static value(value: any): Param;
    /**
     * Create a new Param instance over an array of initial values,
     * which may contain nested Params.
     * @param {*} values The initial values of the Param.
     * @returns {Param} The new Param instance.
     */
    static array(values: any): Param;
    /**
     * Create a new Param instance.
     * @param {*} value The initial value of the Param.
     */
    constructor(value: any);
    _value: any;
    /**
     * The current value of the Param.
     */
    get value(): any;
    /**
     * Update the Param value
     * @param {*} value The new value of the Param.
     * @param {object} [options] The update options.
     * @param {boolean} [options.force] A boolean flag indicating if the Param
     *  should emit a 'value' event even if the internal value is unchanged.
     * @returns {this} This Param instance.
     */
    update(value: any, { force }?: {
        force?: boolean;
    }): this;
}
import { AsyncDispatch } from './util/AsyncDispatch.js';
