// src/constants.js
var COLUMN_REF = "COLUMN_REF";
var COLUMN_PARAM = "COLUMN_PARAM";
var TABLE_REF = "TABLE_REF";
var LITERAL = "LITERAL";
var INTERVAL = "INTERVAL";
var ORDER_BY = "ORDER_BY";
var CAST = "CAST";
var CASE = "CASE";
var WHEN = "WHEN";
var UNARY_OPERATOR = "UNARY";
var UNARY_POSTFIX_OPERATOR = "UNARY_POSTFIX";
var BINARY_OPERATOR = "BINARY";
var BETWEEN_OPERATOR = "BETWEEN";
var NOT_BETWEEN_OPERATOR = "NOT_BETWEEN";
var LOGICAL_OPERATOR = "LOGICAL_OPERATOR";
var IN_OPERATOR = "IN";
var FUNCTION = "FUNCTION";
var AGGREGATE = "AGGREGATE";
var WINDOW = "WINDOW";
var WINDOW_DEF = "WINDOW_DEF";
var WINDOW_FRAME = "WINDOW_FRAME";
var EXPRESSION = "EXPRESSION";
var FRAGMENT = "FRAGMENT";
var VERBATIM = "VERBATIM";
var PARAM = "PARAM";
var WITH_CLAUSE = "WITH_CLAUSE";
var SELECT_CLAUSE = "SELECT_CLAUSE";
var FROM_CLAUSE = "FROM_CLAUSE";
var SAMPLE_CLAUSE = "SAMPLE_CLAUSE";
var WINDOW_CLAUSE = "WINDOW_CLAUSE";
var SELECT_QUERY = "SELECT_QUERY";
var DESCRIBE_QUERY = "DESCRIBE_QUERY";
var SET_OPERATION = "SET_OPERATION";

// src/ast/node.js
function isNode(value) {
  return value instanceof SQLNode;
}
var SQLNode = class {
  /**
   * Instantiate a SQL AST node.
   * @param {string} type The SQL AST node type.
   */
  constructor(type) {
    this.type = type;
  }
};
var ExprNode = class extends SQLNode {
};

// src/ast/literal.js
var LiteralNode = class extends ExprNode {
  /**
   * Instantiate an literal node.
   * @param {*} value The literal value.
   */
  constructor(value) {
    super(LITERAL);
    this.value = value;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return literalToSQL(this.value);
  }
};
function literalToSQL(value) {
  switch (typeof value) {
    case "number":
      return Number.isFinite(value) ? `${value}` : "NULL";
    case "string":
      return `'${value.replace(`'`, `''`)}'`;
    case "boolean":
      return value ? "TRUE" : "FALSE";
    default:
      if (value == null) {
        return "NULL";
      } else if (value instanceof Date) {
        const ts = +value;
        if (Number.isNaN(ts)) return "NULL";
        const y2 = value.getUTCFullYear();
        const m = value.getUTCMonth();
        const d = value.getUTCDate();
        return ts === Date.UTC(y2, m, d) ? `DATE '${y2}-${m + 1}-${d}'` : `epoch_ms(${ts})`;
      } else if (value instanceof RegExp) {
        return `'${value.source}'`;
      } else {
        return `${value}`;
      }
  }
}

// src/ast/param.js
var ParamNode = class extends ExprNode {
  /**
   * Instantiate a param node with a dynamic parameter.
   * @param {import('../types.js').ParamLike} param The dynamic parameter.
   */
  constructor(param) {
    super(PARAM);
    this.param = param;
  }
  /**
   * Returns the current parameter value.
   * @returns {*}
   */
  get value() {
    return this.param.value;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return literalToSQL(this.value);
  }
};

// src/util/string.js
function parseIdentifier(id) {
  return id.split(".");
}
function quoteIdentifier(value) {
  return `"${value}"`;
}
function unquote(s) {
  return s && isDoubleQuoted(s) ? s.slice(1, -1) : s;
}
function isDoubleQuoted(s) {
  return s[0] === '"' && s[s.length - 1] === '"';
}

// src/ast/table-ref.js
function isTableRef(value) {
  return value instanceof TableRefNode;
}
var TableRefNode = class extends ExprNode {
  /**
   * Instantiate a table reference node.
   * @param {string | string[]} table The table name.
   */
  constructor(table) {
    super(TABLE_REF);
    this.table = [table].flat();
  }
  /**
   * The table name without database or schema namespaces.
   * @returns {string}
   */
  get name() {
    return this.table[this.table.length - 1];
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return this.table.map((t) => quoteIdentifier(t)).join(".");
  }
};

// src/ast/function.js
var FunctionNode = class extends ExprNode {
  /**
   * Instantiate a function node.
   * @param {string} name The function name.
   * @param {ExprNode[]} [args=[]] The function arguments.
   */
  constructor(name, args = []) {
    super(FUNCTION);
    this.name = name;
    this.args = args;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    const { name, args } = this;
    return `${name}(${args.join(", ")})`;
  }
};

// src/util/function.js
function fn(name, ...args) {
  return new FunctionNode(name, argsList(args).map(asNode));
}
function aggFn(name, ...args) {
  return new AggregateNode(name, argsList(args).map(asNode));
}
function winFn(name, ...args) {
  return new WindowNode(
    new WindowFunctionNode(name, argsList(args).map(asNode))
  );
}
function exprList(list, cast2 = asNode) {
  return list.flat().filter((x2) => x2 != null).map((x2) => cast2(x2));
}
function argsList(list) {
  const n = list.length;
  let i = n;
  for (; i > 0 && list[i - 1] === void 0; --i) ;
  return i < n ? list.slice(0, i) : list;
}

// src/util/type-check.js
function isString(value) {
  return typeof value === "string";
}
function isArray(value) {
  return Array.isArray(value);
}
function isParamLike(value) {
  return value && typeof value.addEventListener === "function" && value.dynamic !== false && "value" in value;
}

// src/ast/window.js
var WindowClauseNode = class extends SQLNode {
  /**
   * Instantiate a window clause node.
   * @param {string} name The window name.
   * @param {WindowDefNode} def The window definition.
   */
  constructor(name, def) {
    super(WINDOW_CLAUSE);
    this.name = name;
    this.def = def;
  }
  toString() {
    return `${quoteIdentifier(this.name)} AS ${this.def}`;
  }
};
var WindowNode = class _WindowNode extends ExprNode {
  /**
   * Instantiate a window node.
   * @param {WindowFunctionNode | AggregateNode} func The window function call.
   * @param {WindowDefNode} [over] The window definition or name.
   */
  constructor(func, over2 = new WindowDefNode()) {
    super(WINDOW);
    this.func = func;
    this.def = over2;
  }
  /**
   * Return an updated window over a named window definition.
   * @param {string} name The window definition name.
   * @returns {WindowNode} A new window node.
   */
  over(name) {
    return new _WindowNode(this.func, this.def.over(name));
  }
  /**
   * Return an updated window with the given partitions.
   * @param {...import('../types.js').ExprVarArgs} expr The partition by criteria.
   * @returns {WindowNode} A new window node.
   */
  partitionby(...expr) {
    return new _WindowNode(this.func, this.def.partitionby(...expr));
  }
  /**
   * Return an updated window with the given ordering.
   * @param {...import('../types.js').ExprVarArgs} expr The order by criteria.
   * @returns {WindowNode} A new window node.
   */
  orderby(...expr) {
    return new _WindowNode(this.func, this.def.orderby(...expr));
  }
  /**
   * Return an updated window with the given rows frame.
   * @param {FrameExtent} extent The row-based window frame extent.
   * @returns {WindowNode} A new window node.
   */
  rows(extent) {
    return new _WindowNode(this.func, this.def.rows(extent));
  }
  /**
   * Return an updated window with the given range frame.
   * @param {FrameExtent} extent The range-based window frame extent.
   * @returns {WindowNode} A new window node.
   */
  range(extent) {
    return new _WindowNode(this.func, this.def.range(extent));
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return `${this.func} OVER ${this.def}`;
  }
};
var WindowFunctionNode = class extends FunctionNode {
  /**
   * Instantiate a window function call node.
   * @param {import('../types.js').WindowFunctionName} name The function name.
   * @param {ExprNode[]} [args=[]] The function arguments.
   */
  constructor(name, args) {
    super(name, args);
  }
};
var WindowDefNode = class extends SQLNode {
  /**
   * Instantiate a window definition node.
   * @param {string} [name] The base window definition name.
   * @param {ExprNode[]} [partition] The partition by criteria.
   * @param {ExprNode[]} [order] The order by criteria.
   * @param {WindowFrameNode} [frame] The window frame definition.
   */
  constructor(name, partition, order, frame) {
    super(WINDOW_DEF);
    this.name = name;
    this.partition = partition;
    this.order = order;
    this.frame = frame;
  }
  /**
   * Return an updated window definition with the given base name.
   * @param {string} name The base window definition name.
   * @returns {WindowDefNode} A new window definition node.
   */
  over(name) {
    return deriveDef(this, { name });
  }
  /**
   * Return an updated window definition with the given partitions.
   * @param {...import('../types.js').ExprVarArgs} expr The partition by criteria.
   * @returns {WindowDefNode} A new window definition node.
   */
  partitionby(...expr) {
    return deriveDef(this, { partition: exprList(expr) });
  }
  /**
   * Return an updated window definition with the given ordering.
   * @param {...import('../types.js').ExprVarArgs} expr The order by criteria.
   * @returns {WindowDefNode} A new window definition node.
   */
  orderby(...expr) {
    return deriveDef(this, { order: exprList(expr) });
  }
  /**
   * Return an updated window definition with the given rows frame.
   * @param {FrameExtent} extent The row-based window frame extent.
   * @returns {WindowDefNode} A new window definition node.
   */
  rows(extent) {
    return deriveDef(this, { frame: new WindowFrameNode(extent) });
  }
  /**
   * Return an updated window definition with the given range frame.
   * @param {FrameExtent} extent The range-based window frame extent.
   * @returns {WindowDefNode} A new window definition node.
   */
  range(extent) {
    return deriveDef(this, { frame: new WindowFrameNode(extent, true) });
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    const { name, partition, order, frame } = this;
    const base = name && quoteIdentifier(name);
    const def = [
      base,
      partition?.length && `PARTITION BY ${partition.join(", ")}`,
      order?.length && `ORDER BY ${order.join(", ")}`,
      frame
    ].filter((x2) => x2);
    return base && def.length < 2 ? base : `(${def.join(" ")})`;
  }
};
var WindowFrameNode = class extends SQLNode {
  /**
   * Instantiate a window frame definition node.
   * @param {FrameExtent} extent The frame extent as [preceding, following]
   *  row or interval offsets.
   * @param {boolean} [range] The frame type: `true` for range, otherwise rows.
   * @param {ExprNode} [exclude] The window exclusion criteria.
   */
  constructor(extent, range = false, exclude = void 0) {
    super(WINDOW_FRAME);
    this.extent = isParamLike(extent) ? new ParamNode(extent) : extent;
    this.range = range;
    this.exclude = exclude;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    const { range, exclude, extent } = this;
    const type = range ? "RANGE" : "ROWS";
    const [prev, next] = isNode(extent) ? extent.value : extent;
    const a = frameValue(prev, "PRECEDING");
    const b = frameValue(next, "FOLLOWING");
    return `${type} BETWEEN ${a} AND ${b}${exclude ? ` ${exclude}` : ""}`;
  }
};
function deriveDef(def, options) {
  return new WindowDefNode(
    options.name ?? def.name,
    options.partition ?? def.partition,
    options.order ?? def.order,
    options.frame ?? def.frame
  );
}
function frameValue(value, order) {
  return value === 0 ? "CURRENT ROW" : Number.isFinite(value) ? `${Math.abs(value)} ${order}` : `UNBOUNDED ${order}`;
}

// src/ast/column-ref.js
function isColumnRef(value) {
  return value instanceof ColumnRefNode;
}
var ColumnRefNode = class extends ExprNode {
  /**
   * Instantiate a column reference node.
   * @param {import('./table-ref.js').TableRefNode} [table] The table reference.
   */
  constructor(type, table) {
    super(type);
    this.table = table;
  }
  /**
   * Returns the column name.
   * @returns {string}
   */
  get column() {
    return null;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    const { column: column2, table } = this;
    const tref = `${table ?? ""}`;
    const id = column2 === "*" ? "*" : quoteIdentifier(column2);
    return (tref ? tref + "." : "") + id;
  }
};
var ColumnNameRefNode = class extends ColumnRefNode {
  /**
   * Instantiate a column reference node.
   * @param {string} name The column name.
   * @param {import('./table-ref.js').TableRefNode} [table] The table reference.
   */
  constructor(name, table) {
    super(COLUMN_REF, table);
    this.name = name;
  }
  /**
   * Returns the column name.
   * @returns {string}
   */
  get column() {
    return this.name;
  }
};

// src/ast/column-param.js
function isColumnParam(value) {
  return value instanceof ColumnParamNode;
}
var ColumnParamNode = class extends ColumnRefNode {
  /**
   * Instantiate a column param node.
   * @param {import('./param.js').ParamNode} param The column name as a
   *  parameter node.
   * @param {import('./table-ref.js').TableRefNode} [table] The table
   *  reference.
   */
  constructor(param, table) {
    super(COLUMN_PARAM, table);
    this.param = param;
  }
  /**
   * Returns the column name.
   * @returns {string}
   */
  get column() {
    return `${this.param.value}`;
  }
};

// src/functions/column.js
function column(name, table) {
  const tref = asTableRef(table);
  return isParamLike(name) ? new ColumnParamNode(new ParamNode(name), tref) : new ColumnNameRefNode(name, tref);
}

// src/ast/verbatim.js
var VerbatimNode = class extends ExprNode {
  /**
   * Instantiate a raw node with verbatim content.
   * @param {string} value The verbatim content to include.
   */
  constructor(value) {
    super(VERBATIM);
    this.value = value;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return this.value;
  }
};

// src/functions/literal.js
function literal(value) {
  return new LiteralNode(value);
}
function verbatim(value) {
  return new VerbatimNode(value);
}

// src/functions/table-ref.js
function tableRef(...ids) {
  const args = exprList(ids, String);
  return args?.length ? new TableRefNode(args) : void 0;
}

// src/util/ast.js
function asNode(value) {
  return isString(value) ? parseColumnRef(value) : asLiteral(value);
}
function asVerbatim(value) {
  return isString(value) ? verbatim(value) : asLiteral(value);
}
function asLiteral(value) {
  return value instanceof ExprNode ? value : isParamLike(value) ? new ParamNode(value) : literal(value);
}
function asTableRef(value) {
  return isString(value) ? parseTableRef(value) : isArray(value) ? tableRef(value) : value;
}
function parseColumnRef(ref) {
  const ids = parseIdentifier(ref);
  return column(ids.pop(), tableRef(ids));
}
function parseTableRef(ref) {
  return tableRef(parseIdentifier(ref));
}
function over() {
  return new WindowDefNode();
}

// src/ast/aggregate.js
var AggregateNode = class _AggregateNode extends ExprNode {
  /**
   * Instantiate an aggregate function node.
   * @param {string} name The aggregate function name.
   * @param {ExprNode[]} args The aggregate function arguments.
   * @param {boolean} [distinct] The distinct flag.
   * @param {ExprNode} [filter] Filter expression.
   */
  constructor(name, args, distinct, filter) {
    super(AGGREGATE);
    this.name = name;
    this.args = args;
    this.isDistinct = distinct;
    this.filter = filter;
  }
  /**
   * Return a new derived aggregate over distinct values.
   * @param {boolean} [isDistinct=true] The distinct flag.
   * @returns {AggregateNode} A new aggregate node.
   */
  distinct(isDistinct2 = true) {
    return new _AggregateNode(this.name, this.args, isDistinct2, this.filter);
  }
  /**
   * Return a new derived aggregate function that filters values.
   * @param {ExprNode | string} filter The filter expression.
   * @returns {AggregateNode} A new aggregate node.
   */
  where(filter) {
    if (isString(filter)) filter = asVerbatim(filter);
    return new _AggregateNode(this.name, this.args, this.isDistinct, filter);
  }
  /**
   * Return a new window function over this aggregate.
   * @returns {WindowNode} A new window node.
   */
  window() {
    return new WindowNode(this);
  }
  /**
   * Return a new window function over this aggregate with the given partitions.
   * @param {...import('../types.js').ExprVarArgs} expr The partition by criteria.
   * @returns {WindowNode} A new window node.
   */
  partitionby(...expr) {
    return this.window().partitionby(...expr);
  }
  /**
   * Return a new window function over this aggregate with the given ordering.
   * @param {...import('../types.js').ExprVarArgs} expr The order by criteria.
   * @returns {WindowNode} A new window node.
   */
  orderby(...expr) {
    return this.window().orderby(...expr);
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    const { name, args, isDistinct: isDistinct2, filter } = this;
    const dist = isDistinct2 ? "DISTINCT " : "";
    const arg = args?.length ? args.join(", ") : "*";
    const filt = filter ? ` FILTER (WHERE ${filter})` : "";
    return `${name}(${dist}${arg})${filt}`;
  }
};
var aggregateNames = [
  "any_value",
  "approx_count_distinct",
  "approx_quantile",
  "arbitrary",
  "arg_max",
  "arg_max_null",
  "arg_min",
  "arg_min_null",
  "array_agg",
  "avg",
  "bit_and",
  "bit_or",
  "bit_xor",
  "bitstring_agg",
  "bool_and",
  "bool_or",
  "corr",
  "count",
  "covar_pop",
  "covar_samp",
  "entropy",
  "favg",
  "first",
  "fsum",
  "geomean",
  "kurtosis_pop",
  "kurtosis",
  "last",
  "mad",
  "max",
  "max_by",
  "median",
  "min",
  "min_by",
  "mode",
  "product",
  "quantile",
  "quantile_cont",
  "quantile_disc",
  "regr_avgx",
  "regr_avgy",
  "regr_count",
  "regr_intercept",
  "regr_r2",
  "regr_sxx",
  "regr_sxy",
  "regr_syy",
  "regr_slope",
  "reservoir_quantile",
  "skewness",
  "stddev",
  "stddev_pop",
  "stddev_samp",
  "string_agg",
  "sum",
  "variance",
  "var_pop",
  "var_samp"
];

// src/ast/between-op.js
var AbstractBetweenOpNode = class extends ExprNode {
  /**
   * Instantiate an abstract between operator node.
   * @param {string} type The node type.
   * @param {ExprNode} expr The input expression.
   * @param {[ExprNode, ExprNode]} extent The range extent.
   */
  constructor(type, expr, extent) {
    super(type);
    this.expr = expr;
    this.extent = extent;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toSQL(op) {
    const { extent: r, expr } = this;
    return r ? `(${expr} ${op} ${r[0]} AND ${r[1]})` : "";
  }
};
var BetweenOpNode = class extends AbstractBetweenOpNode {
  /**
   * Instantiate a between operator node.
   * @param {ExprNode} expr The input expression.
   * @param {[ExprNode, ExprNode]} extent
   *  The range extent.
   */
  constructor(expr, extent) {
    super(BETWEEN_OPERATOR, expr, extent);
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return super.toSQL("BETWEEN");
  }
};
var NotBetweenOpNode = class extends AbstractBetweenOpNode {
  /**
   * Instantiate a not between operator node.
   * @param {ExprNode} expr The input expression.
   * @param {[ExprNode, ExprNode]} extent
   *  The range extent.
   */
  constructor(expr, extent) {
    super(NOT_BETWEEN_OPERATOR, expr, extent);
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return super.toSQL("NOT BETWEEN");
  }
};

// src/ast/binary-op.js
var BinaryOpNode = class extends ExprNode {
  /**
   * Instantiate a binary operator node.
   * @param {string} op The operator type.
   * @param {ExprNode} left The left input expression.
   * @param {ExprNode} right The right input expression.
   */
  constructor(op, left, right) {
    super(BINARY_OPERATOR);
    this.op = op;
    this.left = left;
    this.right = right;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return `(${this.left} ${this.op} ${this.right})`;
  }
};

// src/ast/case.js
var CaseNode = class _CaseNode extends ExprNode {
  /**
   * Instantiate a case node.
   * @param {ExprNode} [expr] An optional base expression, that comes
   *  immediately after the CASE keyword. If specified, this case statement
   *  acts like a switch statement, with WHEN expressions as values to
   *  match against the switch value rather than boolean conditions.
   * @param {WhenNode[]} [when] An array of WHEN/THEN expression nodes.
   * @param {ExprNode} [elseExpr] An ELSE expression.
   */
  constructor(expr = void 0, when = [], elseExpr = void 0) {
    super(CASE);
    this.expr = expr;
    this._when = when;
    this._else = elseExpr;
  }
  /**
   * Return a new case node with the given conditional added as
   * the last WHEN / THEN pair.
   * @param {import('../types.js').ExprValue} cond
   *  The WHEN condition expression.
   * @param {import('../types.js').ExprValue} value
   *  The THEN value expression.
   * @returns {CaseNode}
   */
  when(cond2, value) {
    return new _CaseNode(
      this.expr,
      this._when.concat(new WhenNode(asNode(cond2), asNode(value))),
      this._else
    );
  }
  /**
   * Return a new case node with the given ELSE expression.
   * @param {import('../types.js').ExprValue} expr The ELSE expression.
   * @returns {CaseNode}
   */
  else(expr) {
    return new _CaseNode(this.expr, this._when, asNode(expr));
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return "CASE " + (this.expr ? `${this.expr} ` : "") + this._when.join(" ") + (this._else ? ` ELSE ${this._else}` : "") + " END";
  }
};
var WhenNode = class extends SQLNode {
  /**
   * Instantiate a case node.
   * @param {ExprNode} when The WHEN condition expression.
   * @param {ExprNode} then The THEN value expression.
   */
  constructor(when, then) {
    super(WHEN);
    this.when = when;
    this.then = then;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return `WHEN ${this.when} THEN ${this.then}`;
  }
};

// src/ast/cast.js
var CastNode = class extends ExprNode {
  /**
   * Instantiate a cast node.
   * @param {ExprNode} expr The expression to type cast.
   * @param {string} type The type to cast to.
   */
  constructor(expr, type) {
    super(CAST);
    this.expr = expr;
    this.cast = type;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return `(${this.expr})::${this.cast}`;
  }
};

// src/ast/fragment.js
var FragmentNode = class extends ExprNode {
  /**
   * Instantiate a fragment node with arbitrary content.
   * @param {ExprNode[]} spans The consecutive parts making up the fragment.
   */
  constructor(spans) {
    super(FRAGMENT);
    this.spans = spans;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return this.spans.join("");
  }
};

// src/ast/sample.js
var SampleClauseNode = class extends SQLNode {
  /**
   * Instantiate a sample clause node.
   * @param {number} size The sample size as either a row count or percentage.
   * @param {boolean} [perc=false] Flag indicating if the sampling unit is
   *   rows (`false`) or a percentage (`true`).
   * @param {SampleMethod} [method] The sampling method. If unspecified,
   *   a default method is applied based on the sampling unit.
   * @param {number} [seed] The random seed.
   */
  constructor(size, perc = false, method = void 0, seed = void 0) {
    super(SAMPLE_CLAUSE);
    this.size = size;
    this.perc = perc;
    this.method = method;
    this.seed = seed;
  }
  toString() {
    const { size, perc, method, seed } = this;
    const unit = perc ? "%" : " ROWS";
    const s = seed != null ? `, ${seed}` : "";
    return `${size}${unit}${method ? ` (${method}${s})` : ""}`;
  }
};

// src/ast/select.js
var SelectClauseNode = class extends SQLNode {
  /**
   * Instantiate a select node.
   * @param {ExprNode} expr The select expression.
   * @param {string} alias The output name.
   */
  constructor(expr, alias) {
    super(SELECT_CLAUSE);
    this.expr = expr;
    this.alias = alias;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    const { expr, alias } = this;
    return !alias || isColumnRefFor(expr, alias) ? `${expr}` : `${expr} AS ${quoteIdentifier(alias)}`;
  }
};
function isColumnRefFor(expr, name) {
  return expr instanceof ColumnRefNode && expr.table == null && expr.column === name;
}

// src/ast/with.js
var WithClauseNode = class extends SQLNode {
  /**
   * Instantiate a with clause node for a common table expression (CTE).
   * @param {string} name The common table expression (CTE) name.
   * @param {Query} query The common table expression (CTE) query.
   */
  constructor(name, query) {
    super(WITH_CLAUSE);
    this.name = name;
    this.query = query;
  }
  toString() {
    return `"${this.name}" AS (${this.query})`;
  }
};

// src/ast/query.js
function isQuery(value) {
  return value instanceof Query;
}
function isSelectQuery(value) {
  return value instanceof SelectQuery;
}
function isDescribeQuery(value) {
  return value instanceof DescribeQuery;
}
var Query = class extends ExprNode {
  /**
   * Create a new select query with the given SELECT expressions.
   * @param {...import('../types.js').SelectExpr} expr The SELECT expressions.
   * @returns {SelectQuery}
   */
  static select(...expr) {
    return new SelectQuery().select(...expr);
  }
  /**
   * Create a new select query with the given FROM expressions.
   * @param {...import('../types.js').FromExpr} expr The FROM expressions.
   * @returns {SelectQuery}
   */
  static from(...expr) {
    return new SelectQuery().from(...expr);
  }
  /**
   * Create a new select query with the given WITH CTE queries.
   * @param {...import('../types.js').WithExpr} expr The WITH CTE queries.
   * @returns {SelectQuery}
   */
  static with(...expr) {
    return new SelectQuery().with(...expr);
  }
  /**
   * Create a new UNION set operation over the given queries.
   * @param {...Query} queries The queries.
   * @returns {SetOperation}
   */
  static union(...queries) {
    return new SetOperation("UNION", queries.flat());
  }
  /**
   * Create a new UNION ALL set operation over the given queries.
   * @param {...Query} queries The queries.
   * @returns {SetOperation}
   */
  static unionAll(...queries) {
    return new SetOperation("UNION ALL", queries.flat());
  }
  /**
   * Create a new INTERSECT set operation over the given queries.
   * @param {...Query} queries The queries.
   * @returns {SetOperation}
   */
  static intersect(...queries) {
    return new SetOperation("INTERSECT", queries.flat());
  }
  /**
   * Create a new EXCEPT set operation over the given queries.
   * @param {...Query} queries The queries.
   * @returns {SetOperation}
   */
  static except(...queries) {
    return new SetOperation("EXCEPT", queries.flat());
  }
  /**
   * Create a new describe query for the given input query.
   * @param {Query} query The query to describe.
   * @returns {DescribeQuery}
   */
  static describe(query) {
    return new DescribeQuery(query);
  }
  /**
   * Instantiate a new query.
   */
  constructor(type) {
    super(type);
    this._orderby = [];
    this._limit = void 0;
    this._offset = void 0;
    this.cteFor = null;
  }
  /**
   * Return a list of subqueries.
   * @returns {Query[]}
   */
  get subqueries() {
    return [];
  }
  /**
   * Clone this query.
   * @returns {Query}
   */
  clone() {
    return this;
  }
  /**
   * Add ORDER BY expressions.
   * @param  {...import('../types.js').OrderByExpr} expr Expressions to add.
   * @returns
   */
  orderby(...expr) {
    this._orderby = this._orderby.concat(exprList(expr));
    return this;
  }
  /**
   * Set the query result LIMIT.
   * @param {number} value The limit value.
   * @returns {this}
   */
  limit(value) {
    this._limit = Number.isFinite(value) ? value : void 0;
    return this;
  }
  /**
   * Set the query result OFFSET.
   * @param {number} value The offset value.
   * @returns {this}
   */
  offset(value) {
    this._offset = Number.isFinite(value) ? value : void 0;
    return this;
  }
};
var SelectQuery = class _SelectQuery extends Query {
  /**
   * Instantiate a new select query.
   */
  constructor() {
    super(SELECT_QUERY);
    this._with = [];
    this._select = [];
    this._from = [];
    this._where = [];
    this._sample = void 0;
    this._groupby = [];
    this._having = [];
    this._window = [];
    this._qualify = [];
  }
  /**
   * Return a list of subqueries.
   * @returns {Query[]}
   */
  get subqueries() {
    const q = this.cteFor || this;
    const w = q instanceof _SelectQuery ? q._with : [];
    const cte = w.reduce((obj, c) => (obj[c.name] = c.query, obj), {});
    const queries = [];
    this._from.forEach(({ expr }) => {
      if (isQuery(expr)) {
        queries.push(expr);
      } else if (isTableRef(expr)) {
        const subq = cte[expr.name];
        if (subq) queries.push(subq);
      }
    });
    return queries;
  }
  /**
   * Clone this query.
   * @returns {SelectQuery}
   */
  clone() {
    return Object.assign(new _SelectQuery(), this);
  }
  /**
   * Add WITH common table expressions (CTEs).
   * @param  {...import('../types.js').WithExpr} expr Expressions to add.
   * @returns {this}
   */
  with(...expr) {
    const list = [];
    const add2 = (name, q) => {
      const query = q.clone();
      query.cteFor = this;
      list.push(new WithClauseNode(name, query));
    };
    expr.flat().forEach((e) => {
      if (e != null) for (const name in e) add2(name, e[name]);
    });
    this._with = this._with.concat(list);
    return this;
  }
  /**
   * Add SELECT expressions.
   * @param {...import('../types.js').SelectExpr} expr Expressions to add.
   * @returns {this}
   */
  select(...expr) {
    const list = [];
    const add2 = (v, as) => list.push(
      new SelectClauseNode(v == null ? v : asNode(v), unquote(as))
    );
    expr.flat().forEach((e) => {
      if (e == null) return;
      else if (isString(e)) add2(e, e);
      else if (isColumnRef(e)) add2(e, e.column);
      else if (isArray(e)) add2(e[1], e[0]);
      else for (const alias in e) add2(e[alias], alias);
    });
    const keys = new Set(list.map((x2) => x2.alias));
    this._select = this._select.filter((x2) => !keys.has(x2.alias)).concat(list.filter((x2) => x2.expr));
    return this;
  }
  /**
   * Set SELECT expressions, replacing any prior expressions.
   * @param {...import('../types.js').SelectExpr} expr Expressions to add.
   * @returns {this}
   */
  setSelect(...expr) {
    this._select = [];
    return this.select(...expr);
  }
  /**
   * Indicate if this query should retrieve distinct values only.
   * @param {boolean} value The distinct flag
   * @returns {this}
   */
  distinct(value = true) {
    this._distinct = !!value;
    return this;
  }
  /**
   * Add table FROM expressions.
   * @param  {...import('../types.js').FromExpr} expr Expressions to add.
   * @returns {this}
   */
  from(...expr) {
    const list = [];
    const add2 = (v, as) => list.push(new FromClauseNode(asTableRef(v), unquote(as)));
    expr.flat().forEach((e) => {
      if (e == null) return;
      else if (isString(e)) add2(e, e);
      else if (isTableRef(e)) add2(e, e.name);
      else if (isNode(e)) add2(e);
      else if (isArray(e)) add2(e[1], e[0]);
      else for (const alias in e) add2(e[alias], alias);
    });
    this._from = this._from.concat(list);
    return this;
  }
  /**
   * Set FROM expressions, replacing any prior expressions.
   * @param {...import('../types.js').FromExpr} expr Expressions to add.
   * @returns {this}
   */
  setFrom(...expr) {
    this._from = [];
    return this.from(...expr);
  }
  /**
   * Set SAMPLE settings.
   * @param {number | SampleClauseNode} value Either a sample clause node
   *  or the sample size as either a row count or percentage.
   * @param {import('./sample.js').SampleMethod} [method] The sampling method
   *  to use.
   * @param {number} [seed] The random seed.
   * @returns {this}
   */
  sample(value, method, seed) {
    let clause;
    if (typeof value === "number") {
      const perc = value > 0 && value < 1;
      const size = perc ? value * 100 : Math.floor(value);
      clause = new SampleClauseNode(size, perc, method, seed);
    } else {
      clause = value;
    }
    this._sample = clause;
    return this;
  }
  /**
   * Add WHERE expressions.
   * @param  {...import('../types.js').FilterExpr} expr Expressions to add.
   * @returns {this}
   */
  where(...expr) {
    this._where = this._where.concat(exprList(expr, asVerbatim));
    return this;
  }
  /**
   * Set WHERE expressions, replacing any prior expressions.
   * @param {...import('../types.js').FilterExpr} expr Expressions to add.
   * @returns {this}
   */
  setWhere(...expr) {
    this._where = [];
    return this.where(...expr);
  }
  /**
   * Add GROUP BY expressions.
   * @param  {...import('../types.js').GroupByExpr} expr Expressions to add.
   * @returns {this}
   */
  groupby(...expr) {
    this._groupby = this._groupby.concat(exprList(expr));
    return this;
  }
  /**
   * Set GROUP BY expressions, replacing any prior expressions.
   * @param {...import('../types.js').GroupByExpr} expr Expressions to add.
   * @returns {this}
   */
  setGroupby(...expr) {
    this._groupby = [];
    return this.groupby(...expr);
  }
  /**
   * Add HAVING expressions.
   * @param {...import('../types.js').FilterExpr} expr Expressions to add.
   * @returns {this}
   */
  having(...expr) {
    this._having = this._having.concat(exprList(expr, asVerbatim));
    return this;
  }
  /**
   * Add WINDOW definitions.
   * @param  {...any} expr Expressions to add.
   * @returns {this}
   */
  window(...expr) {
    const list = [];
    expr.flat().forEach((e) => {
      if (e != null) for (const name in e) {
        list.push(new WindowClauseNode(unquote(name), e[name]));
      }
    });
    this._window = this._window.concat(list);
    return this;
  }
  /**
   * Add QUALIFY expressions.
   * @param {...import('../types.js').FilterExpr} expr Expressions to add.
   * @returns {this}
   */
  qualify(...expr) {
    this._qualify = this._qualify.concat(exprList(expr, asVerbatim));
    return this;
  }
  /**
   * Generate a SQL query string.
   * @returns {string}
   */
  toString() {
    const {
      _with,
      _select,
      _distinct,
      _from,
      _sample,
      _where,
      _groupby,
      _having,
      _window,
      _qualify,
      _orderby,
      _limit,
      _offset
    } = this;
    const sql2 = [];
    if (_with.length) sql2.push(`WITH ${_with.join(", ")}`);
    sql2.push(`SELECT${_distinct ? " DISTINCT" : ""} ${_select.join(", ")}`);
    if (_from.length) sql2.push(`FROM ${_from.join(", ")}`);
    if (_where.length) {
      const clauses = _where.map(String).filter((x2) => x2).join(" AND ");
      if (clauses) sql2.push(`WHERE ${clauses}`);
    }
    if (_sample) sql2.push(`USING SAMPLE ${_sample}`);
    if (_groupby.length) {
      sql2.push(`GROUP BY ${_groupby.join(", ")}`);
    }
    if (_having.length) {
      const clauses = _having.map(String).filter((x2) => x2).join(" AND ");
      if (clauses) sql2.push(`HAVING ${clauses}`);
    }
    if (_window.length) sql2.push(`WINDOW ${_window.join(", ")}`);
    if (_qualify.length) {
      const clauses = _qualify.map(String).filter((x2) => x2).join(" AND ");
      if (clauses) sql2.push(`QUALIFY ${clauses}`);
    }
    if (_orderby.length) sql2.push(`ORDER BY ${_orderby.join(", ")}`);
    if (Number.isFinite(_limit)) sql2.push(`LIMIT ${_limit}`);
    if (Number.isFinite(_offset)) sql2.push(`OFFSET ${_offset}`);
    return sql2.join(" ");
  }
};
var DescribeQuery = class _DescribeQuery extends SQLNode {
  /**
   * Instantiate a describe query.
   */
  constructor(query) {
    super(DESCRIBE_QUERY);
    this.query = query;
  }
  /**
   * Clone this describe query.
   * @returns {DescribeQuery}
   */
  clone() {
    return new _DescribeQuery(this.query.clone());
  }
  /**
   * Generate a SQL query string.
   * @returns {string}
   */
  toString() {
    return `DESCRIBE ${this.query}`;
  }
};
var SetOperation = class _SetOperation extends Query {
  /**
   * Instantiate a new set operation instance.
   * @param {string} op The set operation.
   * @param {Query[]} queries The subqueries.
   */
  constructor(op, queries) {
    super(SET_OPERATION);
    this.op = op;
    this.queries = queries;
  }
  /**
   * Return a list of subqueries.
   * @returns {Query[]}
   */
  get subqueries() {
    const { queries, cteFor } = this;
    if (cteFor) queries.forEach((q) => q.cteFor = cteFor);
    return queries;
  }
  /**
   * Clone this set operation.
   * @returns {SetOperation}
   */
  clone() {
    const { op, queries, ...rest } = this;
    return Object.assign(new _SetOperation(op, queries), rest);
  }
  /**
   * Generate a SQL query string.
   * @returns {string}
   */
  toString() {
    const { op, queries, _orderby, _limit, _offset } = this;
    const sql2 = [queries.join(` ${op} `)];
    if (_orderby.length) sql2.push(`ORDER BY ${_orderby.join(", ")}`);
    if (Number.isFinite(_limit)) sql2.push(`LIMIT ${_limit}`);
    if (Number.isFinite(_offset)) sql2.push(`OFFSET ${_offset}`);
    return sql2.join(" ");
  }
};

// src/ast/from.js
var FromClauseNode = class extends SQLNode {
  /**
   * Instantiate a from node.
   * @param {SQLNode} expr The from expression.
   * @param {string} alias The output name.
   */
  constructor(expr, alias) {
    super(FROM_CLAUSE);
    this.expr = expr;
    this.alias = alias;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    const { expr, alias } = this;
    const ref = isQuery(expr) ? `(${expr})` : `${expr}`;
    return alias && !(isTableRef(expr) && expr.table.join(".") === alias) ? `${ref} AS ${quoteIdentifier(alias)}` : `${ref}`;
  }
};

// src/ast/in-op.js
var InOpNode = class extends ExprNode {
  /**
   * Instantiate an in operator node.
   * @param {ExprNode} expr The input expression.
   * @param {ExprNode[]} values The value set.
   */
  constructor(expr, values) {
    super(IN_OPERATOR);
    this.expr = expr;
    this.values = values;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return `(${this.expr} IN (${this.values.join(", ")}))`;
  }
};

// src/ast/interval.js
var IntervalNode = class extends ExprNode {
  /**
   * Instantiate an interval node.
   * @param {string} name The interval name.
   * @param {number} [steps=1] The interval steps.
   */
  constructor(name, steps = 1) {
    super(INTERVAL);
    this.name = name;
    this.steps = steps;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return `INTERVAL ${this.steps} ${this.name}`;
  }
};

// src/ast/logical-op.js
var LogicalOpNode = class extends ExprNode {
  /**
   * Instantiate a logical operator node.
   * @param {string} op The logical operation.
   * @param {T[]} clauses The input clause expressions.
   */
  constructor(op, clauses) {
    super(LOGICAL_OPERATOR);
    this.op = op;
    this.clauses = clauses;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    const c = this.clauses;
    return c.length === 0 ? "" : c.length === 1 ? `${c[0]}` : `(${c.join(` ${this.op} `)})`;
  }
};
var AndNode = class extends LogicalOpNode {
  /**
   * Instantiate a logical AND operator node.
   * @param {T[]} clauses The input clause expressions.
   */
  constructor(clauses) {
    super("AND", clauses);
  }
};
var OrNode = class extends LogicalOpNode {
  /**
   * Instantiate a logical OR operator node.
   * @param {T[]} clauses The input clause expressions.
   */
  constructor(clauses) {
    super("OR", clauses);
  }
};

// src/ast/order-by.js
var OrderByNode = class extends ExprNode {
  /**
   * Instantiate an order by entry node.
   * @param {ExprNode} expr The expression to order by.
   * @param {boolean | undefined} [desc] Flag indicating descending order.
   * @param {boolean | undefined} [nullsFirst] Flag indicating if null
   *  values should be sorted first.
   */
  constructor(expr, desc2, nullsFirst) {
    super(ORDER_BY);
    this.expr = expr;
    this.desc = desc2;
    this.nullsFirst = nullsFirst;
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    const { expr, desc: desc2, nullsFirst } = this;
    const dir = desc2 ? " DESC" : desc2 === false ? " ASC" : "";
    const nf = nullsFirst ? " NULLS FIRST" : nullsFirst === false ? " NULLS LAST" : "";
    return `${expr}${dir}${nf}`;
  }
};

// src/ast/unary-op.js
var AbstractUnaryOpNode = class extends ExprNode {
  /**
   * Instantiate an abstract unary operator node.
   * @param {string} type The node type.
   * @param {string} op The operator type.
   * @param {ExprNode} expr The input expression.
   */
  constructor(type, op, expr) {
    super(type);
    this.op = op;
    this.expr = expr;
  }
};
var UnaryOpNode = class extends AbstractUnaryOpNode {
  /**
   * Instantiate a unary operator node.
   * @param {string} op The operator type.
   * @param {ExprNode} expr The input expression.
   */
  constructor(op, expr) {
    super(UNARY_OPERATOR, op, expr);
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return `(${this.op} ${this.expr})`;
  }
};
var UnaryPosftixOpNode = class extends AbstractUnaryOpNode {
  /**
   * Instantiate a unary operator node.
   * @param {string} op The operator type.
   * @param {ExprNode} expr The input expression.
   */
  constructor(op, expr) {
    super(UNARY_POSTFIX_OPERATOR, op, expr);
  }
  /**
   * Generate a SQL query string for this node.
   * @returns {string}
   */
  toString() {
    return `(${this.expr} ${this.op})`;
  }
};

// src/functions/aggregate.js
function argmax(y2, x2) {
  return aggFn("arg_max", y2, x2);
}
function argmin(y2, x2) {
  return aggFn("arg_min", y2, x2);
}
function arrayAgg(expr) {
  return aggFn("array_agg", expr);
}
function avg(expr) {
  return aggFn("avg", expr);
}
function corr(x2, y2) {
  return aggFn("corr", x2, y2);
}
function count(expr) {
  return aggFn("count", expr);
}
function covariance(x2, y2) {
  return aggFn("covar_samp", x2, y2);
}
function covarPop(x2, y2) {
  return aggFn("covar_pop", x2, y2);
}
function entropy(expr) {
  return aggFn("entropy", expr);
}
function first(expr) {
  return aggFn("first", expr);
}
function kurtosis(expr) {
  return aggFn("kurtosis", expr);
}
function mad(expr) {
  return aggFn("mad", expr);
}
function max(expr) {
  return aggFn("max", expr);
}
function median(expr) {
  return aggFn("median", expr);
}
function min(expr) {
  return aggFn("min", expr);
}
function mode(expr) {
  return aggFn("mode", expr);
}
function last(expr) {
  return aggFn("last", expr);
}
function product(expr) {
  return aggFn("product", expr);
}
function quantile(expr, p) {
  return aggFn("quantile", expr, p);
}
function regrAvgX(x2, y2) {
  return aggFn("regr_avgx", x2, y2);
}
function regrAvgY(x2, y2) {
  return aggFn("regr_avgy", x2, y2);
}
function regrCount(x2, y2) {
  return aggFn("regr_count", x2, y2);
}
function regrIntercept(x2, y2) {
  return aggFn("regr_intercept", x2, y2);
}
function regrR2(x2, y2) {
  return aggFn("regr_r2", x2, y2);
}
function regrSXX(x2, y2) {
  return aggFn("regr_sxx", x2, y2);
}
function regrSXY(x2, y2) {
  return aggFn("regr_sxy", x2, y2);
}
function regrSYY(x2, y2) {
  return aggFn("regr_syy", x2, y2);
}
function regrSlope(x2, y2) {
  return aggFn("regr_slope", x2, y2);
}
function skewness(expr) {
  return aggFn("skewness", expr);
}
function stddev(expr) {
  return aggFn("stddev", expr);
}
function stddevPop(expr) {
  return aggFn("stddev_pop", expr);
}
function stringAgg(expr) {
  return aggFn("string_agg", expr);
}
function sum(expr) {
  return aggFn("sum", expr);
}
function variance(expr) {
  return aggFn("var_samp", expr);
}
function varPop(expr) {
  return aggFn("var_pop", expr);
}

// src/functions/case.js
function cond(when, then, other) {
  return when ? new CaseNode(void 0, [new WhenNode(asNode(when), asNode(then))], asNode(other)) : new CaseNode();
}

// src/functions/cast.js
function cast(expr, type) {
  return new CastNode(asNode(expr), type);
}
function int32(expr) {
  return cast(expr, "INTEGER");
}
function float32(expr) {
  return cast(expr, "FLOAT");
}
function float64(expr) {
  return cast(expr, "DOUBLE");
}

// src/functions/datetime.js
function interval(unit, steps) {
  return new IntervalNode(unit, steps);
}
function epoch_ms(expr) {
  return fn("epoch_ms", expr);
}
function dateBin(expr, unit, steps = 1) {
  return fn("time_bucket", interval(unit, steps), expr);
}
function dateMonth(expr) {
  return fn("make_date", 2012, fn("month", expr), 1);
}
function dateMonthDay(expr) {
  const d = asNode(expr);
  return fn("make_date", 2012, fn("month", d), fn("day", d));
}
function dateDay(expr) {
  return fn("make_date", 2012, 1, fn("day", expr));
}

// src/functions/numeric.js
function isNaN(expr) {
  return fn("isnan", expr);
}
function isFinite(expr) {
  return fn("isfinite", expr);
}
function isInfinite(expr) {
  return fn("isinf", expr);
}
function greatest(...expr) {
  return fn("greatest", ...expr);
}
function least(...expr) {
  return fn("least", ...expr);
}
function exp(expr) {
  return fn("exp", expr);
}
function log(expr) {
  return fn("log", expr);
}
function ln(expr) {
  return fn("ln", expr);
}
function sign(expr) {
  return fn("sign", expr);
}
function abs(expr) {
  return fn("abs", expr);
}
function sqrt(expr) {
  return fn("sqrt", expr);
}
function ceil(expr) {
  return fn("ceil", expr);
}
function floor(expr) {
  return fn("floor", expr);
}
function round(expr, places) {
  return fn("round", expr, places);
}
function trunc(expr) {
  return fn("trunc", expr);
}

// src/functions/operators.js
function unaryOp(op, expr) {
  return new UnaryOpNode(op, asNode(expr));
}
function unaryPostfixOp(op, expr) {
  return new UnaryPosftixOpNode(op, asNode(expr));
}
function binaryOp(op, left, right) {
  return new BinaryOpNode(op, asNode(left), asNode(right));
}
function betweenOp(expr, extent, negate = false) {
  const Op = negate ? NotBetweenOpNode : BetweenOpNode;
  return new Op(asNode(expr), extent?.map(asNode));
}
function and(...clauses) {
  return new AndNode(exprList(clauses));
}
function or(...clauses) {
  return new OrNode(exprList(clauses));
}
function not(expr) {
  return unaryOp("NOT", expr);
}
function isNull(expr) {
  return unaryPostfixOp("IS NULL", expr);
}
function isNotNull(expr) {
  return unaryPostfixOp("IS NOT NULL", expr);
}
function bitNot(expr) {
  return unaryOp("~", expr);
}
function bitAnd(left, right) {
  return binaryOp("&", left, right);
}
function bitOr(left, right) {
  return binaryOp("|", left, right);
}
function bitLeft(left, right) {
  return binaryOp("<<", left, right);
}
function bitRight(left, right) {
  return binaryOp(">>", left, right);
}
function add(left, right) {
  return binaryOp("+", left, right);
}
function sub(left, right) {
  return binaryOp("-", left, right);
}
function mul(left, right) {
  return binaryOp("*", left, right);
}
function div(left, right) {
  return binaryOp("/", left, right);
}
function idiv(left, right) {
  return binaryOp("//", left, right);
}
function mod(left, right) {
  return binaryOp("%", left, right);
}
function pow(left, right) {
  return binaryOp("**", left, right);
}
function eq(left, right) {
  return binaryOp("=", left, right);
}
function neq(left, right) {
  return binaryOp("<>", left, right);
}
function lt(left, right) {
  return binaryOp("<", left, right);
}
function gt(left, right) {
  return binaryOp(">", left, right);
}
function lte(left, right) {
  return binaryOp("<=", left, right);
}
function gte(left, right) {
  return binaryOp(">=", left, right);
}
function isDistinct(left, right) {
  return binaryOp("IS DISTINCT FROM", left, right);
}
function isNotDistinct(left, right) {
  return binaryOp("IS NOT DISTINCT FROM", left, right);
}
function isBetween(expr, extent) {
  return betweenOp(expr, extent, false);
}
function isNotBetween(expr, extent) {
  return betweenOp(expr, extent, true);
}
function isIn(expr, values) {
  return new InOpNode(asNode(expr), values.map(asNode));
}

// src/functions/order-by.js
function asc(expr, nullsFirst) {
  return new OrderByNode(asNode(expr), false, nullsFirst);
}
function desc(expr, nullsFirst) {
  return new OrderByNode(asNode(expr), true, nullsFirst);
}

// src/functions/spatial.js
function geojson(expr) {
  return fn("st_asgeojson", expr);
}
function x(expr) {
  return fn("st_x", expr);
}
function y(expr) {
  return fn("st_y", expr);
}
function centroid(expr) {
  return fn("st_centroid", expr);
}
function centroidX(expr) {
  return x(centroid(expr));
}
function centroidY(expr) {
  return y(centroid(expr));
}

// src/functions/sql-template-tag.js
function sql(strings, ...exprs) {
  return new FragmentNode(parseSQL(strings, exprs));
}
function parseSQL(strings, exprs) {
  const spans = [strings[0]];
  const n = exprs.length;
  for (let i = 0, k = 0; i < n; ) {
    const e = exprs[i];
    if (isNode(e)) {
      spans[++k] = e;
    } else if (isParamLike(e)) {
      spans[++k] = new ParamNode(e);
    } else {
      spans[k] += isString(e) ? e : literal(e);
    }
    const s = strings[++i];
    if (isNode(spans[k])) {
      spans[++k] = s;
    } else {
      spans[k] += s;
    }
  }
  return spans.filter((s) => s).map((s) => isString(s) ? new VerbatimNode(s) : s);
}

// src/functions/string.js
function strFn(name, expr, ...args) {
  return fn(name, expr, ...argsList(args).map(asLiteral));
}
function regexp_matches(string, pattern, options) {
  return strFn("regexp_matches", string, pattern, options);
}
function contains(string, search_string) {
  return strFn("contains", string, search_string);
}
function prefix(string, search_string) {
  return strFn("starts_with", string, search_string);
}
function suffix(string, search_string) {
  return strFn("ends_with", string, search_string);
}
function lower(string) {
  return strFn("lower", string);
}
function upper(string) {
  return strFn("upper", string);
}
function length(value) {
  return strFn("length", value);
}

// src/functions/window.js
function row_number() {
  return winFn("row_number");
}
function rank() {
  return winFn("rank");
}
function dense_rank() {
  return winFn("dense_rank");
}
function percent_rank() {
  return winFn("percent_rank");
}
function cume_dist() {
  return winFn("cume_dist");
}
function ntile(num_buckets) {
  return winFn("ntile", num_buckets);
}
function lag(expr, offset, defaultValue) {
  return winFn("lag", expr, offset, defaultValue);
}
function lead(expr, offset, defaultValue) {
  return winFn("lead", expr, offset, defaultValue);
}
function first_value(expr) {
  return winFn("first_value", expr);
}
function last_value(expr) {
  return winFn("last_value", expr);
}
function nth_value(expr, nth) {
  return winFn("nth_value", expr, nth);
}

// src/visit/recurse.js
var recurse = {
  [AGGREGATE]: ["args", "filter"],
  [BETWEEN_OPERATOR]: ["expr", "extent"],
  [BINARY_OPERATOR]: ["left", "right"],
  [CASE]: ["expr", "_when", "_else"],
  [CAST]: ["expr"],
  [COLUMN_PARAM]: ["param", "table"],
  [COLUMN_REF]: ["table"],
  [DESCRIBE_QUERY]: ["query"],
  [EXPRESSION]: ["node"],
  [FRAGMENT]: ["spans"],
  [FROM_CLAUSE]: ["expr"],
  [FUNCTION]: ["args"],
  [IN_OPERATOR]: ["expr", "values"],
  [LOGICAL_OPERATOR]: ["clauses"],
  [NOT_BETWEEN_OPERATOR]: ["expr", "extent"],
  [ORDER_BY]: ["expr"],
  [PARAM]: ["value"],
  [SELECT_CLAUSE]: ["expr"],
  [SELECT_QUERY]: ["_with", "_select", "_from", "_where", "_sample", "_groupby", "_having", "_window", "_qualify", "_orderby"],
  [SET_OPERATION]: ["subqueries", "_orderby"],
  [UNARY_OPERATOR]: ["expr"],
  [WHEN]: ["when", "then"],
  [WINDOW]: ["func", "def"],
  [WINDOW_CLAUSE]: ["def"],
  [WINDOW_DEF]: ["partition", "order", "frame"],
  [WINDOW_FRAME]: ["extent"]
};

// src/visit/rewrite.js
function rewrite(node, map) {
  if (map.has(node)) {
    return map.get(node);
  } else if (isNode(node)) {
    const props = recurse[node.type];
    const n = props?.length ?? 0;
    for (let i = 0; i < n; ++i) {
      const prop = props[i];
      const child = node[prop];
      if (Array.isArray(child)) {
        const m = child.length;
        for (let j = 0; j < m; ++j) {
          child[j] = rewrite(child[j], map);
        }
      } else if (child) {
        node[prop] = rewrite(child, map);
      }
    }
  }
  return node;
}

// src/visit/walk.js
function walk(node, visit) {
  if (!isNode(node)) return;
  const result = visit(node);
  if (result) return result;
  const props = recurse[node.type];
  const n = props?.length ?? 0;
  for (let i = 0; i < n; ++i) {
    const value = node[props[i]];
    if (Array.isArray(value)) {
      const m = value.length;
      for (let j = 0; j < m; ++j) {
        if (value[j] && +walk(value[j], visit) < 0) {
          return result;
        }
      }
    } else if (value && +walk(value, visit) < 0) {
      return -1;
    }
  }
}

// src/visit/visitors.js
var aggrRegExp = new RegExp(`^(${aggregateNames.join("|")})$`);
var funcRegExp = /(\\'|\\"|"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\w+\()/g;
function hasVerbatimAggregate(s) {
  return s.split(funcRegExp).some((tok) => tok.endsWith("(") && aggrRegExp.test(tok.slice(0, -1)));
}
function isAggregateExpression(root) {
  let agg = 0;
  walk(root, (node) => {
    switch (node.type) {
      case WINDOW:
        return -1;
      // aggs can't include windows
      case AGGREGATE:
        agg |= 1;
        return -1;
      case FRAGMENT:
      case VERBATIM: {
        let s = `${node}`.toLowerCase();
        const sub2 = s.indexOf("(select ");
        if (sub2 >= 0) s = s.slice(0, sub2);
        if (s.includes(") over ")) return -1;
        if (hasVerbatimAggregate(s)) {
          agg |= 2;
          return -1;
        }
        return 1;
      }
    }
  });
  return agg;
}
function collectAggregates(root) {
  const aggs = /* @__PURE__ */ new Set();
  walk(root, (node) => {
    if (node.type === AGGREGATE) {
      aggs.add(node);
    }
  });
  return Array.from(aggs);
}
function collectColumns(root) {
  const cols = {};
  walk(root, (node) => {
    if (node.type === COLUMN_REF || node.type === COLUMN_PARAM) {
      cols[node] = node;
    }
  });
  return Object.values(cols);
}
function collectParams(root) {
  const params = /* @__PURE__ */ new Set();
  walk(root, (node) => {
    if (node.type === PARAM) {
      params.add(
        /** @type {import('../ast/param.js').ParamNode} */
        node.param
      );
    }
  });
  return Array.from(params);
}

// src/load/create.js
function createTable(name, query, {
  replace = false,
  temp = false,
  view = false
} = {}) {
  return "CREATE" + (replace ? " OR REPLACE " : " ") + (temp ? "TEMP " : "") + (view ? "VIEW" : "TABLE") + (replace ? " " : " IF NOT EXISTS ") + name + " AS " + query;
}
function createSchema(name, {
  strict = false
} = {}) {
  return "CREATE SCHEMA " + (strict ? "" : "IF NOT EXISTS ") + name;
}

// src/load/extension.js
function loadExtension(name) {
  return `INSTALL ${name}; LOAD ${name}`;
}

// src/load/sql-from.js
function sqlFrom(data, {
  columns = Object.keys(data?.[0] || {})
} = {}) {
  let keys = [];
  if (Array.isArray(columns)) {
    keys = columns;
    columns = keys.reduce((m, k) => (m[k] = k, m), {});
  } else if (columns) {
    keys = Object.keys(columns);
  }
  if (!keys.length) {
    throw new Error("Can not create table from empty column set.");
  }
  const subq = [];
  for (const datum of data) {
    const sel = keys.map((k) => `${asLiteral(datum[k])} AS "${columns[k]}"`);
    subq.push(`(SELECT ${sel.join(", ")})`);
  }
  return subq.join(" UNION ALL ");
}

// src/load/load.js
function load(method, tableName, fileName, options = {}, defaults = {}) {
  const { select = ["*"], where, view, temp, replace, ...file } = options;
  const params = parameters({ ...defaults, ...file });
  const read = `${method}('${fileName}'${params ? ", " + params : ""})`;
  const filter = where ? ` WHERE ${where}` : "";
  const query = `SELECT ${select.join(", ")} FROM ${read}${filter}`;
  return createTable(tableName, query, { view, temp, replace });
}
function loadCSV(tableName, fileName, options) {
  return load("read_csv", tableName, fileName, options, { auto_detect: true, sample_size: -1 });
}
function loadJSON(tableName, fileName, options) {
  return load("read_json", tableName, fileName, options, { auto_detect: true, format: "auto" });
}
function loadParquet(tableName, fileName, options) {
  return load("read_parquet", tableName, fileName, options);
}
function loadSpatial(tableName, fileName, options = {}) {
  const { options: opt, ...rest } = options;
  if (opt) {
    const open = Array.isArray(opt) ? opt.join(", ") : typeof opt === "string" ? opt : Object.entries(opt).map(([key, value]) => `${key}=${value}`).join(", ");
    Object.assign(rest, { open_options: open.toUpperCase() });
  }
  return load("st_read", tableName, fileName, rest);
}
function loadObjects(tableName, data, options = {}) {
  const { select = ["*"], ...opt } = options;
  const values = sqlFrom(data);
  const query = select.length === 1 && select[0] === "*" ? values : `SELECT ${select} FROM ${values}`;
  return createTable(tableName, query, opt);
}
function parameters(options) {
  return Object.entries(options).map(([key, value]) => `${key}=${toDuckDBValue(value)}`).join(", ");
}
function toDuckDBValue(value) {
  switch (typeof value) {
    case "boolean":
      return String(value);
    case "string":
      return `'${value}'`;
    case "undefined":
    case "object":
      if (value == null) {
        return "NULL";
      } else if (Array.isArray(value)) {
        return "[" + value.map((v) => toDuckDBValue(v)).join(", ") + "]";
      } else {
        return "{" + Object.entries(value).map(([k, v]) => `'${k}': ${toDuckDBValue(v)}`).join(", ") + "}";
      }
    default:
      return value;
  }
}

// src/transforms/bin-1d.js
function bin1d(x2, lo, hi, bins, reverse) {
  const diff = reverse ? sub(hi, float64(x2)) : sub(float64(x2), lo);
  const scale = hi === lo ? 0 : bins / (hi - lo);
  return scale ? mul(diff, float64(scale)) : diff;
}

// src/transforms/bin-2d.js
function bin2d(q, xp, yp, aggs, xn, groupby) {
  return q.select({
    index: add(int32(floor(xp)), mul(int32(floor(yp)), xn)),
    ...aggs
  }).groupby("index", groupby);
}

// src/transforms/bin-linear-1d.js
function binLinear1d(query, x2, weight = void 0, groupby = []) {
  const w = weight ? (x3) => mul(x3, weight) : (x3) => x3;
  const p0 = floor(x2);
  const p1 = add(p0, 1);
  return Query.from(Query.unionAll(
    query.clone().select({ i: int32(p0), w: w(sub(p1, x2)) }),
    query.clone().select({ i: int32(p1), w: w(sub(x2, p0)) })
  )).select({ index: "i", density: sum("w") }, groupby).groupby("index", groupby).having(neq("density", 0));
}

// src/transforms/bin-linear-2d.js
function identity(x2) {
  return x2;
}
function binLinear2d(q, xp, yp, weight, xn, groupby = []) {
  const w = weight ? (x2) => mul(x2, weight) : identity;
  const subq = (i, w2) => q.clone().select({ xp, yp, i, w: w2 });
  const index = (x2, y2) => add(x2, mul(y2, xn));
  const xu = int32(floor(xp));
  const yu = int32(floor(yp));
  const xv = add(xu, 1);
  const yv = add(yu, 1);
  const xpu = sub(xp, xu);
  const xvp = sub(xv, xp);
  const ypu = sub(yp, yu);
  const yvp = sub(yv, yp);
  return Query.from(Query.unionAll(
    // grid[xu + yu * xn] += (xv - xp) * (yv - yp) * wi
    subq(index(xu, yu), w(mul(xvp, yvp))),
    // grid[xu + yv * xn] += (xv - xp) * (yp - yu) * wi
    subq(index(xu, yv), w(mul(xvp, ypu))),
    // grid[xv + yu * xn] += (xp - xu) * (yv - yp) * wi
    subq(index(xv, yu), w(mul(xpu, yvp))),
    // grid[xv + yv * xn] += (xp - xu) * (yp - yu) * wi
    subq(index(xv, yv), w(mul(xpu, ypu)))
  )).select({ index: "i", density: sum("w") }, groupby).groupby("index", groupby).having(neq("density", 0));
}

// src/transforms/line-density.js
function lineDensity(q, x2, y2, z, xn, yn, groupby = [], normalize = true) {
  q.select({
    x: int32(floor(x2)),
    y: int32(floor(y2))
  });
  const groups = groupby.concat(z);
  const pairs = Query.from(q).select(groups, {
    x0: "x",
    y0: "y",
    dx: sub(lead("x").over("sw"), "x"),
    dy: sub(lead("y").over("sw"), "y")
  }).window({
    sw: over().partitionby(groups).orderby(asc("x"))
  }).qualify([
    or(lt("x0", xn), lt(add("x0", "dx"), xn)),
    or(lt("y0", yn), lt(add("y0", "dy"), yn)),
    or(gt("x0", 0), gt(add("x0", "dx"), 0)),
    or(gt("y0", 0), gt(add("y0", "dy"), 0))
  ]);
  const num = Query.select({ x: greatest(max(abs("dx")), max(abs("dy"))) }).from("pairs");
  const indices = Query.select({
    i: int32(sql`UNNEST(range((${num})))`)
  });
  const raster = Query.unionAll(
    Query.select(groups, {
      x: add("x0", "i"),
      y: add("y0", int32(round(div(mul("i", "dy"), "dx"))))
    }).from("pairs", "indices").where([lte(abs("dy"), abs("dx")), lt("i", abs("dx"))]),
    Query.select(groups, {
      x: add("x0", int32(round(div(mul(mul(sign("dy"), "i"), "dx"), "dy")))),
      y: add("y0", mul(sign("dy"), "i"))
    }).from("pairs", "indices").where([gt(abs("dy"), abs("dx")), lt("i", abs("dy"))]),
    Query.select(groups, { x: "x0", y: "y0" }).from("pairs").where(isNull("dx"))
  );
  const points = Query.from("raster").select(
    groups,
    "x",
    "y",
    normalize ? { w: div(1, count().partitionby(["x"].concat(groups))) } : null
  ).where([lte(0, "x"), lt("x", xn), lte(0, "y"), lt("y", yn)]);
  return Query.with({ pairs, indices, raster, points }).from("points").select(groupby, {
    index: add("x", mul("y", int32(xn))),
    density: normalize ? sum("w") : count()
  }).groupby("index", groupby);
}

// src/transforms/m4.js
function m4(input, bin, x2, y2, groups = []) {
  const pixel = int32(floor(bin));
  const q = (sel) => Query.from(input).select(sel).groupby(pixel, groups);
  return Query.union(
    q([{ [x2]: min(x2), [y2]: argmin(y2, x2) }, ...groups]),
    q([{ [x2]: max(x2), [y2]: argmax(y2, x2) }, ...groups]),
    q([{ [x2]: argmin(x2, y2), [y2]: min(y2) }, ...groups]),
    q([{ [x2]: argmax(x2, y2), [y2]: max(y2) }, ...groups])
  ).orderby(groups, x2);
}

// src/transforms/scales.js
var identity2 = (x2) => x2;
function scaleLinear() {
  return {
    apply: identity2,
    invert: identity2,
    sqlApply: asNode,
    sqlInvert: identity2
  };
}
function scaleLog({ base = null } = {}) {
  if (base == null || base === Math.E) {
    return {
      apply: Math.log,
      invert: Math.exp,
      sqlApply: (c) => ln(c),
      sqlInvert: (c) => exp(c)
    };
  } else if (base === 10) {
    return {
      apply: Math.log10,
      invert: (x2) => Math.pow(10, x2),
      sqlApply: (c) => log(c),
      sqlInvert: (c) => pow(10, c)
    };
  } else {
    const b = +base;
    return {
      apply: (x2) => Math.log(x2) / Math.log(b),
      invert: (x2) => Math.pow(b, x2),
      sqlApply: (c) => div(ln(c), ln(b)),
      sqlInvert: (c) => pow(b, c)
    };
  }
}
function scaleSymlog({ constant = 1 } = {}) {
  const _ = +constant;
  return {
    apply: (x2) => Math.sign(x2) * Math.log1p(Math.abs(x2)),
    invert: (x2) => Math.sign(x2) * Math.exp(Math.abs(x2) - _),
    sqlApply: (c) => (c = asNode(c), mul(sign(c), ln(add(_, abs(c))))),
    sqlInvert: (c) => mul(sign(c), sub(exp(abs(c)), _))
  };
}
function scaleSqrt() {
  return {
    apply: (x2) => Math.sign(x2) * Math.sqrt(Math.abs(x2)),
    invert: (x2) => Math.sign(x2) * x2 * x2,
    sqlApply: (c) => (c = asNode(c), mul(sign(c), sqrt(abs(c)))),
    sqlInvert: (c) => mul(sign(c), pow(c, 2))
  };
}
function scalePow({ exponent = 1 } = {}) {
  const e = +exponent;
  return {
    apply: (x2) => Math.sign(x2) * Math.pow(Math.abs(x2), e),
    invert: (x2) => Math.sign(x2) * Math.pow(Math.abs(x2), 1 / e),
    sqlApply: (c) => (c = asNode(c), mul(sign(c), pow(abs(c), e))),
    sqlInvert: (c) => mul(sign(c), pow(abs(c), div(1, e)))
  };
}
function scaleTime() {
  return {
    apply: (x2) => +x2,
    invert: (x2) => new Date(x2),
    sqlApply: (c) => c instanceof Date ? literal(+c) : isDateLiteral(c) ? literal(+c.value) : epoch_ms(c),
    sqlInvert: identity2
  };
}
var scales = {
  identity: scaleLinear,
  linear: scaleLinear,
  log: scaleLog,
  symlog: scaleSymlog,
  sqrt: scaleSqrt,
  pow: scalePow,
  time: scaleTime,
  utc: scaleTime
};
function scaleTransform(options) {
  const scale = scales[options.type];
  return scale ? { ...options, ...scale(options) } : null;
}
function isDateLiteral(x2) {
  return x2 instanceof LiteralNode && x2.value instanceof Date;
}
export {
  AggregateNode,
  AndNode,
  BetweenOpNode,
  BinaryOpNode,
  CaseNode,
  CastNode,
  ColumnNameRefNode,
  ColumnParamNode,
  ColumnRefNode,
  DescribeQuery,
  ExprNode,
  FragmentNode,
  FromClauseNode,
  FunctionNode,
  InOpNode,
  IntervalNode,
  LiteralNode,
  NotBetweenOpNode,
  OrNode,
  OrderByNode,
  ParamNode,
  Query,
  SQLNode,
  SampleClauseNode,
  SelectClauseNode,
  SelectQuery,
  SetOperation,
  TableRefNode,
  UnaryOpNode,
  UnaryPosftixOpNode,
  VerbatimNode,
  WhenNode,
  WindowClauseNode,
  WindowDefNode,
  WindowFrameNode,
  WindowFunctionNode,
  WindowNode,
  WithClauseNode,
  abs,
  add,
  and,
  argmax,
  argmin,
  arrayAgg,
  asLiteral,
  asNode,
  asTableRef,
  asVerbatim,
  asc,
  avg,
  bin1d,
  bin2d,
  binLinear1d,
  binLinear2d,
  bitAnd,
  bitLeft,
  bitNot,
  bitOr,
  bitRight,
  cast,
  ceil,
  centroid,
  centroidX,
  centroidY,
  collectAggregates,
  collectColumns,
  collectParams,
  column,
  cond,
  contains,
  corr,
  count,
  covarPop,
  covariance,
  createSchema,
  createTable,
  cume_dist,
  dateBin,
  dateDay,
  dateMonth,
  dateMonthDay,
  dense_rank,
  desc,
  div,
  entropy,
  epoch_ms,
  eq,
  exp,
  first,
  first_value,
  float32,
  float64,
  floor,
  geojson,
  greatest,
  gt,
  gte,
  idiv,
  int32,
  interval,
  isAggregateExpression,
  isBetween,
  isColumnParam,
  isColumnRef,
  isDescribeQuery,
  isDistinct,
  isFinite,
  isIn,
  isInfinite,
  isNaN,
  isNode,
  isNotBetween,
  isNotDistinct,
  isNotNull,
  isNull,
  isParamLike,
  isQuery,
  isSelectQuery,
  isTableRef,
  kurtosis,
  lag,
  last,
  last_value,
  lead,
  least,
  length,
  lineDensity,
  literal,
  ln,
  loadCSV,
  loadExtension,
  loadJSON,
  loadObjects,
  loadParquet,
  loadSpatial,
  log,
  lower,
  lt,
  lte,
  m4,
  mad,
  max,
  median,
  min,
  mod,
  mode,
  mul,
  neq,
  not,
  nth_value,
  ntile,
  or,
  over,
  percent_rank,
  pow,
  prefix,
  product,
  quantile,
  rank,
  regexp_matches,
  regrAvgX,
  regrAvgY,
  regrCount,
  regrIntercept,
  regrR2,
  regrSXX,
  regrSXY,
  regrSYY,
  regrSlope,
  rewrite,
  round,
  row_number,
  scaleTransform,
  sign,
  skewness,
  sql,
  sqrt,
  stddev,
  stddevPop,
  stringAgg,
  sub,
  suffix,
  sum,
  trunc,
  upper,
  varPop,
  variance,
  walk,
  x,
  y
};
