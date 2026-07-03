export const QueryState: Readonly<{
    pending: symbol;
    ready: symbol;
    error: symbol;
    done: symbol;
}>;
/**
 * A query result Promise that can allows external callers
 * to resolve or reject the Promise.
 */
export class QueryResult extends Promise<any> {
    /**
     * Create a new query result Promise.
     */
    constructor();
    _resolve: any;
    _reject: any;
    _state: symbol;
    _value: any;
    /**
     * Resolve the result Promise with a prepared value or the provided value.
     * This method will only succeed if either a value is provided or the promise is ready.
     * @param {*} value The result value.
     * @returns {this}
     */
    fulfill(value: any): this;
    /**
     * Prepare to resolve with the provided value.
     * @param {*} value The result value.
     * @returns {this}
     */
    ready(value: any): this;
    /**
     * Rejects the result Promise with the provided error.
     * @param {*} error The error value.
     * @returns {this}
     */
    reject(error: any): this;
    /**
     * Returns the state of this query result.
     * @returns {symbol}
     */
    get state(): symbol;
}
