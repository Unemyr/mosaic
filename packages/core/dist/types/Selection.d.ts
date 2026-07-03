/**
 * Test if a value is a Selection instance.
 * @param {*} x The value to test.
 * @returns {x is Selection} True if the input is a Selection, false otherwise.
 */
export function isSelection(x: any): x is Selection;
/**
 * Represents a dynamic set of query filter predicates.
 */
export class Selection extends Param {
    /**
     * Create a new Selection instance with an
     * intersect (conjunction) resolution strategy.
     * @param {object} [options] The selection options.
     * @param {boolean} [options.cross=false] Boolean flag indicating
     *  cross-filtered resolution. If true, selection clauses will not
     *  be applied to the clients they are associated with.
     * @param {boolean} [options.empty=false] Boolean flag indicating if a lack
     *  of clauses should correspond to an empty selection with no records. This
     *  setting determines the default selection state.
     * @param {Selection|Selection[]} [options.include] Upstream selections whose
     *  clauses should be included as part of the new selection. Any clauses
     *  published to upstream selections will be relayed to the new selection.
     * @returns {Selection} The new Selection instance.
     */
    static intersect({ cross, empty, include }?: {
        cross?: boolean;
        empty?: boolean;
        include?: Selection | Selection[];
    }): Selection;
    /**
     * Create a new Selection instance with a
     * union (disjunction) resolution strategy.
     * @param {object} [options] The selection options.
     * @param {boolean} [options.cross=false] Boolean flag indicating
     *  cross-filtered resolution. If true, selection clauses will not
     *  be applied to the clients they are associated with.
     * @param {boolean} [options.empty=false] Boolean flag indicating if a lack
     *  of clauses should correspond to an empty selection with no records. This
     *  setting determines the default selection state.
     * @param {Selection|Selection[]} [options.include] Upstream selections whose
     *  clauses should be included as part of the new selection. Any clauses
     *  published to upstream selections will be relayed to the new selection.
     * @returns {Selection} The new Selection instance.
     */
    static union({ cross, empty, include }?: {
        cross?: boolean;
        empty?: boolean;
        include?: Selection | Selection[];
    }): Selection;
    /**
     * Create a new Selection instance with a singular resolution strategy
     * that keeps only the most recent selection clause.
     * @param {object} [options] The selection options.
     * @param {boolean} [options.cross=false] Boolean flag indicating
     *  cross-filtered resolution. If true, selection clauses will not
     *  be applied to the clients they are associated with.
     * @param {boolean} [options.empty=false] Boolean flag indicating if a lack
     *  of clauses should correspond to an empty selection with no records. This
     *  setting determines the default selection state.
     * @param {Selection|Selection[]} [options.include] Upstream selections whose
     *  clauses should be included as part of the new selection. Any clauses
     *  published to upstream selections will be relayed to the new selection.
     * @returns {Selection} The new Selection instance.
     */
    static single({ cross, empty, include }?: {
        cross?: boolean;
        empty?: boolean;
        include?: Selection | Selection[];
    }): Selection;
    /**
     * Create a new Selection instance with a
     * cross-filtered intersect resolution strategy.
     * @param {object} [options] The selection options.
     * @param {boolean} [options.empty=false] Boolean flag indicating if a lack
     *  of clauses should correspond to an empty selection with no records. This
     *  setting determines the default selection state.
     * @param {Selection|Selection[]} [options.include] Upstream selections whose
     *  clauses should be included as part of the new selection. Any clauses
     *  published to upstream selections will be relayed to the new selection.
     * @returns {Selection} The new Selection instance.
     */
    static crossfilter({ empty, include }?: {
        empty?: boolean;
        include?: Selection | Selection[];
    }): Selection;
    /**
     * Create a new Selection instance.
     * @param {SelectionResolver} [resolver] The selection resolution
     *  strategy to apply.
     * @param {Selection[]} [include] Upstream selections whose clauses
     * should be included as part of this selection. Any clauses published
     * to these upstream selections will be relayed to this selection.
     */
    constructor(resolver?: SelectionResolver, include?: Selection[]);
    _resolved: any;
    _resolver: SelectionResolver;
    /** @type {Set<Selection>} */
    _relay: Set<Selection>;
    /**
     * Create a cloned copy of this Selection instance.
     * @returns {Selection} A clone of this selection.
     */
    clone(): Selection;
    /**
     * Create a clone of this Selection with clauses corresponding
     * to the provided source removed.
     * @param {*} source The clause source to remove.
     * @returns {Selection} A cloned and updated Selection.
     */
    remove(source: any): Selection;
    /**
     * The selection clause resolver.
     */
    get resolver(): SelectionResolver;
    /**
     * Indicate if this selection has a single resolution strategy.
     */
    get single(): boolean;
    /**
     * The current array of selection clauses.
     */
    get clauses(): any;
    /**
     * The current active (most recently updated) selection clause.
     */
    get active(): any;
    /**
     * The value corresponding to a given source. Returns undefined if
     * this selection does not include a clause from this source.
     * @param {*} source The clause source to look up the value for.
     */
    valueFor(source: any): any;
    /**
     * Emit an activate event with the given selection clause.
     * @param {*} clause The clause repesenting the potential activation.
     */
    activate(clause: any): void;
    /**
     * Update the selection with a new selection clause.
     * @param {*} clause The selection clause to add.
     * @returns {this} This Selection instance.
     */
    update(clause: any): this;
    /**
     * Indicates if a selection clause should not be applied to a given client.
     * The return value depends on the selection resolution strategy.
     * @param {*} client The selection clause.
     * @param {*} clause The client to test.
     * @returns True if the client should be skipped, false otherwise.
     */
    skip(client: any, clause: any): any;
    /**
     * Return a selection query predicate for the given client.
     * @param {*} client The client whose data may be filtered.
     * @param {boolean} [noSkip=false] Disable skipping of active
     *  cross-filtered sources. If set true, the source of the active
     *  clause in a cross-filtered selection will not be skipped.
     * @returns {*} The query predicate for filtering client data,
     *  based on the current state of this selection.
     */
    predicate(client: any, noSkip?: boolean): any;
}
/**
 * Implements selection clause resolution strategies.
 */
export class SelectionResolver {
    /**
     * Create a new selection resolved instance.
     * @param {object} [options] The resolution strategy options.
     * @param {boolean} [options.union=false] Boolean flag to indicate a union strategy.
     *  If false, an intersection strategy is used.
     * @param {boolean} [options.cross=false] Boolean flag to indicate cross-filtering.
     * @param {boolean} [options.single=false] Boolean flag to indicate single clauses only.
     * @param {boolean} [options.empty=false] Boolean flag indicating if a lack
     *  of clauses should correspond to an empty selection with no records. This
     *  setting determines the default selection state.
     */
    constructor({ union, cross, single, empty }?: {
        union?: boolean;
        cross?: boolean;
        single?: boolean;
        empty?: boolean;
    });
    union: boolean;
    cross: boolean;
    single: boolean;
    empty: boolean;
    /**
     * Resolve a list of selection clauses according to the resolution strategy.
     * @param {*[]} clauseList An array of selection clauses.
     * @param {*} clause A new selection clause to add.
     * @returns {*[]} An updated array of selection clauses.
     */
    resolve(clauseList: any[], clause: any, reset?: boolean): any[];
    /**
     * Indicates if a selection clause should not be applied to a given client.
     * The return value depends on the resolution strategy.
     * @param {*} client The selection clause.
     * @param {*} clause The client to test.
     * @returns True if the client should be skipped, false otherwise.
     */
    skip(client: any, clause: any): any;
    /**
     * Return a selection query predicate for the given client.
     * @param {import('./util/selection-types.js').SelectionClause[]} clauseList
     *  An array of selection clauses.
     * @param {import('./util/selection-types.js').SelectionClause} active
     *  The current active selection clause.
     * @param {MosaicClient} client The client whose data may be filtered.
     * @returns {*} The query predicate for filtering client data,
     *  based on the current state of this selection.
     */
    predicate(clauseList: import("./util/selection-types.js").SelectionClause[], active: import("./util/selection-types.js").SelectionClause, client: MosaicClient): any;
    /**
     * Returns a filter function for queued selection updates.
     * @param {*} value The new event value that will be enqueued.
     * @returns {(value: *) => boolean|null} A dispatch queue filter
     *  function, or null if all unemitted event values should be filtered.
     */
    queueFilter(value: any): (value: any) => boolean | null;
}
import { Param } from './Param.js';
import { MosaicClient } from './MosaicClient.js';
