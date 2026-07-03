// ../../node_modules/@uwdata/flechette/src/constants.js
var MAGIC = Uint8Array.of(65, 82, 82, 79, 87, 49);
var Version = (
  /** @type {const} */
  {
    /** 0.1.0 (October 2016). */
    V1: 0,
    /** 0.2.0 (February 2017). Non-backwards compatible with V1. */
    V2: 1,
    /** 0.3.0 -> 0.7.1 (May - December 2017). Non-backwards compatible with V2. */
    V3: 2,
    /** >= 0.8.0 (December 2017). Non-backwards compatible with V3. */
    V4: 3,
    /**
     * >= 1.0.0 (July 2020). Backwards compatible with V4 (V5 readers can read V4
     * metadata and IPC messages). Implementations are recommended to provide a
     * V4 compatibility mode with V5 format changes disabled.
     *
     * Incompatible changes between V4 and V5:
     * - Union buffer layout has changed.
     *   In V5, Unions don't have a validity bitmap buffer.
     */
    V5: 4
  }
);
var MessageHeader = (
  /** @type {const} */
  {
    NONE: 0,
    /**
     * A Schema describes the columns in a record batch.
     */
    Schema: 1,
    /**
     * For sending dictionary encoding information. Any Field can be
     * dictionary-encoded, but in this case none of its children may be
     * dictionary-encoded.
     * There is one vector / column per dictionary, but that vector / column
     * may be spread across multiple dictionary batches by using the isDelta
     * flag.
     */
    DictionaryBatch: 2,
    /**
     * A data header describing the shared memory layout of a "record" or "row"
     * batch. Some systems call this a "row batch" internally and others a "record
     * batch".
     */
    RecordBatch: 3,
    /**
     * EXPERIMENTAL: Metadata for n-dimensional arrays, aka "tensors" or
     * "ndarrays". Arrow implementations in general are not required to implement
     * this type.
     *
     * Not currently supported by Flechette.
     */
    Tensor: 4,
    /**
     * EXPERIMENTAL: Metadata for n-dimensional sparse arrays, aka "sparse
     * tensors". Arrow implementations in general are not required to implement
     * this type.
     *
     * Not currently supported by Flechette.
     */
    SparseTensor: 5
  }
);
var Type = (
  /** @type {const} */
  {
    /**
     * Dictionary types compress data by using a set of integer indices to
     * lookup potentially repeated vales in a separate dictionary of values.
     *
     * This type entry is provided for API convenience, it does not occur
     * in actual Arrow IPC binary data.
     */
    Dictionary: -1,
    /** No data type. Included for flatbuffer compatibility. */
    NONE: 0,
    /** Null values only. */
    Null: 1,
    /** Integers, either signed or unsigned, with 8, 16, 32, or 64 bit widths. */
    Int: 2,
    /** Floating point numbers with 16, 32, or 64 bit precision. */
    Float: 3,
    /** Opaque binary data. */
    Binary: 4,
    /** Unicode with UTF-8 encoding. */
    Utf8: 5,
    /** Booleans represented as 8 bit bytes. */
    Bool: 6,
    /**
     * Exact decimal value represented as an integer value in two's complement.
     * Currently only 128-bit (16-byte) and 256-bit (32-byte) integers are used.
     * The representation uses the endianness indicated in the schema.
     */
    Decimal: 7,
    /**
     * Date is either a 32-bit or 64-bit signed integer type representing an
     * elapsed time since UNIX epoch (1970-01-01), stored in either of two units:
     * - Milliseconds (64 bits) indicating UNIX time elapsed since the epoch (no
     * leap seconds), where the values are evenly divisible by 86400000
     * - Days (32 bits) since the UNIX epoch
     */
    Date: 8,
    /**
     * Time is either a 32-bit or 64-bit signed integer type representing an
     * elapsed time since midnight, stored in either of four units: seconds,
     * milliseconds, microseconds or nanoseconds.
     *
     * The integer `bitWidth` depends on the `unit` and must be one of the following:
     * - SECOND and MILLISECOND: 32 bits
     * - MICROSECOND and NANOSECOND: 64 bits
     *
     * The allowed values are between 0 (inclusive) and 86400 (=24*60*60) seconds
     * (exclusive), adjusted for the time unit (for example, up to 86400000
     * exclusive for the MILLISECOND unit).
     * This definition doesn't allow for leap seconds. Time values from
     * measurements with leap seconds will need to be corrected when ingesting
     * into Arrow (for example by replacing the value 86400 with 86399).
     */
    Time: 9,
    /**
     * Timestamp is a 64-bit signed integer representing an elapsed time since a
     * fixed epoch, stored in either of four units: seconds, milliseconds,
     * microseconds or nanoseconds, and is optionally annotated with a timezone.
     *
     * Timestamp values do not include any leap seconds (in other words, all
     * days are considered 86400 seconds long).
     *
     * The timezone is an optional string for the name of a timezone, one of:
     *
     *  - As used in the Olson timezone database (the "tz database" or
     *    "tzdata"), such as "America/New_York".
     *  - An absolute timezone offset of the form "+XX:XX" or "-XX:XX",
     *    such as "+07:30".
     *
     * Whether a timezone string is present indicates different semantics about
     * the data.
     */
    Timestamp: 10,
    /**
     * A "calendar" interval which models types that don't necessarily
     * have a precise duration without the context of a base timestamp (e.g.
     * days can differ in length during day light savings time transitions).
     * All integers in the units below are stored in the endianness indicated
     * by the schema.
     *
     *  - YEAR_MONTH - Indicates the number of elapsed whole months, stored as
     *    4-byte signed integers.
     *  - DAY_TIME - Indicates the number of elapsed days and milliseconds (no
     *    leap seconds), stored as 2 contiguous 32-bit signed integers (8-bytes
     *    in total). Support of this IntervalUnit is not required for full arrow
     *    compatibility.
     *  - MONTH_DAY_NANO - A triple of the number of elapsed months, days, and
     *    nanoseconds. The values are stored contiguously in 16-byte blocks.
     *    Months and days are encoded as 32-bit signed integers and nanoseconds
     *    is encoded as a 64-bit signed integer. Nanoseconds does not allow for
     *    leap seconds. Each field is independent (e.g. there is no constraint
     *    that nanoseconds have the same sign as days or that the quantity of
     *    nanoseconds represents less than a day's worth of time).
     */
    Interval: 11,
    /**
     * List (vector) data supporting variably-sized lists.
     * A list has a single child data type for list entries.
     */
    List: 12,
    /**
     * A struct consisting of multiple named child data types.
     */
    Struct: 13,
    /**
     * A union is a complex type with parallel child data types. By default ids
     * in the type vector refer to the offsets in the children. Optionally
     * typeIds provides an indirection between the child offset and the type id.
     * For each child `typeIds[offset]` is the id used in the type vector.
     */
    Union: 14,
    /**
     * Binary data where each entry has the same fixed size.
     */
    FixedSizeBinary: 15,
    /**
     * List (vector) data where every list has the same fixed size.
     * A list has a single child data type for list entries.
     */
    FixedSizeList: 16,
    /**
     * A Map is a logical nested type that is represented as
     * List<entries: Struct<key: K, value: V>>
     *
     * In this layout, the keys and values are each respectively contiguous. We do
     * not constrain the key and value types, so the application is responsible
     * for ensuring that the keys are hashable and unique. Whether the keys are sorted
     * may be set in the metadata for this field.
     *
     * In a field with Map type, the field has a child Struct field, which then
     * has two children: key type and the second the value type. The names of the
     * child fields may be respectively "entries", "key", and "value", but this is
     * not enforced.
     *
     * Map
     * ```text
     *   - child[0] entries: Struct
     *   - child[0] key: K
     *   - child[1] value: V
     *  ```
     * Neither the "entries" field nor the "key" field may be nullable.
     *
     * The metadata is structured so that Arrow systems without special handling
     * for Map can make Map an alias for List. The "layout" attribute for the Map
     * field must have the same contents as a List.
     */
    Map: 17,
    /**
     * An absolute length of time unrelated to any calendar artifacts. For the
     * purposes of Arrow implementations, adding this value to a Timestamp
     * ("t1") naively (i.e. simply summing the two numbers) is acceptable even
     * though in some cases the resulting Timestamp (t2) would not account for
     * leap-seconds during the elapsed time between "t1" and "t2". Similarly,
     * representing the difference between two Unix timestamp is acceptable, but
     * would yield a value that is possibly a few seconds off from the true
     * elapsed time.
     *
     * The resolution defaults to millisecond, but can be any of the other
     * supported TimeUnit values as with Timestamp and Time types. This type is
     * always represented as an 8-byte integer.
     */
    Duration: 18,
    /**
     * Same as Binary, but with 64-bit offsets, allowing representation of
     * extremely large data values.
     */
    LargeBinary: 19,
    /**
     * Same as Utf8, but with 64-bit offsets, allowing representation of
     * extremely large data values.
     */
    LargeUtf8: 20,
    /**
     * Same as List, but with 64-bit offsets, allowing representation of
     * extremely large data values.
     */
    LargeList: 21,
    /**
     * Contains two child arrays, run_ends and values. The run_ends child array
     * must be a 16/32/64-bit integer array which encodes the indices at which
     * the run with the value in each corresponding index in the values child
     * array ends. Like list/struct types, the value array can be of any type.
     */
    RunEndEncoded: 22,
    /**
     * Logically the same as Binary, but the internal representation uses a view
     * struct that contains the string length and either the string's entire data
     * inline (for small strings) or an inlined prefix, an index of another buffer,
     * and an offset pointing to a slice in that buffer (for non-small strings).
     *
     * Since it uses a variable number of data buffers, each Field with this type
     * must have a corresponding entry in `variadicBufferCounts`.
     */
    BinaryView: 23,
    /**
     * Logically the same as Utf8, but the internal representation uses a view
     * struct that contains the string length and either the string's entire data
     * inline (for small strings) or an inlined prefix, an index of another buffer,
     * and an offset pointing to a slice in that buffer (for non-small strings).
     *
     * Since it uses a variable number of data buffers, each Field with this type
     * must have a corresponding entry in `variadicBufferCounts`.
     */
    Utf8View: 24,
    /**
     * Represents the same logical types that List can, but contains offsets and
     * sizes allowing for writes in any order and sharing of child values among
     * list values.
     */
    ListView: 25,
    /**
     * Same as ListView, but with 64-bit offsets and sizes, allowing to represent
     * extremely large data values.
     */
    LargeListView: 26
  }
);
var Precision = (
  /** @type {const} */
  {
    /** 16-bit floating point number. */
    HALF: 0,
    /** 32-bit floating point number. */
    SINGLE: 1,
    /** 64-bit floating point number. */
    DOUBLE: 2
  }
);
var DateUnit = (
  /** @type {const} */
  {
    /* Days (as 32 bit int) since the UNIX epoch. */
    DAY: 0,
    /**
     * Milliseconds (as 64 bit int) indicating UNIX time elapsed since the epoch
     * (no leap seconds), with values evenly divisible by 86400000.
     */
    MILLISECOND: 1
  }
);
var TimeUnit = (
  /** @type {const} */
  {
    /** Seconds. */
    SECOND: 0,
    /** Milliseconds. */
    MILLISECOND: 1,
    /** Microseconds. */
    MICROSECOND: 2,
    /** Nanoseconds. */
    NANOSECOND: 3
  }
);
var IntervalUnit = (
  /** @type {const} */
  {
    /**
     * Indicates the number of elapsed whole months, stored as 4-byte signed
     * integers.
     */
    YEAR_MONTH: 0,
    /**
     * Indicates the number of elapsed days and milliseconds (no leap seconds),
     * stored as 2 contiguous 32-bit signed integers (8-bytes in total). Support
     * of this IntervalUnit is not required for full arrow compatibility.
     */
    DAY_TIME: 1,
    /**
     * A triple of the number of elapsed months, days, and nanoseconds.
     * The values are stored contiguously in 16-byte blocks. Months and days are
     * encoded as 32-bit signed integers and nanoseconds is encoded as a 64-bit
     * signed integer. Nanoseconds does not allow for leap seconds. Each field is
     * independent (e.g. there is no constraint that nanoseconds have the same
     * sign as days or that the quantity of nanoseconds represents less than a
     * day's worth of time).
     */
    MONTH_DAY_NANO: 2
  }
);
var UnionMode = (
  /** @type {const} */
  {
    /** Sparse union layout with full arrays for each sub-type. */
    Sparse: 0,
    /** Dense union layout with offsets into value arrays. */
    Dense: 1
  }
);

// ../../node_modules/@uwdata/flechette/src/util/arrays.js
var uint8Array = Uint8Array;
var uint16Array = Uint16Array;
var uint32Array = Uint32Array;
var uint64Array = BigUint64Array;
var int8Array = Int8Array;
var int16Array = Int16Array;
var int32Array = Int32Array;
var int64Array = BigInt64Array;
var float32Array = Float32Array;
var float64Array = Float64Array;
function intArrayType(bitWidth, signed) {
  const i = Math.log2(bitWidth) - 3;
  return (signed ? [int8Array, int16Array, int32Array, int64Array] : [uint8Array, uint16Array, uint32Array, uint64Array])[i];
}
var TypedArray = Object.getPrototypeOf(Int8Array);
function bisect(offsets, index) {
  let a = 0;
  let b = offsets.length;
  if (b <= 2147483648) {
    do {
      const mid = a + b >>> 1;
      if (offsets[mid] <= index) a = mid + 1;
      else b = mid;
    } while (a < b);
  } else {
    do {
      const mid = Math.trunc((a + b) / 2);
      if (offsets[mid] <= index) a = mid + 1;
      else b = mid;
    } while (a < b);
  }
  return a;
}

// ../../node_modules/@uwdata/flechette/src/util/objects.js
function check(value, test, message) {
  if (test(value)) return value;
  throw new Error(message(value));
}
function checkOneOf(value, set, message) {
  set = Array.isArray(set) ? set : Object.values(set);
  return check(
    value,
    (value2) => set.includes(value2),
    message ?? (() => `${value} must be one of ${set}`)
  );
}
function keyFor(object, value) {
  for (const [key, val] of Object.entries(object)) {
    if (val === value) return key;
  }
  return "<Unknown>";
}

// ../../node_modules/@uwdata/flechette/src/data-types.js
var invalidDataType = (typeId) => `Unsupported data type: "${keyFor(Type, typeId)}" (id ${typeId})`;
var field = (name, type, nullable = true, metadata = null) => ({
  name,
  type,
  nullable,
  metadata
});
function isField(value) {
  return Object.hasOwn(value, "name") && isDataType(value.type);
}
function isDataType(value) {
  return typeof value?.typeId === "number";
}
function asField(value, defaultName = "", defaultNullable = true) {
  return isField(value) ? value : field(
    defaultName,
    check(value, isDataType, () => `Data type expected.`),
    defaultNullable
  );
}
var dictionary = (type, indexType, ordered = false, id = -1) => ({
  typeId: Type.Dictionary,
  id,
  dictionary: type,
  indices: indexType || int32(),
  ordered
});
var int = (bitWidth = 32, signed = true) => ({
  typeId: Type.Int,
  bitWidth: checkOneOf(bitWidth, [8, 16, 32, 64]),
  signed,
  values: intArrayType(bitWidth, signed)
});
var int32 = () => int(32);
var float = (precision = 2) => ({
  typeId: Type.Float,
  precision: checkOneOf(precision, Precision),
  values: [uint16Array, float32Array, float64Array][precision]
});
var binary = () => ({
  typeId: Type.Binary,
  offsets: int32Array
});
var utf8 = () => ({
  typeId: Type.Utf8,
  offsets: int32Array
});
var decimal = (precision, scale, bitWidth = 128) => ({
  typeId: Type.Decimal,
  precision,
  scale,
  bitWidth: checkOneOf(bitWidth, [128, 256]),
  values: uint64Array
});
var date = (unit) => ({
  typeId: Type.Date,
  unit: checkOneOf(unit, DateUnit),
  values: unit === DateUnit.DAY ? int32Array : int64Array
});
var time = (unit = TimeUnit.MILLISECOND, bitWidth = 32) => ({
  typeId: Type.Time,
  unit: checkOneOf(unit, TimeUnit),
  bitWidth: checkOneOf(bitWidth, [32, 64]),
  values: bitWidth === 32 ? int32Array : int64Array
});
var timestamp = (unit = TimeUnit.MILLISECOND, timezone = null) => ({
  typeId: Type.Timestamp,
  unit: checkOneOf(unit, TimeUnit),
  timezone,
  values: int64Array
});
var interval = (unit = IntervalUnit.MONTH_DAY_NANO) => ({
  typeId: Type.Interval,
  unit: checkOneOf(unit, IntervalUnit),
  values: unit === IntervalUnit.MONTH_DAY_NANO ? void 0 : int32Array
});
var list = (child) => ({
  typeId: Type.List,
  children: [asField(child)],
  offsets: int32Array
});
var struct = (children) => ({
  typeId: Type.Struct,
  children: Array.isArray(children) && isField(children[0]) ? (
    /** @type {import('./types.js').Field[]} */
    children
  ) : Object.entries(children).map(([name, type]) => field(name, type))
});
var union = (mode2, children, typeIds, typeIdForValue) => {
  typeIds ??= children.map((v, i) => i);
  return {
    typeId: Type.Union,
    mode: checkOneOf(mode2, UnionMode),
    typeIds,
    typeMap: typeIds.reduce((m, id, i) => (m[id] = i, m), {}),
    children: children.map((v, i) => asField(v, `_${i}`)),
    typeIdForValue,
    offsets: int32Array
  };
};
var fixedSizeBinary = (stride) => ({
  typeId: Type.FixedSizeBinary,
  stride
});
var fixedSizeList = (child, stride) => ({
  typeId: Type.FixedSizeList,
  stride,
  children: [asField(child)]
});
var mapType = (keysSorted, child) => ({
  typeId: Type.Map,
  keysSorted,
  children: [child],
  offsets: int32Array
});
var duration = (unit = TimeUnit.MILLISECOND) => ({
  typeId: Type.Duration,
  unit: checkOneOf(unit, TimeUnit),
  values: int64Array
});
var largeBinary = () => ({
  typeId: Type.LargeBinary,
  offsets: int64Array
});
var largeUtf8 = () => ({
  typeId: Type.LargeUtf8,
  offsets: int64Array
});
var largeList = (child) => ({
  typeId: Type.LargeList,
  children: [asField(child)],
  offsets: int64Array
});
var runEndEncoded = (runsField, valuesField) => ({
  typeId: Type.RunEndEncoded,
  children: [
    check(
      asField(runsField, "run_ends"),
      (field2) => field2.type.typeId === Type.Int,
      () => "Run-ends must have an integer type."
    ),
    asField(valuesField, "values")
  ]
});
var listView = (child) => ({
  typeId: Type.ListView,
  children: [asField(child, "value")],
  offsets: int32Array
});
var largeListView = (child) => ({
  typeId: Type.LargeListView,
  children: [asField(child, "value")],
  offsets: int64Array
});

// ../../node_modules/@uwdata/flechette/src/util/numbers.js
var f64 = new float64Array(2);
var buf = f64.buffer;
var i64 = new int64Array(buf);
var u32 = new uint32Array(buf);
var i32 = new int32Array(buf);
var u8 = new uint8Array(buf);
function toNumber(value) {
  if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
    throw Error(`BigInt exceeds integer number representation: ${value}`);
  }
  return Number(value);
}
function divide(num, div2) {
  return Number(num / div2) + Number(num % div2) / Number(div2);
}
var asUint64 = (v) => BigInt.asUintN(64, v);
function fromDecimal128(buf2, offset) {
  const i = offset << 1;
  let x2;
  if (BigInt.asIntN(64, buf2[i + 1]) < 0) {
    x2 = asUint64(~buf2[i]) | asUint64(~buf2[i + 1]) << 64n;
    x2 = -(x2 + 1n);
  } else {
    x2 = buf2[i] | buf2[i + 1] << 64n;
  }
  return x2;
}
function fromDecimal256(buf2, offset) {
  const i = offset << 2;
  let x2;
  if (BigInt.asIntN(64, buf2[i + 3]) < 0) {
    x2 = asUint64(~buf2[i]) | asUint64(~buf2[i + 1]) << 64n | asUint64(~buf2[i + 2]) << 128n | asUint64(~buf2[i + 3]) << 192n;
    x2 = -(x2 + 1n);
  } else {
    x2 = buf2[i] | buf2[i + 1] << 64n | buf2[i + 2] << 128n | buf2[i + 3] << 192n;
  }
  return x2;
}

// ../../node_modules/@uwdata/flechette/src/util/strings.js
var textDecoder = new TextDecoder("utf-8");
var textEncoder = new TextEncoder();
function decodeUtf8(buf2) {
  return textDecoder.decode(buf2);
}

// ../../node_modules/@uwdata/flechette/src/util/read.js
var SIZEOF_INT = 4;
function decodeBit(bitmap2, index) {
  return (bitmap2[index >> 3] & 1 << index % 8) !== 0;
}
function readObject(buf2, index) {
  const pos = index + readInt32(buf2, index);
  const vtable = pos - readInt32(buf2, pos);
  const size = readInt16(buf2, vtable);
  return (index2, read, fallback = null) => {
    if (index2 < size) {
      const off = readInt16(buf2, vtable + index2);
      if (off) return read(buf2, pos + off);
    }
    return fallback;
  };
}
function readOffset(buf2, offset) {
  return offset;
}
function readBoolean(buf2, offset) {
  return !!readInt8(buf2, offset);
}
function readInt8(buf2, offset) {
  return readUint8(buf2, offset) << 24 >> 24;
}
function readUint8(buf2, offset) {
  return buf2[offset];
}
function readInt16(buf2, offset) {
  return readUint16(buf2, offset) << 16 >> 16;
}
function readUint16(buf2, offset) {
  return buf2[offset] | buf2[offset + 1] << 8;
}
function readInt32(buf2, offset) {
  return buf2[offset] | buf2[offset + 1] << 8 | buf2[offset + 2] << 16 | buf2[offset + 3] << 24;
}
function readUint32(buf2, offset) {
  return readInt32(buf2, offset) >>> 0;
}
function readInt64(buf2, offset) {
  return toNumber(BigInt.asIntN(
    64,
    BigInt(readUint32(buf2, offset)) + (BigInt(readUint32(buf2, offset + SIZEOF_INT)) << 32n)
  ));
}
function readString(buf2, index) {
  let offset = index + readInt32(buf2, index);
  const length2 = readInt32(buf2, offset);
  offset += SIZEOF_INT;
  return decodeUtf8(buf2.subarray(offset, offset + length2));
}
function readVector(buf2, offset, stride, extract) {
  if (!offset) return [];
  const base = offset + readInt32(buf2, offset);
  return Array.from(
    { length: readInt32(buf2, base) },
    (_, i) => extract(buf2, base + SIZEOF_INT + i * stride)
  );
}

// ../../node_modules/@uwdata/flechette/src/util/struct.js
var RowIndex = Symbol("rowIndex");
function proxyFactory(names, batches) {
  class RowObject {
    /**
     * Create a new proxy row object representing a struct or table row.
     * @param {number} index The record batch row index.
     */
    constructor(index) {
      this[RowIndex] = index;
    }
    /**
     * Return a JSON-compatible object representation.
     */
    toJSON() {
      return structObject(names, batches, this[RowIndex]);
    }
  }
  ;
  const proto = RowObject.prototype;
  for (let i = 0; i < names.length; ++i) {
    if (Object.hasOwn(proto, names[i])) continue;
    const batch = batches[i];
    Object.defineProperty(proto, names[i], {
      get() {
        return batch.at(this[RowIndex]);
      },
      enumerable: true
    });
  }
  return (index) => new RowObject(index);
}
function objectFactory(names, batches) {
  return (index) => structObject(names, batches, index);
}
function structObject(names, batches, index) {
  const obj = {};
  for (let i = 0; i < names.length; ++i) {
    obj[names[i]] = batches[i].at(index);
  }
  return obj;
}

// ../../node_modules/@uwdata/flechette/src/batch.js
function isDirectBatch(batch) {
  return batch instanceof DirectBatch;
}
var Batch = class {
  /**
   * The array type to use when extracting data from the batch.
   * A null value indicates that the array type should match
   * the type of the batch's values array.
   * @type {ArrayConstructor | import('./types.js').TypedArrayConstructor | null}
   */
  static ArrayType = null;
  /**
   * Create a new column batch.
   * @param {object} options
   * @param {number} options.length The length of the batch
   * @param {number} options.nullCount The null value count
   * @param {import('./types.js').DataType} options.type The data type.
   * @param {Uint8Array} [options.validity] Validity bitmap buffer
   * @param {import('./types.js').TypedArray} [options.values] Values buffer
   * @param {import('./types.js').OffsetArray} [options.offsets] Offsets buffer
   * @param {import('./types.js').OffsetArray} [options.sizes] Sizes buffer
   * @param {Batch[]} [options.children] Children batches
   */
  constructor({
    length: length2,
    nullCount,
    type,
    validity,
    values,
    offsets,
    sizes,
    children
  }) {
    this.length = length2;
    this.nullCount = nullCount;
    this.type = type;
    this.validity = validity;
    this.values = values;
    this.offsets = offsets;
    this.sizes = sizes;
    this.children = children;
    if (!nullCount || !this.validity) {
      this.at = (index) => this.value(index);
    }
  }
  /**
   * Provide an informative object string tag.
   */
  get [Symbol.toStringTag]() {
    return "Batch";
  }
  /**
   * Return the value at the given index.
   * @param {number} index The value index.
   * @returns {T | null} The value.
   */
  at(index) {
    return this.isValid(index) ? this.value(index) : null;
  }
  /**
   * Check if a value at the given index is valid (non-null).
   * @param {number} index The value index.
   * @returns {boolean} True if valid, false otherwise.
   */
  isValid(index) {
    return decodeBit(this.validity, index);
  }
  /**
   * Return the value at the given index. This method does not check the
   * validity bitmap and is intended primarily for internal use. In most
   * cases, callers should use the `at()` method instead.
   * @param {number} index The value index
   * @returns {T} The value, ignoring the validity bitmap.
   */
  value(index) {
    return (
      /** @type {T} */
      this.values[index]
    );
  }
  /**
   * Extract an array of values within the given index range. Unlike
   * Array.slice, all arguments are required and may not be negative indices.
   * @param {number} start The starting index, inclusive
   * @param {number} end The ending index, exclusive
   * @returns {import('./types.js').ValueArray<T?>} The slice of values
   */
  slice(start, end) {
    const n = end - start;
    const values = Array(n);
    for (let i = 0; i < n; ++i) {
      values[i] = this.at(start + i);
    }
    return values;
  }
  /**
   * Return an iterator over the values in this batch.
   * @returns {Iterator<T?>}
   */
  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; ++i) {
      yield this.at(i);
    }
  }
};
var DirectBatch = class extends Batch {
  /**
   * Create a new column batch with direct value array access.
   * @param {object} options
   * @param {number} options.length The length of the batch
   * @param {number} options.nullCount The null value count
   * @param {import('./types.js').DataType} options.type The data type.
   * @param {Uint8Array} [options.validity] Validity bitmap buffer
   * @param {import('./types.js').TypedArray} options.values Values buffer
   */
  constructor(options) {
    super(options);
    const { length: length2, values } = this;
    this.values = values.subarray(0, length2);
  }
  /**
   * Extract an array of values within the given index range. Unlike
   * Array.slice, all arguments are required and may not be negative indices.
   * When feasible, a zero-copy subarray of a typed array is returned.
   * @param {number} start The starting index, inclusive
   * @param {number} end The ending index, exclusive
   * @returns {import('./types.js').ValueArray<T?>} The slice of values
   */
  slice(start, end) {
    return this.nullCount ? super.slice(start, end) : this.values.subarray(start, end);
  }
  /**
   * Return an iterator over the values in this batch.
   * @returns {Iterator<T?>}
   */
  [Symbol.iterator]() {
    return this.nullCount ? super[Symbol.iterator]() : (
      /** @type {Iterator<T?>} */
      this.values[Symbol.iterator]()
    );
  }
};
var NumberBatch = class extends Batch {
  static ArrayType = float64Array;
};
var ArrayBatch = class extends Batch {
  static ArrayType = Array;
};
var NullBatch = class extends ArrayBatch {
  /**
   * @param {number} index The value index
   * @returns {null}
   */
  value(index) {
    return null;
  }
};
var Int64Batch = class extends NumberBatch {
  /**
   * @param {number} index The value index
   */
  value(index) {
    return toNumber(
      /** @type {bigint} */
      this.values[index]
    );
  }
};
var Float16Batch = class extends NumberBatch {
  /**
   * @param {number} index The value index
   */
  value(index) {
    const v = (
      /** @type {number} */
      this.values[index]
    );
    const expo = (v & 31744) >> 10;
    const sigf = (v & 1023) / 1024;
    const sign2 = (-1) ** ((v & 32768) >> 15);
    switch (expo) {
      case 31:
        return sign2 * (sigf ? Number.NaN : 1 / 0);
      case 0:
        return sign2 * (sigf ? 6103515625e-14 * sigf : 0);
    }
    return sign2 * 2 ** (expo - 15) * (1 + sigf);
  }
};
var BoolBatch = class extends ArrayBatch {
  /**
   * @param {number} index The value index
   */
  value(index) {
    return decodeBit(
      /** @type {Uint8Array} */
      this.values,
      index
    );
  }
};
var DecimalBatch = class extends Batch {
  constructor(options) {
    super(options);
    const { bitWidth, scale } = (
      /** @type {import('./types.js').DecimalType} */
      this.type
    );
    this.decimal = bitWidth === 128 ? fromDecimal128 : fromDecimal256;
    this.scale = 10n ** BigInt(scale);
  }
};
var DecimalNumberBatch = class extends DecimalBatch {
  static ArrayType = float64Array;
  /**
   * @param {number} index The value index
   */
  value(index) {
    return divide(
      this.decimal(
        /** @type {BigUint64Array} */
        this.values,
        index
      ),
      this.scale
    );
  }
};
var DecimalBigIntBatch = class extends DecimalBatch {
  static ArrayType = Array;
  /**
   * @param {number} index The value index
   */
  value(index) {
    return this.decimal(
      /** @type {BigUint64Array} */
      this.values,
      index
    );
  }
};
var DateBatch = class extends ArrayBatch {
  /**
   * Create a new date batch.
   * @param {Batch<number>} batch A batch of timestamp values.
   */
  constructor(batch) {
    super(batch);
    this.source = batch;
  }
  /**
   * @param {number} index The value index
   */
  value(index) {
    return new Date(this.source.value(index));
  }
};
var DateDayBatch = class extends NumberBatch {
  /**
   * @param {number} index The value index
   * @returns {number}
   */
  value(index) {
    return 864e5 * /** @type {number} */
    this.values[index];
  }
};
var DateDayMillisecondBatch = Int64Batch;
var TimestampSecondBatch = class extends Int64Batch {
  /**
   * @param {number} index The value index
   */
  value(index) {
    return super.value(index) * 1e3;
  }
};
var TimestampMillisecondBatch = Int64Batch;
var TimestampMicrosecondBatch = class extends Int64Batch {
  /**
   * @param {number} index The value index
   */
  value(index) {
    return divide(
      /** @type {bigint} */
      this.values[index],
      1000n
    );
  }
};
var TimestampNanosecondBatch = class extends Int64Batch {
  /**
   * @param {number} index The value index
   */
  value(index) {
    return divide(
      /** @type {bigint} */
      this.values[index],
      1000000n
    );
  }
};
var IntervalDayTimeBatch = class extends ArrayBatch {
  /**
   * @param {number} index The value index
   * @returns {Int32Array}
   */
  value(index) {
    const values = (
      /** @type {Int32Array} */
      this.values
    );
    return values.subarray(index << 1, index + 1 << 1);
  }
};
var IntervalMonthDayNanoBatch = class extends ArrayBatch {
  /**
   * @param {number} index The value index
   */
  value(index) {
    const values = (
      /** @type {Uint8Array} */
      this.values
    );
    const base = index << 4;
    return Float64Array.of(
      readInt32(values, base),
      readInt32(values, base + 4),
      readInt64(values, base + 8)
    );
  }
};
var offset32 = ({ values, offsets }, index) => values.subarray(offsets[index], offsets[index + 1]);
var offset64 = ({ values, offsets }, index) => values.subarray(toNumber(offsets[index]), toNumber(offsets[index + 1]));
var BinaryBatch = class extends ArrayBatch {
  /**
   * @param {number} index
   * @returns {Uint8Array}
   */
  value(index) {
    return offset32(this, index);
  }
};
var LargeBinaryBatch = class extends ArrayBatch {
  /**
   * @param {number} index
   * @returns {Uint8Array}
   */
  value(index) {
    return offset64(this, index);
  }
};
var Utf8Batch = class extends ArrayBatch {
  /**
   * @param {number} index
   */
  value(index) {
    return decodeUtf8(offset32(this, index));
  }
};
var LargeUtf8Batch = class extends ArrayBatch {
  /**
   * @param {number} index
   */
  value(index) {
    return decodeUtf8(offset64(this, index));
  }
};
var ListBatch = class extends ArrayBatch {
  /**
   * @param {number} index
   * @returns {import('./types.js').ValueArray<V>}
   */
  value(index) {
    const offsets = (
      /** @type {Int32Array} */
      this.offsets
    );
    return this.children[0].slice(offsets[index], offsets[index + 1]);
  }
};
var LargeListBatch = class extends ArrayBatch {
  /**
   * @param {number} index
   * @returns {import('./types.js').ValueArray<V>}
   */
  value(index) {
    const offsets = (
      /** @type {BigInt64Array} */
      this.offsets
    );
    return this.children[0].slice(toNumber(offsets[index]), toNumber(offsets[index + 1]));
  }
};
var ListViewBatch = class extends ArrayBatch {
  /**
   * @param {number} index
   * @returns {import('./types.js').ValueArray<V>}
   */
  value(index) {
    const a = (
      /** @type {number} */
      this.offsets[index]
    );
    const b = a + /** @type {number} */
    this.sizes[index];
    return this.children[0].slice(a, b);
  }
};
var LargeListViewBatch = class extends ArrayBatch {
  /**
   * @param {number} index
   * @returns {import('./types.js').ValueArray<V>}
   */
  value(index) {
    const a = (
      /** @type {bigint} */
      this.offsets[index]
    );
    const b = a + /** @type {bigint} */
    this.sizes[index];
    return this.children[0].slice(toNumber(a), toNumber(b));
  }
};
var FixedBatch = class extends ArrayBatch {
  constructor(options) {
    super(options);
    this.stride = this.type.stride;
  }
};
var FixedBinaryBatch = class extends FixedBatch {
  /**
   * @param {number} index
   * @returns {Uint8Array}
   */
  value(index) {
    const { stride, values } = this;
    return (
      /** @type {Uint8Array} */
      values.subarray(index * stride, (index + 1) * stride)
    );
  }
};
var FixedListBatch = class extends FixedBatch {
  /**
   * @param {number} index
   * @returns {import('./types.js').ValueArray<V>}
   */
  value(index) {
    const { children, stride } = this;
    return children[0].slice(index * stride, (index + 1) * stride);
  }
};
function pairs({ children, offsets }, index) {
  const [keys, vals] = children[0].children;
  const start = offsets[index];
  const end = offsets[index + 1];
  const entries = [];
  for (let i = start; i < end; ++i) {
    entries.push([keys.at(i), vals.at(i)]);
  }
  return entries;
}
var MapEntryBatch = class extends ArrayBatch {
  /**
   * Return the value at the given index.
   * @param {number} index The value index.
   * @returns {[K, V][]} The map entries as an array of [key, value] arrays.
   */
  value(index) {
    return (
      /** @type {[K, V][]} */
      pairs(this, index)
    );
  }
};
var MapBatch = class extends ArrayBatch {
  /**
   * Return the value at the given index.
   * @param {number} index The value index.
   * @returns {Map<K, V>} The map value.
   */
  value(index) {
    return new Map(
      /** @type {[K, V][]} */
      pairs(this, index)
    );
  }
};
var SparseUnionBatch = class extends ArrayBatch {
  /**
   * Create a new column batch.
   * @param {object} options
   * @param {number} options.length The length of the batch
   * @param {number} options.nullCount The null value count
   * @param {import('./types.js').DataType} options.type The data type.
   * @param {Uint8Array} [options.validity] Validity bitmap buffer
   * @param {Int32Array} [options.offsets] Offsets buffer
   * @param {Batch[]} options.children Children batches
   * @param {Int8Array} options.typeIds Union type ids buffer
   * @param {Record<string, number>} options.map A typeId to children index map
   */
  constructor({ typeIds, ...options }) {
    super(options);
    this.typeIds = typeIds;
    this.typeMap = this.type.typeMap;
  }
  /**
   * @param {number} index The value index.
   */
  value(index, offset = index) {
    const { typeIds, children, typeMap } = this;
    return children[typeMap[typeIds[index]]].at(offset);
  }
};
var DenseUnionBatch = class extends SparseUnionBatch {
  /**
   * @param {number} index The value index.
   */
  value(index) {
    return super.value(
      index,
      /** @type {number} */
      this.offsets[index]
    );
  }
};
var StructBatch = class extends ArrayBatch {
  constructor(options, factory = objectFactory) {
    super(options);
    this.names = this.type.children.map((child) => child.name);
    this.factory = factory(this.names, this.children);
  }
  /**
   * @param {number} index The value index.
   * @returns {Record<string, any>}
   */
  value(index) {
    return this.factory(index);
  }
};
var StructProxyBatch = class extends StructBatch {
  constructor(options) {
    super(options, proxyFactory);
  }
};
var RunEndEncodedBatch = class extends ArrayBatch {
  /**
   * @param {number} index The value index.
   */
  value(index) {
    const [{ values: runs }, vals] = this.children;
    return vals.at(
      bisect(
        /** @type {import('./types.js').IntegerArray} */
        runs,
        index
      )
    );
  }
};
var DictionaryBatch = class extends ArrayBatch {
  /**
   * Register the backing dictionary. Dictionaries are added
   * after batch creation as the complete dictionary may not
   * be finished across multiple record batches.
   * @param {import('./column.js').Column<T>} dictionary
   * The dictionary of column values.
   */
  setDictionary(dictionary2) {
    this.dictionary = dictionary2;
    this.cache = dictionary2.cache();
    return this;
  }
  /**
   * @param {number} index The value index.
   */
  value(index) {
    return this.cache[this.key(index)];
  }
  /**
   * @param {number} index The value index.
   * @returns {number} The dictionary key
   */
  key(index) {
    return (
      /** @type {number} */
      this.values[index]
    );
  }
};
var ViewBatch = class extends ArrayBatch {
  /**
   * Create a new view batch.
   * @param {object} options Batch options.
   * @param {number} options.length The length of the batch
   * @param {number} options.nullCount The null value count
   * @param {import('./types.js').DataType} options.type The data type.
   * @param {Uint8Array} [options.validity] Validity bitmap buffer
   * @param {Uint8Array} options.values Values buffer
   * @param {Uint8Array[]} options.data View data buffers
   */
  constructor({ data, ...options }) {
    super(options);
    this.data = data;
  }
  /**
   * Get the binary data at the provided index.
   * @param {number} index The value index.
   * @returns {Uint8Array}
   */
  view(index) {
    const { values, data } = this;
    const offset = index << 4;
    let start = offset + 4;
    let buf2 = (
      /** @type {Uint8Array} */
      values
    );
    const length2 = readInt32(buf2, offset);
    if (length2 > 12) {
      start = readInt32(buf2, offset + 12);
      buf2 = data[readInt32(buf2, offset + 8)];
    }
    return buf2.subarray(start, start + length2);
  }
};
var BinaryViewBatch = class extends ViewBatch {
  /**
   * @param {number} index The value index.
   */
  value(index) {
    return this.view(index);
  }
};
var Utf8ViewBatch = class extends ViewBatch {
  /**
   * @param {number} index The value index.
   */
  value(index) {
    return decodeUtf8(this.view(index));
  }
};

// ../../node_modules/@uwdata/flechette/src/column.js
function columnBuilder(type) {
  let data = [];
  return {
    add(batch) {
      data.push(batch);
      return this;
    },
    clear: () => data = [],
    done: () => new Column(data, type)
  };
}
var Column = class {
  /**
   * Create a new column instance.
   * @param {import('./batch.js').Batch<T>[]} data The value batches.
   * @param {import('./types.js').DataType} [type] The column data type.
   *  If not specified, the type is extracted from the batches.
   */
  constructor(data, type = data[0]?.type) {
    this.type = type;
    this.length = data.reduce((m, c) => m + c.length, 0);
    this.nullCount = data.reduce((m, c) => m + c.nullCount, 0);
    this.data = data;
    const n = data.length;
    const offsets = new Int32Array(n + 1);
    if (n === 1) {
      const [batch] = data;
      offsets[1] = batch.length;
      this.at = (index) => batch.at(index);
    } else {
      for (let i = 0, s = 0; i < n; ++i) {
        offsets[i + 1] = s += data[i].length;
      }
    }
    this.offsets = offsets;
  }
  /**
   * Provide an informative object string tag.
   */
  get [Symbol.toStringTag]() {
    return "Column";
  }
  /**
   * Return an iterator over the values in this column.
   * @returns {Iterator<T?>}
   */
  [Symbol.iterator]() {
    const data = this.data;
    return data.length === 1 ? data[0][Symbol.iterator]() : batchedIterator(data);
  }
  /**
   * Return the column value at the given index. If a column has multiple
   * batches, this method performs binary search over the batch lengths to
   * determine the batch from which to retrieve the value. The search makes
   * lookup less efficient than a standard array access. If making a full
   * scan of a column, consider extracting arrays via `toArray()` or using an
   * iterator (`for (const value of column) {...}`).
   * @param {number} index The row index.
   * @returns {T | null} The value.
   */
  at(index) {
    const { data, offsets } = this;
    const i = bisect(offsets, index) - 1;
    return data[i]?.at(index - offsets[i]);
  }
  /**
   * Return the column value at the given index. This method is the same as
   * `at()` and is provided for better compatibility with Apache Arrow JS.
   * @param {number} index The row index.
   * @returns {T | null} The value.
   */
  get(index) {
    return this.at(index);
  }
  /**
   * Extract column values into a single array instance. When possible,
   * a zero-copy subarray of the input Arrow data is returned.
   * @returns {import('./types.js').ValueArray<T?>}
   */
  toArray() {
    const { length: length2, nullCount, data } = this;
    const copy = !nullCount && isDirectBatch(data[0]);
    const n = data.length;
    if (copy && n === 1) {
      return data[0].values;
    }
    const ArrayType = !n || nullCount > 0 ? Array : data[0].constructor.ArrayType ?? data[0].values.constructor;
    const array = new ArrayType(length2);
    return copy ? copyArray(array, data) : extractArray(array, data);
  }
  /**
   * Return an array of cached column values.
   * Used internally to accelerate dictionary types.
   */
  cache() {
    return this._cache ?? (this._cache = this.toArray());
  }
};
function* batchedIterator(data) {
  for (let i = 0; i < data.length; ++i) {
    const iter = data[i][Symbol.iterator]();
    for (let next = iter.next(); !next.done; next = iter.next()) {
      yield next.value;
    }
  }
}
function copyArray(array, data) {
  for (let i = 0, offset = 0; i < data.length; ++i) {
    const { values } = data[i];
    array.set(values, offset);
    offset += values.length;
  }
  return array;
}
function extractArray(array, data) {
  let index = -1;
  for (let i = 0; i < data.length; ++i) {
    const batch = data[i];
    for (let j = 0; j < batch.length; ++j) {
      array[++index] = batch.at(j);
    }
  }
  return array;
}

// ../../node_modules/@uwdata/flechette/src/table.js
var Table = class _Table {
  /**
   * Create a new table with the given schema and columns (children).
   * @param {import('./types.js').Schema} schema The table schema.
   * @param {import('./column.js').Column[]} children The table columns.
   * @param {boolean} [useProxy=false] Flag indicating if row proxy
   *  objects should be used to represent table rows (default `false`).
   */
  constructor(schema, children, useProxy = false) {
    const names = schema.fields.map((f) => f.name);
    this.schema = schema;
    this.names = names;
    this.children = children;
    this.factory = useProxy ? proxyFactory : objectFactory;
    const gen = [];
    this.getFactory = (b) => gen[b] ?? (gen[b] = this.factory(names, children.map((c) => c.data[b])));
  }
  /**
   * Provide an informative object string tag.
   */
  get [Symbol.toStringTag]() {
    return "Table";
  }
  /**
   * The number of columns in this table.
   * @return {number} The number of columns.
   */
  get numCols() {
    return this.names.length;
  }
  /**
   * The number of rows in this table.
   * @return {number} The number of rows.
   */
  get numRows() {
    return this.children[0]?.length ?? 0;
  }
  /**
   * Return the child column at the given index position.
   * @param {number} index The column index.
   * @returns {import('./column.js').Column<any>}
   */
  getChildAt(index) {
    return this.children[index];
  }
  /**
   * Return the first child column with the given name.
   * @param {string} name The column name.
   * @returns {import('./column.js').Column<any>}
   */
  getChild(name) {
    const i = this.names.findIndex((x2) => x2 === name);
    return i > -1 ? this.children[i] : void 0;
  }
  /**
   * Construct a new table containing only columns at the specified indices.
   * The order of columns in the new table matches the order of input indices.
   * @param {number[]} indices The indices of columns to keep.
   * @param {string[]} [as] Optional new names for selected columns.
   * @returns {Table} A new table with columns at the specified indices.
   */
  selectAt(indices, as = []) {
    const { children, factory, schema } = this;
    const { fields } = schema;
    return new _Table(
      {
        ...schema,
        fields: indices.map((i, j) => renameField(fields[i], as[j]))
      },
      indices.map((i) => children[i]),
      factory === proxyFactory
    );
  }
  /**
   * Construct a new table containing only columns with the specified names.
   * If columns have duplicate names, the first (with lowest index) is used.
   * The order of columns in the new table matches the order of input names.
   * @param {string[]} names Names of columns to keep.
   * @param {string[]} [as] Optional new names for selected columns.
   * @returns {Table} A new table with columns matching the specified names.
   */
  select(names, as) {
    const all = this.names;
    const indices = names.map((name) => all.indexOf(name));
    return this.selectAt(indices, as);
  }
  /**
   * Return an object mapping column names to extracted value arrays.
   * @returns {Record<string, import('./types.js').ValueArray<any>>}
   */
  toColumns() {
    const { children, names } = this;
    const cols = {};
    names.forEach((name, i) => cols[name] = children[i]?.toArray() ?? []);
    return cols;
  }
  /**
   * Return an array of objects representing the rows of this table.
   * @returns {Record<string, any>[]}
   */
  toArray() {
    const { children, getFactory, numRows } = this;
    const data = children[0]?.data ?? [];
    const output = Array(numRows);
    for (let b = 0, row = -1; b < data.length; ++b) {
      const f = getFactory(b);
      for (let i = 0; i < data[b].length; ++i) {
        output[++row] = f(i);
      }
    }
    return output;
  }
  /**
   * Return an iterator over objects representing the rows of this table.
   * @returns {Generator<Record<string, any>, any, null>}
   */
  *[Symbol.iterator]() {
    const { children, getFactory } = this;
    const data = children[0]?.data ?? [];
    for (let b = 0; b < data.length; ++b) {
      const f = getFactory(b);
      for (let i = 0; i < data[b].length; ++i) {
        yield f(i);
      }
    }
  }
  /**
   * Return a row object for the given index.
   * @param {number} index The row index.
   * @returns {Record<string, any>} The row object.
   */
  at(index) {
    const { children, getFactory, numRows } = this;
    if (index < 0 || index >= numRows) return null;
    const [{ offsets }] = children;
    const b = bisect(offsets, index) - 1;
    return getFactory(b)(index - offsets[b]);
  }
  /**
   * Return a row object for the given index. This method is the same as
   * `at()` and is provided for better compatibility with Apache Arrow JS.
   * @param {number} index The row index.
   * @returns {Record<string, any>} The row object.
   */
  get(index) {
    return this.at(index);
  }
};
function renameField(field2, name) {
  return name != null && name !== field2.name ? { ...field2, name } : field2;
}

// ../../node_modules/@uwdata/flechette/src/batch-type.js
function batchType(type, options = {}) {
  const { typeId, bitWidth, precision, unit } = type;
  const { useBigInt, useDate, useDecimalBigInt, useMap, useProxy } = options;
  switch (typeId) {
    case Type.Null:
      return NullBatch;
    case Type.Bool:
      return BoolBatch;
    case Type.Int:
    case Type.Time:
    case Type.Duration:
      return useBigInt || bitWidth < 64 ? DirectBatch : Int64Batch;
    case Type.Float:
      return precision ? DirectBatch : Float16Batch;
    case Type.Date:
      return wrap(
        unit === DateUnit.DAY ? DateDayBatch : DateDayMillisecondBatch,
        useDate && DateBatch
      );
    case Type.Timestamp:
      return wrap(
        unit === TimeUnit.SECOND ? TimestampSecondBatch : unit === TimeUnit.MILLISECOND ? TimestampMillisecondBatch : unit === TimeUnit.MICROSECOND ? TimestampMicrosecondBatch : TimestampNanosecondBatch,
        useDate && DateBatch
      );
    case Type.Decimal:
      return useDecimalBigInt ? DecimalBigIntBatch : DecimalNumberBatch;
    case Type.Interval:
      return unit === IntervalUnit.DAY_TIME ? IntervalDayTimeBatch : unit === IntervalUnit.YEAR_MONTH ? DirectBatch : IntervalMonthDayNanoBatch;
    case Type.FixedSizeBinary:
      return FixedBinaryBatch;
    case Type.Utf8:
      return Utf8Batch;
    case Type.LargeUtf8:
      return LargeUtf8Batch;
    case Type.Binary:
      return BinaryBatch;
    case Type.LargeBinary:
      return LargeBinaryBatch;
    case Type.BinaryView:
      return BinaryViewBatch;
    case Type.Utf8View:
      return Utf8ViewBatch;
    case Type.List:
      return ListBatch;
    case Type.LargeList:
      return LargeListBatch;
    case Type.Map:
      return useMap ? MapBatch : MapEntryBatch;
    case Type.ListView:
      return ListViewBatch;
    case Type.LargeListView:
      return LargeListViewBatch;
    case Type.FixedSizeList:
      return FixedListBatch;
    case Type.Struct:
      return useProxy ? StructProxyBatch : StructBatch;
    case Type.RunEndEncoded:
      return RunEndEncodedBatch;
    case Type.Dictionary:
      return DictionaryBatch;
    case Type.Union:
      return type.mode ? DenseUnionBatch : SparseUnionBatch;
  }
  throw new Error(invalidDataType(typeId));
}
function wrap(BaseClass, WrapperClass) {
  return WrapperClass ? class WrapBatch extends WrapperClass {
    constructor(options) {
      super(new BaseClass(options));
    }
  } : BaseClass;
}

// ../../node_modules/@uwdata/flechette/src/decode/block.js
function decodeBlock(buf2, index) {
  return {
    offset: readInt64(buf2, index),
    metadataLength: readInt32(buf2, index + 8),
    bodyLength: readInt64(buf2, index + 16)
  };
}
function decodeBlocks(buf2, index) {
  return readVector(buf2, index, 24, decodeBlock);
}

// ../../node_modules/@uwdata/flechette/src/decode/record-batch.js
function decodeRecordBatch(buf2, index, version) {
  const get = readObject(buf2, index);
  if (get(10, readOffset, 0)) {
    throw new Error("Record batch compression not implemented");
  }
  const offset = version < Version.V4 ? 8 : 0;
  return {
    length: get(4, readInt64, 0),
    nodes: readVector(buf2, get(6, readOffset), 16, (buf3, pos) => ({
      length: readInt64(buf3, pos),
      nullCount: readInt64(buf3, pos + 8)
    })),
    regions: readVector(buf2, get(8, readOffset), 16 + offset, (buf3, pos) => ({
      offset: readInt64(buf3, pos + offset),
      length: readInt64(buf3, pos + offset + 8)
    })),
    variadic: readVector(buf2, get(12, readOffset), 8, readInt64)
  };
}

// ../../node_modules/@uwdata/flechette/src/decode/dictionary-batch.js
function decodeDictionaryBatch(buf2, index, version) {
  const get = readObject(buf2, index);
  return {
    id: get(4, readInt64, 0),
    data: get(6, (buf3, off) => decodeRecordBatch(buf3, off, version)),
    /**
     * If isDelta is true the values in the dictionary are to be appended to a
     * dictionary with the indicated id. If isDelta is false this dictionary
     * should replace the existing dictionary.
     */
    isDelta: get(8, readBoolean, false)
  };
}

// ../../node_modules/@uwdata/flechette/src/decode/data-type.js
function decodeDataType(buf2, index, typeId, children) {
  checkOneOf(typeId, Type, invalidDataType);
  const get = readObject(buf2, index);
  switch (typeId) {
    // types without flatbuffer objects
    case Type.Binary:
      return binary();
    case Type.Utf8:
      return utf8();
    case Type.LargeBinary:
      return largeBinary();
    case Type.LargeUtf8:
      return largeUtf8();
    case Type.List:
      return list(children[0]);
    case Type.ListView:
      return listView(children[0]);
    case Type.LargeList:
      return largeList(children[0]);
    case Type.LargeListView:
      return largeListView(children[0]);
    case Type.Struct:
      return struct(children);
    case Type.RunEndEncoded:
      return runEndEncoded(children[0], children[1]);
    // types with flatbuffer objects
    case Type.Int:
      return int(
        // @ts-ignore
        get(4, readInt32, 0),
        // bitwidth
        get(6, readBoolean, false)
        // signed
      );
    case Type.Float:
      return float(
        // @ts-ignore
        get(4, readInt16, Precision.HALF)
        // precision
      );
    case Type.Decimal:
      return decimal(
        get(4, readInt32, 0),
        // precision
        get(6, readInt32, 0),
        // scale
        // @ts-ignore
        get(8, readInt32, 128)
        // bitwidth
      );
    case Type.Date:
      return date(
        // @ts-ignore
        get(4, readInt16, DateUnit.MILLISECOND)
        // unit
      );
    case Type.Time:
      return time(
        // @ts-ignore
        get(4, readInt16, TimeUnit.MILLISECOND),
        // unit
        get(6, readInt32, 32)
        // bitWidth
      );
    case Type.Timestamp:
      return timestamp(
        // @ts-ignore
        get(4, readInt16, TimeUnit.SECOND),
        // unit
        get(6, readString)
        // timezone
      );
    case Type.Interval:
      return interval(
        // @ts-ignore
        get(4, readInt16, IntervalUnit.YEAR_MONTH)
        // unit
      );
    case Type.Duration:
      return duration(
        // @ts-ignore
        get(4, readInt16, TimeUnit.MILLISECOND)
        // unit
      );
    case Type.FixedSizeBinary:
      return fixedSizeBinary(
        get(4, readInt32, 0)
        // stride
      );
    case Type.FixedSizeList:
      return fixedSizeList(
        children[0],
        get(4, readInt32, 0)
        // stride
      );
    case Type.Map:
      return mapType(
        get(4, readBoolean, false),
        // keysSorted
        children[0]
      );
    case Type.Union:
      return union(
        // @ts-ignore
        get(4, readInt16, UnionMode.Sparse),
        // mode
        children,
        readVector(buf2, get(6, readOffset), 4, readInt32)
        // type ids
      );
  }
  return { typeId };
}

// ../../node_modules/@uwdata/flechette/src/decode/metadata.js
function decodeMetadata(buf2, index) {
  const entries = readVector(buf2, index, 4, (buf3, pos) => {
    const get = readObject(buf3, pos);
    return (
      /** @type {[string, string]} */
      [
        get(4, readString),
        // 4: key (string)
        get(6, readString)
        // 6: key (string)
      ]
    );
  });
  return entries.length ? new Map(entries) : null;
}

// ../../node_modules/@uwdata/flechette/src/decode/schema.js
function decodeSchema(buf2, index, version) {
  const get = readObject(buf2, index);
  return {
    version,
    endianness: (
      /** @type {import('../types.js').Endianness_} */
      get(4, readInt16, 0)
    ),
    fields: get(6, decodeSchemaFields, []),
    metadata: get(8, decodeMetadata)
  };
}
function decodeSchemaFields(buf2, fieldsOffset) {
  return readVector(buf2, fieldsOffset, 4, decodeField);
}
function decodeField(buf2, index) {
  const get = readObject(buf2, index);
  const typeId = get(8, readUint8, Type.NONE);
  const typeOffset = get(10, readOffset, 0);
  const dict = get(12, decodeDictionary);
  const children = get(14, (buf3, off) => decodeFieldChildren(buf3, off));
  let type = decodeDataType(buf2, typeOffset, typeId, children);
  if (dict) {
    dict.dictionary = type;
    type = dict;
  }
  return {
    name: get(4, readString),
    type,
    nullable: get(6, readBoolean, false),
    metadata: get(16, decodeMetadata)
  };
}
function decodeFieldChildren(buf2, fieldOffset) {
  const children = readVector(buf2, fieldOffset, 4, decodeField);
  return children.length ? children : null;
}
function decodeDictionary(buf2, index) {
  if (!index) return null;
  const get = readObject(buf2, index);
  return dictionary(
    null,
    // data type will be populated by caller
    get(6, decodeInt, int32()),
    // index type
    get(8, readBoolean, false),
    // ordered
    get(4, readInt64, 0)
    // id
  );
}
function decodeInt(buf2, index) {
  return (
    /** @type {import('../types.js').IntType} */
    decodeDataType(buf2, index, Type.Int)
  );
}

// ../../node_modules/@uwdata/flechette/src/decode/message.js
var invalidMessageMetadata = (expected, actual) => `Expected to read ${expected} metadata bytes, but only read ${actual}.`;
var invalidMessageBodyLength = (expected, actual) => `Expected to read ${expected} bytes for message body, but only read ${actual}.`;
var invalidMessageType = (type) => `Unsupported message type: ${type} (${keyFor(MessageHeader, type)})`;
function decodeMessage(buf2, index) {
  let metadataLength = readInt32(buf2, index) || 0;
  index += SIZEOF_INT;
  if (metadataLength === -1) {
    metadataLength = readInt32(buf2, index) || 0;
    index += SIZEOF_INT;
  }
  if (metadataLength === 0) return null;
  const head = buf2.subarray(index, index += metadataLength);
  if (head.byteLength < metadataLength) {
    throw new Error(invalidMessageMetadata(metadataLength, head.byteLength));
  }
  const get = readObject(head, 0);
  const version = (
    /** @type {import('../types.js').Version_} */
    get(4, readInt16, Version.V1)
  );
  const type = (
    /** @type {import('../types.js').MessageHeader_} */
    get(6, readUint8, MessageHeader.NONE)
  );
  const offset = get(8, readOffset, 0);
  const bodyLength = get(10, readInt64, 0);
  let content;
  if (offset) {
    const decoder = type === MessageHeader.Schema ? decodeSchema : type === MessageHeader.DictionaryBatch ? decodeDictionaryBatch : type === MessageHeader.RecordBatch ? decodeRecordBatch : null;
    if (!decoder) throw new Error(invalidMessageType(type));
    content = decoder(head, offset, version);
    if (bodyLength > 0) {
      const body = buf2.subarray(index, index += bodyLength);
      if (body.byteLength < bodyLength) {
        throw new Error(invalidMessageBodyLength(bodyLength, body.byteLength));
      }
      content.body = body;
    }
  }
  return { version, type, index, content };
}

// ../../node_modules/@uwdata/flechette/src/decode/decode-ipc.js
function decodeIPC(data) {
  const source = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
  return source instanceof Uint8Array && isArrowFileFormat(source) ? decodeIPCFile(source) : decodeIPCStream(source);
}
function isArrowFileFormat(buf2) {
  if (!buf2 || buf2.length < 4) return false;
  for (let i = 0; i < 6; ++i) {
    if (MAGIC[i] !== buf2[i]) return false;
  }
  return true;
}
function decodeIPCStream(data) {
  const stream = [data].flat();
  let schema;
  const records = [];
  const dictionaries = [];
  for (const buf2 of stream) {
    if (!(buf2 instanceof Uint8Array)) {
      throw new Error(`IPC data batch was not a Uint8Array.`);
    }
    let offset = 0;
    while (true) {
      const m = decodeMessage(buf2, offset);
      if (m === null) break;
      offset = m.index;
      if (!m.content) continue;
      switch (m.type) {
        case MessageHeader.Schema:
          if (!schema) schema = m.content;
          break;
        case MessageHeader.RecordBatch:
          records.push(m.content);
          break;
        case MessageHeader.DictionaryBatch:
          dictionaries.push(m.content);
          break;
      }
    }
  }
  return (
    /** @type {import('../types.js').ArrowData} */
    { schema, dictionaries, records, metadata: null }
  );
}
function decodeIPCFile(data) {
  const offset = data.byteLength - (MAGIC.length + 4);
  const length2 = readInt32(data, offset);
  const get = readObject(data, offset - length2);
  const version = (
    /** @type {import('../types.js').Version_} */
    get(4, readInt16, Version.V1)
  );
  const dicts = get(8, decodeBlocks, []);
  const recs = get(10, decodeBlocks, []);
  return (
    /** @type {import('../types.js').ArrowData} */
    {
      schema: get(6, (buf2, index) => decodeSchema(buf2, index, version)),
      dictionaries: dicts.map(({ offset: offset2 }) => decodeMessage(data, offset2).content),
      records: recs.map(({ offset: offset2 }) => decodeMessage(data, offset2).content),
      metadata: get(12, decodeMetadata)
    }
  );
}

// ../../node_modules/@uwdata/flechette/src/decode/table-from-ipc.js
function tableFromIPC(data, options) {
  return createTable(decodeIPC(data), options);
}
function createTable(data, options = {}) {
  const { schema = { fields: [] }, dictionaries, records } = data;
  const { version, fields } = schema;
  const dictionaryMap = /* @__PURE__ */ new Map();
  const context = contextGenerator(options, version, dictionaryMap);
  const dictionaryTypes = /* @__PURE__ */ new Map();
  visitSchemaFields(schema, (field2) => {
    const type = field2.type;
    if (type.typeId === Type.Dictionary) {
      dictionaryTypes.set(type.id, type.dictionary);
    }
  });
  const dicts = /* @__PURE__ */ new Map();
  for (const dict of dictionaries) {
    const { id, data: data2, isDelta, body } = dict;
    const type = dictionaryTypes.get(id);
    const batch = visit(type, context({ ...data2, body }));
    if (!dicts.has(id)) {
      if (isDelta) {
        throw new Error("Delta update can not be first dictionary batch.");
      }
      dicts.set(id, columnBuilder(type).add(batch));
    } else {
      const dict2 = dicts.get(id);
      if (!isDelta) dict2.clear();
      dict2.add(batch);
    }
  }
  dicts.forEach((value, key) => dictionaryMap.set(key, value.done()));
  const cols = fields.map((f) => columnBuilder(f.type));
  for (const batch of records) {
    const ctx = context(batch);
    fields.forEach((f, i) => cols[i].add(visit(f.type, ctx)));
  }
  return new Table(schema, cols.map((c) => c.done()), options.useProxy);
}
function visitSchemaFields(schema, visitor) {
  schema.fields.forEach(function visitField(field2) {
    visitor(field2);
    field2.type.dictionary?.children?.forEach(visitField);
    field2.type.children?.forEach(visitField);
  });
}
function contextGenerator(options, version, dictionaryMap) {
  const base = {
    version,
    options,
    dictionary: (id) => dictionaryMap.get(id)
  };
  return (batch) => {
    const { length: length2, nodes, regions, variadic, body } = batch;
    let nodeIndex = -1;
    let bufferIndex = -1;
    let variadicIndex = -1;
    return {
      ...base,
      length: length2,
      node: () => nodes[++nodeIndex],
      buffer: (ArrayType) => {
        const { length: length3, offset } = regions[++bufferIndex];
        return ArrayType ? new ArrayType(body.buffer, body.byteOffset + offset, length3 / ArrayType.BYTES_PER_ELEMENT) : body.subarray(offset, offset + length3);
      },
      variadic: () => variadic[++variadicIndex],
      visit(children) {
        return children.map((f) => visit(f.type, this));
      }
    };
  };
}
function visit(type, ctx) {
  const { typeId } = type;
  const { length: length2, options, node, buffer: buffer2, variadic, version } = ctx;
  const BatchType = batchType(type, options);
  if (typeId === Type.Null) {
    return new BatchType({ length: length2, nullCount: length2, type });
  }
  const base = { ...node(), type };
  switch (typeId) {
    // validity and data value buffers
    case Type.Bool:
    case Type.Int:
    case Type.Time:
    case Type.Duration:
    case Type.Float:
    case Type.Decimal:
    case Type.Date:
    case Type.Timestamp:
    case Type.Interval:
    case Type.FixedSizeBinary:
      return new BatchType({
        ...base,
        validity: buffer2(),
        values: buffer2(type.values)
      });
    // validity, offset, and value buffers
    case Type.Utf8:
    case Type.LargeUtf8:
    case Type.Binary:
    case Type.LargeBinary:
      return new BatchType({
        ...base,
        validity: buffer2(),
        offsets: buffer2(type.offsets),
        values: buffer2()
      });
    // views with variadic buffers
    case Type.BinaryView:
    case Type.Utf8View:
      return new BatchType({
        ...base,
        validity: buffer2(),
        values: buffer2(),
        // views buffer
        data: Array.from({ length: variadic() }, () => buffer2())
        // data buffers
      });
    // validity, offset, and list child
    case Type.List:
    case Type.LargeList:
    case Type.Map:
      return new BatchType({
        ...base,
        validity: buffer2(),
        offsets: buffer2(type.offsets),
        children: ctx.visit(type.children)
      });
    // validity, offset, size, and list child
    case Type.ListView:
    case Type.LargeListView:
      return new BatchType({
        ...base,
        validity: buffer2(),
        offsets: buffer2(type.offsets),
        sizes: buffer2(type.offsets),
        children: ctx.visit(type.children)
      });
    // validity and children
    case Type.FixedSizeList:
    case Type.Struct:
      return new BatchType({
        ...base,
        validity: buffer2(),
        children: ctx.visit(type.children)
      });
    // children only
    case Type.RunEndEncoded:
      return new BatchType({
        ...base,
        children: ctx.visit(type.children)
      });
    // dictionary
    case Type.Dictionary: {
      const { id, indices } = type;
      return new BatchType({
        ...base,
        validity: buffer2(),
        values: buffer2(indices.values)
      }).setDictionary(ctx.dictionary(id));
    }
    // union
    case Type.Union: {
      if (version < Version.V5) {
        buffer2();
      }
      return new BatchType({
        ...base,
        typeIds: buffer2(int8Array),
        offsets: type.mode === UnionMode.Sparse ? null : buffer2(type.offsets),
        children: ctx.visit(type.children)
      });
    }
    // unsupported type
    default:
      throw new Error(invalidDataType(typeId));
  }
}

// ../../node_modules/@uwdata/flechette/src/encode/schema.js
var isLittleEndian = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;

// ../core/src/util/decode-ipc.js
function decodeIPC2(data) {
  return tableFromIPC(data, { useDate: true });
}

// ../core/src/connectors/socket.js
function socketConnector(uri = "ws://localhost:3000/") {
  const queue = [];
  let connected = false;
  let request = null;
  let ws;
  const events = {
    open() {
      connected = true;
      next();
    },
    close() {
      connected = false;
      request = null;
      ws = null;
      while (queue.length) {
        queue.shift().reject("Socket closed");
      }
    },
    error(event) {
      if (request) {
        const { reject } = request;
        request = null;
        next();
        reject(event);
      } else {
        console.error("WebSocket error: ", event);
      }
    },
    message({ data }) {
      if (request) {
        const { query, resolve, reject } = request;
        request = null;
        next();
        if (typeof data === "string") {
          const json = JSON.parse(data);
          json.error ? reject(json.error) : resolve(json);
        } else if (query.type === "exec") {
          resolve();
        } else if (query.type === "arrow") {
          resolve(decodeIPC2(data));
        } else {
          throw new Error(`Unexpected socket data: ${data}`);
        }
      } else {
        console.log("WebSocket message: ", data);
      }
    }
  };
  function init() {
    ws = new WebSocket(uri);
    ws.binaryType = "arraybuffer";
    for (const type in events) {
      ws.addEventListener(type, events[type]);
    }
  }
  function enqueue(query, resolve, reject) {
    if (ws == null) init();
    queue.push({ query, resolve, reject });
    if (connected && !request) next();
  }
  function next() {
    if (queue.length) {
      request = queue.shift();
      ws.send(JSON.stringify(request.query));
    }
  }
  return {
    get connected() {
      return connected;
    },
    /**
     * Query the DuckDB server.
     * @param {object} query
     * @param {'exec' | 'arrow' | 'json' | 'create-bundle' | 'load-bundle'} [query.type] The query type.
     * @param {string} [query.sql] A SQL query string.
     * @param {string[]} [query.queries] The queries used to create a bundle.
     * @param {string} [query.name] The name of a bundle to create or load.
     * @returns the query result
     */
    query(query) {
      return new Promise(
        (resolve, reject) => enqueue(query, resolve, reject)
      );
    }
  };
}

// ../sql/src/constants.js
var COLUMN_REF = "COLUMN_REF";
var COLUMN_PARAM = "COLUMN_PARAM";
var TABLE_REF = "TABLE_REF";
var LITERAL = "LITERAL";
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

// ../sql/src/ast/node.js
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

// ../sql/src/ast/literal.js
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

// ../sql/src/ast/param.js
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

// ../sql/src/util/string.js
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

// ../sql/src/ast/table-ref.js
function isTableRef(value) {
  return value instanceof TableRefNode;
}
var TableRefNode = class extends ExprNode {
  /**
   * Instantiate a table reference node.
   * @param {string | string[]} table The table name.
   */
  constructor(table2) {
    super(TABLE_REF);
    this.table = [table2].flat();
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

// ../sql/src/ast/function.js
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

// ../sql/src/util/function.js
function fn(name, ...args) {
  return new FunctionNode(name, argsList(args).map(asNode));
}
function aggFn(name, ...args) {
  return new AggregateNode(name, argsList(args).map(asNode));
}
function exprList(list2, cast2 = asNode) {
  return list2.flat().filter((x2) => x2 != null).map((x2) => cast2(x2));
}
function argsList(list2) {
  const n = list2.length;
  let i = n;
  for (; i > 0 && list2[i - 1] === void 0; --i) ;
  return i < n ? list2.slice(0, i) : list2;
}

// ../sql/src/util/type-check.js
function isString(value) {
  return typeof value === "string";
}
function isArray2(value) {
  return Array.isArray(value);
}
function isParamLike(value) {
  return value && typeof value.addEventListener === "function" && value.dynamic !== false && "value" in value;
}

// ../sql/src/ast/window.js
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

// ../sql/src/ast/column-ref.js
function isColumnRef(value) {
  return value instanceof ColumnRefNode;
}
var ColumnRefNode = class extends ExprNode {
  /**
   * Instantiate a column reference node.
   * @param {import('./table-ref.js').TableRefNode} [table] The table reference.
   */
  constructor(type, table2) {
    super(type);
    this.table = table2;
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
    const { column: column2, table: table2 } = this;
    const tref = `${table2 ?? ""}`;
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
  constructor(name, table2) {
    super(COLUMN_REF, table2);
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

// ../sql/src/ast/column-param.js
var ColumnParamNode = class extends ColumnRefNode {
  /**
   * Instantiate a column param node.
   * @param {import('./param.js').ParamNode} param The column name as a
   *  parameter node.
   * @param {import('./table-ref.js').TableRefNode} [table] The table
   *  reference.
   */
  constructor(param, table2) {
    super(COLUMN_PARAM, table2);
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

// ../sql/src/functions/column.js
function column(name, table2) {
  const tref = asTableRef(table2);
  return isParamLike(name) ? new ColumnParamNode(new ParamNode(name), tref) : new ColumnNameRefNode(name, tref);
}

// ../sql/src/ast/verbatim.js
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

// ../sql/src/functions/literal.js
function literal(value) {
  return new LiteralNode(value);
}
function verbatim(value) {
  return new VerbatimNode(value);
}

// ../sql/src/functions/table-ref.js
function tableRef(...ids) {
  const args = exprList(ids, String);
  return args?.length ? new TableRefNode(args) : void 0;
}

// ../sql/src/util/ast.js
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
  return isString(value) ? parseTableRef(value) : isArray2(value) ? tableRef(value) : value;
}
function parseColumnRef(ref) {
  const ids = parseIdentifier(ref);
  return column(ids.pop(), tableRef(ids));
}
function parseTableRef(ref) {
  return tableRef(parseIdentifier(ref));
}

// ../sql/src/ast/aggregate.js
var AggregateNode = class _AggregateNode extends ExprNode {
  /**
   * Instantiate an aggregate function node.
   * @param {string} name The aggregate function name.
   * @param {ExprNode[]} args The aggregate function arguments.
   * @param {boolean} [distinct] The distinct flag.
   * @param {ExprNode} [filter] Filter expression.
   */
  constructor(name, args, distinct2, filter) {
    super(AGGREGATE);
    this.name = name;
    this.args = args;
    this.isDistinct = distinct2;
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

// ../sql/src/ast/between-op.js
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

// ../sql/src/ast/binary-op.js
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

// ../sql/src/ast/cast.js
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

// ../sql/src/ast/fragment.js
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

// ../sql/src/ast/sample.js
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

// ../sql/src/ast/select.js
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

// ../sql/src/ast/with.js
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

// ../sql/src/ast/query.js
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
    const list2 = [];
    const add2 = (name, q) => {
      const query = q.clone();
      query.cteFor = this;
      list2.push(new WithClauseNode(name, query));
    };
    expr.flat().forEach((e) => {
      if (e != null) for (const name in e) add2(name, e[name]);
    });
    this._with = this._with.concat(list2);
    return this;
  }
  /**
   * Add SELECT expressions.
   * @param {...import('../types.js').SelectExpr} expr Expressions to add.
   * @returns {this}
   */
  select(...expr) {
    const list2 = [];
    const add2 = (v, as) => list2.push(
      new SelectClauseNode(v == null ? v : asNode(v), unquote(as))
    );
    expr.flat().forEach((e) => {
      if (e == null) return;
      else if (isString(e)) add2(e, e);
      else if (isColumnRef(e)) add2(e, e.column);
      else if (isArray2(e)) add2(e[1], e[0]);
      else for (const alias in e) add2(e[alias], alias);
    });
    const keys = new Set(list2.map((x2) => x2.alias));
    this._select = this._select.filter((x2) => !keys.has(x2.alias)).concat(list2.filter((x2) => x2.expr));
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
    const list2 = [];
    const add2 = (v, as) => list2.push(new FromClauseNode(asTableRef(v), unquote(as)));
    expr.flat().forEach((e) => {
      if (e == null) return;
      else if (isString(e)) add2(e, e);
      else if (isTableRef(e)) add2(e, e.name);
      else if (isNode(e)) add2(e);
      else if (isArray2(e)) add2(e[1], e[0]);
      else for (const alias in e) add2(e[alias], alias);
    });
    this._from = this._from.concat(list2);
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
    const list2 = [];
    expr.flat().forEach((e) => {
      if (e != null) for (const name in e) {
        list2.push(new WindowClauseNode(unquote(name), e[name]));
      }
    });
    this._window = this._window.concat(list2);
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

// ../sql/src/ast/from.js
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

// ../sql/src/ast/in-op.js
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

// ../sql/src/ast/logical-op.js
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

// ../sql/src/ast/order-by.js
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

// ../sql/src/ast/unary-op.js
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

// ../sql/src/functions/aggregate.js
function argmax(y2, x2) {
  return aggFn("arg_max", y2, x2);
}
function argmin(y2, x2) {
  return aggFn("arg_min", y2, x2);
}
function count(expr) {
  return aggFn("count", expr);
}
function max(expr) {
  return aggFn("max", expr);
}
function min(expr) {
  return aggFn("min", expr);
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
function sum(expr) {
  return aggFn("sum", expr);
}

// ../sql/src/functions/cast.js
function cast(expr, type) {
  return new CastNode(asNode(expr), type);
}
function int322(expr) {
  return cast(expr, "INTEGER");
}
function float642(expr) {
  return cast(expr, "DOUBLE");
}

// ../sql/src/functions/datetime.js
function epoch_ms(expr) {
  return fn("epoch_ms", expr);
}

// ../sql/src/functions/numeric.js
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

// ../sql/src/functions/operators.js
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
function isNull(expr) {
  return unaryPostfixOp("IS NULL", expr);
}
function isNotNull(expr) {
  return unaryPostfixOp("IS NOT NULL", expr);
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
function pow(left, right) {
  return binaryOp("**", left, right);
}
function isNotDistinct(left, right) {
  return binaryOp("IS NOT DISTINCT FROM", left, right);
}
function isBetween(expr, extent) {
  return betweenOp(expr, extent, false);
}
function isIn(expr, values) {
  return new InOpNode(asNode(expr), values.map(asNode));
}

// ../sql/src/functions/order-by.js
function desc(expr, nullsFirst) {
  return new OrderByNode(asNode(expr), true, nullsFirst);
}

// ../sql/src/functions/sql-template-tag.js
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

// ../sql/src/functions/string.js
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

// ../sql/src/visit/recurse.js
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

// ../sql/src/visit/rewrite.js
function rewrite(node, map2) {
  if (map2.has(node)) {
    return map2.get(node);
  } else if (isNode(node)) {
    const props = recurse[node.type];
    const n = props?.length ?? 0;
    for (let i = 0; i < n; ++i) {
      const prop = props[i];
      const child = node[prop];
      if (Array.isArray(child)) {
        const m = child.length;
        for (let j = 0; j < m; ++j) {
          child[j] = rewrite(child[j], map2);
        }
      } else if (child) {
        node[prop] = rewrite(child, map2);
      }
    }
  }
  return node;
}

// ../sql/src/visit/walk.js
function walk(node, visit2) {
  if (!isNode(node)) return;
  const result = visit2(node);
  if (result) return result;
  const props = recurse[node.type];
  const n = props?.length ?? 0;
  for (let i = 0; i < n; ++i) {
    const value = node[props[i]];
    if (Array.isArray(value)) {
      const m = value.length;
      for (let j = 0; j < m; ++j) {
        if (value[j] && +walk(value[j], visit2) < 0) {
          return result;
        }
      }
    } else if (value && +walk(value, visit2) < 0) {
      return -1;
    }
  }
}

// ../sql/src/visit/visitors.js
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

// ../sql/src/load/create.js
function createTable2(name, query, {
  replace = false,
  temp = false,
  view = false
} = {}) {
  return "CREATE" + (replace ? " OR REPLACE " : " ") + (temp ? "TEMP " : "") + (view ? "VIEW" : "TABLE") + (replace ? " " : " IF NOT EXISTS ") + name + " AS " + query;
}

// ../sql/src/transforms/scales.js
var identity = (x2) => x2;
function scaleLinear() {
  return {
    apply: identity,
    invert: identity,
    sqlApply: asNode,
    sqlInvert: identity
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
    sqlInvert: identity
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

// ../core/src/util/hash.js
function fnv_hash(v) {
  let a = 2166136261;
  for (let i = 0, n = v.length; i < n; ++i) {
    const c = v.charCodeAt(i);
    const d = c & 65280;
    if (d) a = fnv_multiply(a ^ d >> 8);
    a = fnv_multiply(a ^ c & 255);
  }
  return fnv_mix(a) >>> 0;
}
function fnv_multiply(a) {
  return a + (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
}
function fnv_mix(a) {
  a += a << 13;
  a ^= a >>> 7;
  a += a << 3;
  a ^= a >>> 17;
  a += a << 5;
  return a & 4294967295;
}

// ../core/src/preagg/sufficient-statistics.js
function sufficientStatistics(node, preagg, avg2) {
  switch (node.name) {
    case "count":
    case "sum":
      return sumExpr(preagg, node);
    case "avg":
      return avgExpr(preagg, node);
    case "arg_max":
      return argmaxExpr(preagg, node);
    case "arg_min":
      return argminExpr(preagg, node);
    // variance statistics drop the original aggregate operation
    // in favor of tracking sufficient statistics
    case "variance":
    case "var_samp":
      return varianceExpr(preagg, node, avg2);
    case "var_pop":
      return varianceExpr(preagg, node, avg2, false);
    case "stddev":
    case "stddev_samp":
      return sqrt(varianceExpr(preagg, node, avg2));
    case "stddev_pop":
      return sqrt(varianceExpr(preagg, node, avg2, false));
    case "covar_samp":
      return covarianceExpr(preagg, node, avg2);
    case "covar_pop":
      return covarianceExpr(preagg, node, avg2, false);
    case "corr":
      return corrExpr(preagg, node, avg2);
    // regression statistics
    case "regr_count":
      return regrCountExpr(preagg, node).expr;
    case "regr_avgx":
      return regrAvgXExpr(preagg, node);
    case "regr_avgy":
      return regrAvgYExpr(preagg, node);
    case "regr_syy":
      return regrVarExpr(preagg, 0, node, avg2);
    case "regr_sxx":
      return regrVarExpr(preagg, 1, node, avg2);
    case "regr_sxy":
      return covarianceExpr(preagg, node, avg2, null);
    case "regr_slope":
      return regrSlopeExpr(preagg, node, avg2);
    case "regr_intercept":
      return regrInterceptExpr(preagg, node, avg2);
    case "regr_r2":
      return pow(corrExpr(preagg, node, avg2), 2);
    // aggregates that commute directly
    case "max":
    case "min":
    case "bit_and":
    case "bit_or":
    case "bit_xor":
    case "bool_and":
    case "bool_or":
    case "product": {
      const name = colName(node);
      preagg[name] = node;
      return sql`${node.name}("${name}")`;
    }
    // unsupported aggregate, return null to indicate failure
    default:
      return null;
  }
}
function colName(node) {
  return "pre_" + fnv_hash(`${node}`).toString(16);
}
function addStat(preagg, expr, node) {
  const filter = node?.filter;
  if (filter) {
    expr = expr.filter ? expr.where(and(filter, expr.filter)) : expr.where(filter);
  }
  const name = colName(expr);
  preagg[name] = expr;
  return name;
}
function countExpr(preagg, node) {
  const name = addStat(preagg, count(node.args[0]), node);
  return { expr: sum(name), name };
}
function sumExpr(preagg, node) {
  return sum(addStat(preagg, node));
}
function avgExpr(preagg, node) {
  const as = addStat(preagg, node);
  const { expr, name } = countExpr(preagg, node);
  return div(sum(mul(as, name)), expr);
}
function argmaxExpr(preagg, node) {
  const expr = addStat(preagg, node);
  const maxy = addStat(preagg, max(node.args[1]), node);
  return argmax(expr, maxy);
}
function argminExpr(preagg, node) {
  const expr = addStat(preagg, node);
  const miny = addStat(preagg, min(node.args[1]), node);
  return argmin(expr, miny);
}
function varianceExpr(preagg, node, avg2, correction = true) {
  const x2 = node.args[0];
  const { expr: n } = countExpr(preagg, node);
  const delta = sub(x2, avg2(x2));
  const rssq = addStat(preagg, sum(pow(delta, 2)), node);
  const rsum = addStat(preagg, sum(delta), node);
  const denom = correction ? sub(n, 1) : n;
  return div(sub(sum(rssq), div(pow(sum(rsum), 2), n)), denom);
}
function covarianceExpr(preagg, node, avg2, correction = true) {
  const { expr: n } = regrCountExpr(preagg, node);
  const sxy = regrSumXYExpr(preagg, node, avg2);
  const sx = regrSumExpr(preagg, 1, node, avg2);
  const sy = regrSumExpr(preagg, 0, node, avg2);
  const num = sub(sxy, div(mul(sx, sy), n));
  return correction === null ? num : correction ? div(num, sub(n, 1)) : div(num, n);
}
function corrExpr(preagg, node, avg2) {
  const { expr: n } = regrCountExpr(preagg, node);
  const sxy = regrSumXYExpr(preagg, node, avg2);
  const sxx = regrSumSqExpr(preagg, 1, node, avg2);
  const syy = regrSumSqExpr(preagg, 0, node, avg2);
  const sx = regrSumExpr(preagg, 1, node, avg2);
  const sy = regrSumExpr(preagg, 0, node, avg2);
  const vx = sub(sxx, div(pow(sx, 2), n));
  const vy = sub(syy, div(pow(sy, 2), n));
  return div(
    sub(sxy, div(mul(sx, sy), n)),
    sqrt(mul(vx, vy))
  );
}
function regrCountExpr(preagg, node) {
  const [x2, y2] = node.args;
  const n = addStat(preagg, regrCount(x2, y2), node);
  return { expr: sum(n), name: n };
}
function regrSumExpr(preagg, i, node, avg2) {
  const args = node.args;
  const v = args[i];
  const o = args[1 - i];
  const rsum = sum(sub(v, avg2(v))).where(isNotNull(o));
  return sum(addStat(preagg, rsum, node));
}
function regrSumSqExpr(preagg, i, node, avg2) {
  const args = node.args;
  const v = args[i];
  const u = args[1 - i];
  const ssq = sum(pow(sub(v, avg2(v)), 2)).where(isNotNull(u));
  return sum(addStat(preagg, ssq, node));
}
function regrSumXYExpr(preagg, node, avg2) {
  const [y2, x2] = node.args;
  const sxy = sum(mul(sub(x2, avg2(x2)), sub(y2, avg2(y2))));
  return sum(addStat(preagg, sxy, node));
}
function regrAvgXExpr(preagg, node) {
  const [y2, x2] = node.args;
  const { expr: n, name } = regrCountExpr(preagg, node);
  const a = addStat(preagg, regrAvgX(y2, x2), node);
  return div(sum(mul(a, name)), n);
}
function regrAvgYExpr(preagg, node) {
  const [y2, x2] = node.args;
  const { expr: n, name } = regrCountExpr(preagg, node);
  const a = addStat(preagg, regrAvgY(y2, x2), node);
  return div(sum(mul(a, name)), n);
}
function regrVarExpr(preagg, i, node, avg2) {
  const { expr: n } = regrCountExpr(preagg, node);
  const sum2 = regrSumExpr(preagg, i, node, avg2);
  const ssq = regrSumSqExpr(preagg, i, node, avg2);
  return sub(ssq, div(pow(sum2, 2), n));
}
function regrSlopeExpr(preagg, node, avg2) {
  const cov = covarianceExpr(preagg, node, avg2, null);
  const varx = regrVarExpr(preagg, 1, node, avg2);
  return div(cov, varx);
}
function regrInterceptExpr(preagg, node, avg2) {
  const ax = regrAvgXExpr(preagg, node);
  const ay = regrAvgYExpr(preagg, node);
  const m = regrSlopeExpr(preagg, node, avg2);
  return sub(ay, mul(m, ax));
}

// ../core/src/preagg/preagg-columns.js
function preaggColumns(client) {
  if (!client.filterStable) return null;
  const q = client.query();
  if (!isSelectQuery(q)) return null;
  const from = getBase(q, (q2) => {
    const ref = q2._from[0]?.expr;
    return isTableRef(ref) ? ref.name : ref;
  });
  if (typeof from !== "string") return null;
  const aggrs = /* @__PURE__ */ new Map();
  const preagg = {};
  const output = {};
  const group = [];
  const avg2 = (ref) => {
    const name = ref.column;
    const expr = getBase(q, (q2) => q2._select.find((c) => c.alias === name)?.expr);
    return sql`(SELECT avg(${expr ?? ref}) FROM "${from}")`;
  };
  for (const { alias, expr } of q._select) {
    if (isAggregateExpression(expr) > 1) return null;
    const nodes = collectAggregates(expr);
    if (nodes.length === 0) {
      group.push(alias);
      preagg[alias] = expr;
    } else {
      for (const node of nodes) {
        if (node.isDistinct) return null;
        const agg = sufficientStatistics(node, preagg, avg2);
        if (!agg) return null;
        aggrs.set(node, agg);
      }
      output[alias] = rewrite(expr, aggrs);
    }
  }
  if (!aggrs.size) return null;
  return { group, preagg, output };
}
function getBase(query, get) {
  const subq = query.subqueries;
  if (isSelectQuery(query) && subq.length === 0) {
    return get(query);
  }
  const base = getBase(subq[0], get);
  for (let i = 1; i < subq.length; ++i) {
    const value = getBase(subq[i], get);
    if (value === void 0) continue;
    if (value !== base) return NaN;
  }
  return base;
}

// ../core/src/preagg/PreAggregator.js
var Skip = { skip: true, result: null };
var PreAggregator = class {
  /**
   * Create a new manager of materialized views of pre-aggregated data.
   * @param {import('../Coordinator.js').Coordinator} coordinator A Mosaic coordinator.
   * @param {PreAggregateOptions} [options] Pre-aggregation options.
   */
  constructor(coordinator2, {
    schema = "mosaic",
    enabled = true
  } = {}) {
    this.entries = /* @__PURE__ */ new Map();
    this.active = null;
    this.mc = coordinator2;
    this._schema = schema;
    this._enabled = enabled;
  }
  /**
   * Set the enabled state of this manager. If false, any local state is
   * cleared and subsequent request calls will return null until re-enabled.
   * This method has no effect on any pre-aggregated tables already in the
   * database.
   * @param {boolean} [state] The enabled state to set.
   */
  set enabled(state) {
    if (this._enabled !== state) {
      if (!state) this.clear();
      this._enabled = state;
    }
  }
  /**
   * Get the enabled state of this manager.
   * @returns {boolean} The current enabled state.
   */
  get enabled() {
    return this._enabled;
  }
  /**
   * Set the database schema used for pre-aggregated materialized view tables.
   * Upon changes, any local state is cleared. This method does _not_ drop any
   * existing materialized views, use `dropSchema` before changing the schema
   * to also remove existing materalized views in the database.
   * @param {string} [schema] The schema name to set.
   */
  set schema(schema) {
    if (this._schema !== schema) {
      this.clear();
      this._schema = schema;
    }
  }
  /**
   * Get the database schema used for pre-aggregated materialized view tables.
   * @returns {string} The current schema name.
   */
  get schema() {
    return this._schema;
  }
  /**
   * Issues a query through the coordinator to drop the current schema for
   * pre-aggregated materialized views. *All* materialized view tables in the
   * schema will be removed and local state is cleared. Call this method if
   * the underlying base tables have been updated, causing materialized view
   * to become stale and inaccurate. Use this method with care! Once dropped,
   * the schema will be repopulated by future pre-aggregation requests.
   * @returns A query result promise.
   */
  dropSchema() {
    this.clear();
    return this.mc.exec(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
  }
  /**
   * Clear the cache of pre-aggregation entries for the current active
   * selection clause. This method does _not_ drop any existing materialized
   * views. Use `dropSchema` to remove existing materialized view tables from
   * the database.
   */
  clear() {
    this.entries.clear();
    this.active = null;
  }
  /**
   * Return pre-aggregation information for the active state of a
   * client-selection pair, or null if the client has unstable filters.
   * This method has multiple possible side effects, including materialized
   * view creation and updating internal caches.
   * @param {import('../MosaicClient.js').MosaicClient} client A Mosaic client.
   * @param {import('../Selection.js').Selection} selection A Mosaic selection
   *  to filter the client by.
   * @param {import('../util/selection-types.js').SelectionClause} activeClause
   *  A representative active selection clause for which to (possibly) generate
   *  materialized views of pre-aggregates.
   * @returns {PreAggregateInfo | Skip | null} Information and query generator
   * for pre-aggregated tables, or null if the client has unstable filters.
   */
  request(client, selection, activeClause) {
    if (!this.enabled) return null;
    const { entries, mc, schema } = this;
    const { source } = activeClause;
    if (!source) return null;
    if (this.active) {
      if (this.active.source !== source) this.clear();
      if (this.active?.source === null) return null;
    }
    let { active } = this;
    if (!active) {
      this.active = active = activeColumns(activeClause);
      if (active.source === null) return null;
    }
    if (entries.has(client)) {
      return entries.get(client);
    }
    const preaggCols = preaggColumns(client);
    let info;
    if (!preaggCols) {
      info = null;
    } else if (selection.skip(client, activeClause)) {
      info = Skip;
    } else {
      const filter = selection.remove(source).predicate(client);
      info = preaggregateInfo(client.query(filter), active, preaggCols, schema);
      info.result = mc.exec([
        `CREATE SCHEMA IF NOT EXISTS ${schema}`,
        createTable2(info.table, info.create, { temp: false })
      ]);
      info.result.catch((e) => mc.logger().error(e));
    }
    entries.set(client, info);
    return info;
  }
};
function activeColumns(clause) {
  const { source, meta } = clause;
  const clausePred = clause.predicate;
  const clauseCols = collectColumns(clausePred).map((c) => c.column);
  let predicate;
  let columns;
  if (!meta || !clauseCols) {
    return { source: null, columns, predicate };
  }
  const { type, scales: scales2, bin, pixelSize = 1 } = meta;
  if (type === "point") {
    predicate = (x2) => x2;
    columns = Object.fromEntries(
      clauseCols.map((col) => [`${col}`, asNode(col)])
    );
  } else if (type === "interval" && scales2) {
    const bins = scales2.map((s) => binInterval(s, pixelSize, bin));
    if (bins.some((b) => !b)) {
    } else if (bins.length === 1) {
      predicate = (p) => p ? isBetween("active0", p.extent.map(bins[0])) : [];
      columns = { active0: bins[0](clausePred.expr) };
    } else {
      predicate = (p) => p ? and(p.clauses.map(
        (c, i) => isBetween(`active${i}`, c.extent.map(bins[i]))
      )) : [];
      columns = Object.fromEntries(
        // @ts-ignore
        clausePred.clauses.map((p, i) => [`active${i}`, bins[i](p.expr)])
      );
    }
  }
  return { source: columns ? source : null, columns, predicate };
}
var BIN = { ceil, round };
function binInterval(scale, pixelSize, bin) {
  const { type, domain, range, apply, sqlApply } = scaleTransform(scale);
  if (!apply) return;
  const binFn = BIN[`${bin}`.toLowerCase()] || floor;
  const lo = apply(Math.min(...domain));
  const hi = apply(Math.max(...domain));
  const s = (type === "identity" ? 1 : Math.abs(range[1] - range[0]) / (hi - lo)) / pixelSize;
  const scalar = s === 1 ? (x2) => x2 : (x2) => mul(float642(s), x2);
  const diff = lo === 0 ? (x2) => x2 : (x2) => sub(x2, float642(lo));
  return (value) => int322(binFn(scalar(diff(sqlApply(value)))));
}
function preaggregateInfo(clientQuery, active, preaggCols, schema) {
  const { group, output, preagg } = preaggCols;
  const { columns } = active;
  const query = clientQuery.setSelect({ ...preagg, ...columns }).groupby(Object.keys(columns));
  const [subq] = query.subqueries;
  if (subq) {
    const cols = Object.values(columns).flatMap((c) => collectColumns(c).map((c2) => c2.column));
    subqueryPushdown(subq, cols);
  }
  const having = query._having;
  const order = query._orderby;
  query._having = [];
  query._orderby = [];
  const create2 = query.toString();
  const id = (fnv_hash(create2) >>> 0).toString(16);
  const table2 = `${schema}.preagg_${id}`;
  const select = Query.select(group, output).from(table2).groupby(group).having(having).orderby(order);
  return new PreAggregateInfo({ table: table2, create: create2, active, select });
}
function subqueryPushdown(query, cols) {
  const memo = /* @__PURE__ */ new Set();
  const pushdown = (q) => {
    if (memo.has(q)) return;
    memo.add(q);
    if (isSelectQuery(q) && q._from.length) {
      q.select(cols);
    }
    q.subqueries.forEach(pushdown);
  };
  pushdown(query);
}
var PreAggregateInfo = class {
  /**
   * Create a new pre-aggregation information instance.
   * @param {object} options Options object.
   * @param {string} options.table The materialized view table name.
   * @param {string} options.create The table creation query.
   * @param {*} options.active Active column information.
   * @param {SelectQuery} options.select Base query for requesting updates
   *  using a pre-aggregated materialized view.
   */
  constructor({ table: table2, create: create2, active, select }) {
    this.table = table2;
    this.create = create2;
    this.result = null;
    this.active = active;
    this.select = select;
    this.skip = false;
  }
  /**
   * Generate a materialized view query for the given predicate.
   * @param {import('@uwdata/mosaic-sql').ExprNode} predicate The current
   *  active clause predicate.
   * @returns {SelectQuery} A materialized view query.
   */
  query(predicate) {
    return this.select.clone().where(this.active.predicate(predicate));
  }
};

// ../core/src/util/js-type.js
function jsType(type) {
  switch (type) {
    case "BIGINT":
    case "HUGEINT":
    case "INTEGER":
    case "SMALLINT":
    case "TINYINT":
    case "UBIGINT":
    case "UINTEGER":
    case "USMALLINT":
    case "UTINYINT":
    // integers
    case "DOUBLE":
    case "FLOAT":
    case "REAL":
      return "number";
    case "DATE":
    case "TIMESTAMP":
    case "TIMESTAMPTZ":
    case "TIMESTAMP WITH TIME ZONE":
    case "TIME":
    case "TIMESTAMP_NS":
      return "date";
    case "BOOLEAN":
      return "boolean";
    case "VARCHAR":
    case "UUID":
    case "JSON":
      return "string";
    case "ARRAY":
    case "LIST":
      return "array";
    case "BLOB":
    case "STRUCT":
    case "MAP":
    case "GEOMETRY":
      return "object";
    default:
      if (type.startsWith("DECIMAL")) {
        return "number";
      } else if (type.startsWith("STRUCT") || type.startsWith("MAP")) {
        return "object";
      } else if (type.endsWith("]")) {
        return "array";
      }
      throw new Error(`Unsupported type: ${type}`);
  }
}

// ../core/src/util/field-info.js
var Count = "count";
var Nulls = "nulls";
var Max = "max";
var Min = "min";
var Distinct = "distinct";
var statMap = {
  [Count]: count,
  [Distinct]: (column2) => count(column2).distinct(),
  [Max]: max,
  [Min]: min,
  [Nulls]: (column2) => count().where(isNull(column2))
};
function summarize({ table: table2, column: column2, stats }) {
  return Query.from(table2).select(Array.from(stats, (s) => ({ [s]: statMap[s](column2) })));
}
async function queryFieldInfo(mc, fields) {
  if (fields.length === 1 && fields[0].column === "*") {
    return getTableInfo(mc, fields[0].table);
  } else {
    return (await Promise.all(fields.map((f) => getFieldInfo(mc, f)))).filter((x2) => x2);
  }
}
async function getFieldInfo(mc, { table: table2, column: column2, stats }) {
  const q = Query.from({ source: table2 }).select({ column: column2 }).groupby(isNode(column2) && isAggregateExpression(column2) ? sql`ALL` : []);
  const [desc2] = Array.from(await mc.query(Query.describe(q)));
  const info = {
    table: table2,
    column: `${column2}`,
    sqlType: desc2.column_type,
    type: jsType(desc2.column_type),
    nullable: desc2.null === "YES"
  };
  if (!stats?.length) return info;
  const [result] = await mc.query(
    summarize({ table: table2, column: column2, stats }),
    { persist: true }
  );
  return Object.assign(info, result);
}
async function getTableInfo(mc, table2) {
  const result = Array.from(await mc.query(`DESCRIBE ${asTableRef(table2)}`));
  return result.map((desc2) => ({
    table: table2,
    column: desc2.column_name,
    sqlType: desc2.column_type,
    type: jsType(desc2.column_type),
    nullable: desc2.null === "YES"
  }));
}

// ../core/src/util/query-result.js
var QueryState = Object.freeze({
  pending: Symbol("pending"),
  ready: Symbol("ready"),
  error: Symbol("error"),
  done: Symbol("done")
});
var QueryResult = class extends Promise {
  /**
   * Create a new query result Promise.
   */
  constructor() {
    let resolve;
    let reject;
    super((r, e) => {
      resolve = r;
      reject = e;
    });
    this._resolve = resolve;
    this._reject = reject;
    this._state = QueryState.pending;
    this._value = void 0;
  }
  /**
   * Resolve the result Promise with a prepared value or the provided value.
   * This method will only succeed if either a value is provided or the promise is ready.
   * @param {*} value The result value.
   * @returns {this}
   */
  fulfill(value) {
    if (this._value !== void 0) {
      if (value !== void 0) {
        throw Error("Promise is ready and fulfill has a provided value");
      }
      this._resolve(this._value);
    } else if (value === void 0) {
      throw Error("Promise is neither ready nor has provided value");
    } else {
      this._resolve(value);
    }
    this._state = QueryState.done;
    return this;
  }
  /**
   * Prepare to resolve with the provided value.
   * @param {*} value The result value.
   * @returns {this}
   */
  ready(value) {
    this._state = QueryState.ready;
    this._value = value;
    return this;
  }
  /**
   * Rejects the result Promise with the provided error.
   * @param {*} error The error value.
   * @returns {this}
   */
  reject(error) {
    this._state = QueryState.error;
    this._reject(error);
    return this;
  }
  /**
   * Returns the state of this query result.
   * @returns {symbol}
   */
  get state() {
    return this._state;
  }
};
QueryResult.prototype.constructor = Promise;

// ../core/src/util/void-logger.js
function voidLogger() {
  return {
    debug(..._) {
    },
    info(..._) {
    },
    log(..._) {
    },
    warn(..._) {
    },
    error(..._) {
    }
  };
}

// ../core/src/QueryConsolidator.js
function wait(callback) {
  const method = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : typeof setImmediate !== "undefined" ? setImmediate : setTimeout;
  return method(callback);
}
function consolidator(enqueue, cache) {
  let pending = [];
  let id = 0;
  function run() {
    const groups = entryGroups(pending, cache);
    pending = [];
    id = 0;
    for (const group of groups) {
      consolidate(group, enqueue);
      processResults(group, cache);
    }
  }
  return {
    add(entry, priority) {
      if (entry.request.type === "arrow") {
        id = id || wait(() => run());
        pending.push({ entry, priority, index: pending.length });
      } else {
        enqueue(entry, priority);
      }
    }
  };
}
function entryGroups(entries, cache) {
  const groups = [];
  const groupMap = /* @__PURE__ */ new Map();
  for (const query of entries) {
    const { entry: { request } } = query;
    const key = consolidationKey(request.query, cache);
    if (!groupMap.has(key)) {
      const list2 = [];
      groups.push(list2);
      groupMap.set(key, list2);
    }
    groupMap.get(key).push(query);
  }
  return groups;
}
function consolidationKey(query, cache) {
  const sql2 = `${query}`;
  if (isSelectQuery(query) && !cache.get(sql2)) {
    if (query._orderby.length || query._where.length || query._qualify.length || query._having.length) {
      return sql2;
    }
    const q = query.clone().setSelect("*");
    const groupby = query._groupby;
    if (groupby.length) {
      const map2 = {};
      query._select.forEach(({ alias, expr }) => map2[alias] = expr);
      q.setGroupby(groupby.map((e) => isColumnRef(e) && map2[e.column] || e));
    } else if (query._select.some((e) => isAggregateExpression(e.expr))) {
      q.setGroupby("ALL");
    }
    return `${q}`;
  } else {
    return sql2;
  }
}
function consolidate(group, enqueue) {
  if (shouldConsolidate(group)) {
    enqueue({
      request: {
        type: "arrow",
        cache: false,
        query: group.query = consolidatedQuery(group)
      },
      result: group.result = new QueryResult()
    });
  } else {
    for (const { entry, priority } of group) {
      enqueue(entry, priority);
    }
  }
}
function shouldConsolidate(group) {
  if (group.length > 1) {
    const sql2 = `${group[0].entry.request.query}`;
    for (let i = 1; i < group.length; ++i) {
      if (sql2 !== `${group[i].entry.request.query}`) {
        return true;
      }
    }
  }
  return false;
}
function consolidatedQuery(group) {
  const maps = group.maps = [];
  const fields = /* @__PURE__ */ new Map();
  for (const item of group) {
    const { query: query2 } = item.entry.request;
    const fieldMap = [];
    maps.push(fieldMap);
    for (const { alias, expr } of query2._select) {
      const e = `${expr}`;
      if (!fields.has(e)) {
        fields.set(e, [`col${fields.size}`, expr]);
      }
      const [name] = fields.get(e);
      fieldMap.push([name, alias]);
    }
  }
  const query = group[0].entry.request.query.clone();
  const groupby = query._groupby;
  if (groupby.length) {
    const map2 = {};
    group.maps[0].forEach(([name, as]) => map2[as] = name);
    query.setGroupby(groupby.map((e) => isColumnRef(e) && map2[e.column] || e));
  }
  return query.setSelect(Array.from(fields.values()));
}
async function processResults(group, cache) {
  const { maps, query, result } = group;
  if (!maps) return;
  let data;
  try {
    data = await result;
  } catch (err) {
    for (const { entry } of group) {
      entry.result.reject(err);
    }
    return;
  }
  const describe = isDescribeQuery(query);
  group.forEach(({ entry }, index) => {
    const { request, result: result2 } = entry;
    const map2 = maps[index];
    const extract = describe && map2 ? filterResult(data, map2) : map2 ? projectResult(data, map2) : data;
    if (request.cache) {
      cache.set(String(request.query), extract);
    }
    result2.fulfill(extract);
  });
}
function projectResult(data, map2) {
  return data.select(map2.map((x2) => x2[0]), map2.map((x2) => x2[1]));
}
function filterResult(data, map2) {
  const lookup = new Map(map2);
  const result = [];
  for (const d of data) {
    if (lookup.has(d.column_name)) {
      result.push({ ...d, column_name: lookup.get(d.column_name) });
    }
  }
  return result;
}

// ../core/src/util/cache.js
var requestIdle = typeof requestIdleCallback !== "undefined" ? requestIdleCallback : setTimeout;
var voidCache = () => ({
  get: () => void 0,
  set: (key, value) => value,
  clear: () => {
  }
});
function lruCache({
  max: max2 = 1e3,
  // max entries
  ttl = 3 * 60 * 60 * 1e3
  // time-to-live, default 3 hours
} = {}) {
  let cache = /* @__PURE__ */ new Map();
  function evict() {
    const expire = performance.now() - ttl;
    let lruKey = null;
    let lruLast = Infinity;
    for (const [key, value] of cache) {
      const { last: last2 } = value;
      if (last2 < lruLast) {
        lruKey = key;
        lruLast = last2;
      }
      if (expire > last2) {
        cache.delete(key);
      }
    }
    if (lruKey) {
      cache.delete(lruKey);
    }
  }
  return {
    get(key) {
      const entry = cache.get(key);
      if (entry) {
        entry.last = performance.now();
        return entry.value;
      }
    },
    set(key, value) {
      cache.set(key, { last: performance.now(), value });
      if (cache.size > max2) requestIdle(evict);
      return value;
    },
    clear() {
      cache = /* @__PURE__ */ new Map();
    }
  };
}

// ../core/src/util/priority-queue.js
var PriorityQueue = class {
  /**
   * Create a new priority queue instance.
   * @param {number} ranks An integer number of rank-order priority levels.
   */
  constructor(ranks) {
    this.queue = Array.from(
      { length: ranks },
      () => ({ head: null, tail: null })
    );
  }
  /**
   * Indicate if the queue is empty.
   * @returns {boolean} true if empty, false otherwise.
   */
  isEmpty() {
    return this.queue.every((list2) => !list2.head);
  }
  /**
   * Insert an item into the queue with a given priority rank.
   * @param {*} item The item to add.
   * @param {number} rank The integer priority rank.
   * Priority ranks are integers starting at zero.
   * Lower ranks indicate higher priority.
   */
  insert(item, rank2) {
    const list2 = this.queue[rank2];
    if (!list2) {
      throw new Error(`Invalid queue priority rank: ${rank2}`);
    }
    const node = { item, next: null };
    if (list2.head === null) {
      list2.head = list2.tail = node;
    } else {
      list2.tail = list2.tail.next = node;
    }
  }
  /**
   * Remove a set of items from the queue, regardless of priority rank.
   * If a provided item is not in the queue it will be ignored.
   * @param {(item: *) => boolean} test A predicate function to test
   * if an item should be removed (true to drop, false to keep).
   */
  remove(test) {
    for (const list2 of this.queue) {
      let { head, tail } = list2;
      for (let prev = null, curr = head; curr; prev = curr, curr = curr.next) {
        if (test(curr.item)) {
          if (curr === head) {
            head = curr.next;
          } else {
            prev.next = curr.next;
          }
          if (curr === tail) tail = prev || head;
        }
      }
      list2.head = head;
      list2.tail = tail;
    }
  }
  /**
   * Remove and return the next highest priority item.
   * @returns {*} The next item in the queue,
   * or undefined if this queue is empty.
   */
  next() {
    for (const list2 of this.queue) {
      const { head } = list2;
      if (head !== null) {
        list2.head = head.next;
        if (list2.tail === head) {
          list2.tail = null;
        }
        return head.item;
      }
    }
  }
};

// ../core/src/QueryManager.js
var Priority = Object.freeze({ High: 0, Normal: 1, Low: 2 });
var QueryManager = class {
  constructor(maxConcurrentRequests = 32) {
    this.queue = new PriorityQueue(3);
    this.db = null;
    this.clientCache = null;
    this._logger = voidLogger();
    this._logQueries = false;
    this._consolidate = null;
    this.pendingResults = [];
    this.maxConcurrentRequests = maxConcurrentRequests;
    this.pendingExec = false;
  }
  next() {
    if (this.queue.isEmpty() || this.pendingResults.length > this.maxConcurrentRequests || this.pendingExec) {
      return;
    }
    const { request, result } = this.queue.next();
    this.pendingResults.push(result);
    if (request.type === "exec") this.pendingExec = true;
    this.submit(request, result).finally(() => {
      while (this.pendingResults.length && this.pendingResults[0].state !== QueryState.pending) {
        const result2 = this.pendingResults.shift();
        if (result2.state === QueryState.ready) {
          result2.fulfill();
        } else if (result2.state === QueryState.done) {
          this._logger.warn("Found resolved query in pending results.");
        }
      }
      if (request.type === "exec") this.pendingExec = false;
      this.next();
    });
  }
  /**
   * Add an entry to the query queue with a priority.
   * @param {object} entry The entry to add.
   * @param {*} [entry.request] The query request.
   * @param {QueryResult} [entry.result] The query result.
   * @param {number} priority The query priority, defaults to `Priority.Normal`.
   */
  enqueue(entry, priority = Priority.Normal) {
    this.queue.insert(entry, priority);
    this.next();
  }
  /**
   * Submit the query to the connector.
   * @param {*} request The request.
   * @param {QueryResult} result The query result.
   */
  async submit(request, result) {
    try {
      const { query, type, cache = false, options } = request;
      const sql2 = query ? `${query}` : null;
      if (cache) {
        const cached = this.clientCache.get(sql2);
        if (cached) {
          const data2 = await cached;
          this._logger.debug("Cache");
          result.ready(data2);
          return;
        }
      }
      const t0 = performance.now();
      if (this._logQueries) {
        this._logger.debug("Query", { type, sql: sql2, ...options });
      }
      const promise = this.db.query({ type, sql: sql2, ...options });
      if (cache) this.clientCache.set(sql2, promise);
      const data = await promise;
      if (cache) this.clientCache.set(sql2, data);
      this._logger.debug(`Request: ${(performance.now() - t0).toFixed(1)}`);
      result.ready(type === "exec" ? null : data);
    } catch (err) {
      result.reject(err);
    }
  }
  cache(value) {
    return value !== void 0 ? this.clientCache = value === true ? lruCache() : value || voidCache() : this.clientCache;
  }
  logger(value) {
    return value ? this._logger = value : this._logger;
  }
  logQueries(value) {
    return value !== void 0 ? this._logQueries = !!value : this._logQueries;
  }
  connector(connector) {
    return connector ? this.db = connector : this.db;
  }
  consolidate(flag) {
    if (flag && !this._consolidate) {
      this._consolidate = consolidator(this.enqueue.bind(this), this.clientCache);
    } else if (!flag && this._consolidate) {
      this._consolidate = null;
    }
  }
  /**
   * Request a query result.
   * @param {*} request The request.
   * @param {number} priority The query priority, defaults to `Priority.Normal`.
   * @returns {QueryResult} A query result promise.
   */
  request(request, priority = Priority.Normal) {
    const result = new QueryResult();
    const entry = { request, result };
    if (this._consolidate) {
      this._consolidate.add(entry, priority);
    } else {
      this.enqueue(entry, priority);
    }
    return result;
  }
  cancel(requests) {
    const set = new Set(requests);
    if (set.size) {
      this.queue.remove(({ result }) => {
        if (set.has(result)) {
          result.reject("Canceled");
          return true;
        }
        return false;
      });
      for (const result of this.pendingResults) {
        if (set.has(result)) {
          result.reject("Canceled");
        }
      }
    }
  }
  clear() {
    this.queue.remove(({ result }) => {
      result.reject("Cleared");
      return true;
    });
    for (const result of this.pendingResults) {
      result.reject("Cleared");
    }
    this.pendingResults = [];
  }
};

// ../core/src/Coordinator.js
var _instance;
function coordinator(instance) {
  if (instance) {
    _instance = instance;
  } else if (_instance == null) {
    _instance = new Coordinator();
  }
  return _instance;
}
var Coordinator = class {
  constructor(db = socketConnector(), {
    logger = console,
    manager = new QueryManager(),
    cache = true,
    consolidate: consolidate2 = true,
    preagg = {}
  } = {}) {
    this.manager = manager;
    this.manager.cache(cache);
    this.manager.consolidate(consolidate2);
    this.databaseConnector(db);
    this.logger(logger);
    this.clear();
    this.preaggregator = new PreAggregator(this, preagg);
  }
  /**
   * Clear the coordinator state.
   * @param {object} [options] Options object.
   * @param {boolean} [options.clients=true] If true, disconnect all clients.
   * @param {boolean} [options.cache=true] If true, clear the query cache.
   */
  clear({ clients = true, cache = true } = {}) {
    this.manager.clear();
    if (clients) {
      this.filterGroups?.forEach((group) => group.disconnect());
      this.filterGroups = /* @__PURE__ */ new Map();
      this.clients?.forEach((client) => this.disconnect(client));
      this.clients = /* @__PURE__ */ new Set();
    }
    if (cache) this.manager.cache().clear();
  }
  /**
   * Get or set the database connector.
   * @param {*} [db] The database connector to use.
   * @returns The current database connector.
   */
  databaseConnector(db) {
    return this.manager.connector(db);
  }
  /**
   * Get or set the logger.
   * @param {*} logger  The logger to use.
   * @returns The current logger
   */
  logger(logger) {
    if (arguments.length) {
      this._logger = logger || voidLogger();
      this.manager.logger(this._logger);
    }
    return this._logger;
  }
  // -- Query Management ----
  /**
   * Cancel previosuly submitted query requests. These queries will be
   * canceled if they are queued but have not yet been submitted.
   * @param {QueryResult[]} requests An array
   *  of query result objects, such as those returned by the `query` method.
   */
  cancel(requests) {
    this.manager.cancel(requests);
  }
  /**
   * Issue a query for which no result (return value) is needed.
   * @param { import('./types.js').QueryType[] |
   *  import('./types.js').QueryType} query The query or an array of queries.
   *  Each query should be either a Query builder object or a SQL string.
   * @param {object} [options] An options object.
   * @param {number} [options.priority] The query priority, defaults to
   *  `Priority.Normal`.
   * @returns {QueryResult} A query result promise.
   */
  exec(query, { priority = Priority.Normal } = {}) {
    query = Array.isArray(query) ? query.filter((x2) => x2).join(";\n") : query;
    return this.manager.request({ type: "exec", query }, priority);
  }
  /**
   * Issue a query to the backing database. The submitted query may be
   * consolidate with other queries and its results may be cached.
   * @param {import('./types.js').QueryType} query The query as either a Query
   *  builder object or a SQL string.
   * @param {object} [options] An options object.
   * @param {'arrow' | 'json'} [options.type] The query result format type.
   * @param {boolean} [options.cache=true] If true, cache the query result
   *  client-side within the QueryManager.
   * @param {boolean} [options.persist] If true, request the database
   *  server to persist a cached query server-side.
   * @param {number} [options.priority] The query priority, defaults to
   *  `Priority.Normal`.
   * @returns {QueryResult} A query result promise.
   */
  query(query, {
    type = "arrow",
    cache = true,
    priority = Priority.Normal,
    ...options
  } = {}) {
    return this.manager.request({ type, query, cache, options }, priority);
  }
  /**
   * Issue a query to prefetch data for later use. The query result is cached
   * for efficient future access.
   * @param {import('./types.js').QueryType} query The query as either a Query
   *  builder object or a SQL string.
   * @param {object} [options] An options object.
   * @param {'arrow' | 'json'} [options.type] The query result format type.
   * @returns {QueryResult} A query result promise.
   */
  prefetch(query, options = {}) {
    return this.query(query, { ...options, cache: true, priority: Priority.Low });
  }
  /**
   * Create a bundle of queries that can be loaded into the cache.
   *
   * @param {string} name The name of the bundle.
   * @param {[string | {sql: string},  {alias: string}]} queries The queries to save into the bundle.
   * @param {number} priority Request priority.
   * @returns {QueryResult} A query result promise.
   */
  createBundle(name, queries, priority = Priority.Low) {
    const options = { name, queries: queries.map((q) => typeof q == "string" ? { sql: q } : q) };
    return this.manager.request({ type: "create-bundle", options }, priority);
  }
  /**
   * Load a bundle into the cache.
   * @param {string} name The name of the bundle.
   * @param {number} priority Request priority.
   * @returns {QueryResult} A query result promise.
   */
  loadBundle(name, priority = Priority.High) {
    const options = { name };
    return this.manager.request({ type: "load-bundle", options }, priority);
  }
  // -- Client Management ----
  /**
   * Update client data by submitting the given query and returning the
   * data (or error) to the client.
   * @param {MosaicClient} client A Mosaic client.
   * @param {import('./types.js').QueryType} query The data query.
   * @param {number} [priority] The query priority.
   * @returns {Promise} A Promise that resolves upon completion of the update.
   */
  updateClient(client, query, priority = Priority.Normal) {
    client.queryPending();
    return client._pending = this.query(query, { priority }).then(
      (data) => client.queryResult(data).update(),
      (err) => {
        this._logger.error(err);
        client.queryError(err);
      }
    ).catch((err) => this._logger.error(err));
  }
  /**
   * Issue a query request for a client. If the query is null or undefined,
   * the client is simply updated. Otherwise `updateClient` is called. As a
   * side effect, this method clears the current preaggregator state.
   * @param {MosaicClient} client The client to update.
   * @param {import('./types.js').QueryType | null} [query] The query to issue.
   */
  requestQuery(client, query) {
    this.preaggregator.clear();
    return query ? this.updateClient(client, query) : Promise.resolve(client.update());
  }
  /**
   * Connect a client to the coordinator.
   * @param {MosaicClient} client The Mosaic client to connect.
   */
  async connect(client) {
    const { clients } = this;
    if (clients.has(client)) {
      throw new Error("Client already connected.");
    }
    clients.add(client);
    client.coordinator = this;
    client._pending = this.initializeClient(client);
    connectSelection(this, client.filterBy, client);
  }
  async initializeClient(client) {
    const fields = client.fields();
    if (fields?.length) {
      client.fieldInfo(await queryFieldInfo(this, fields));
    }
    return client.requestQuery();
  }
  /**
   * Disconnect a client from the coordinator.
   * @param {MosaicClient} client The Mosaic client to disconnect.
   */
  disconnect(client) {
    const { clients, filterGroups } = this;
    if (!clients.has(client)) return;
    clients.delete(client);
    client.coordinator = null;
    const group = filterGroups.get(client.filterBy);
    if (group) {
      group.clients.delete(client);
    }
  }
};
function connectSelection(mc, selection, client) {
  if (!selection) return;
  let entry = mc.filterGroups.get(selection);
  if (!entry) {
    const activate = (clause) => activateSelection(mc, selection, clause);
    const value = () => updateSelection(mc, selection);
    selection.addEventListener("activate", activate);
    selection.addEventListener("value", value);
    entry = {
      selection,
      clients: /* @__PURE__ */ new Set(),
      disconnect() {
        selection.removeEventListener("activate", activate);
        selection.removeEventListener("value", value);
      }
    };
    mc.filterGroups.set(selection, entry);
  }
  entry.clients.add(client);
}
function activateSelection(mc, selection, clause) {
  const { preaggregator, filterGroups } = mc;
  const { clients } = filterGroups.get(selection);
  for (const client of clients) {
    preaggregator.request(client, selection, clause);
  }
}
function updateSelection(mc, selection) {
  const { preaggregator, filterGroups } = mc;
  const { clients } = filterGroups.get(selection);
  const { active } = selection;
  return Promise.allSettled(Array.from(clients, (client) => {
    const info = preaggregator.request(client, selection, active);
    const filter = info ? null : selection.predicate(client);
    if (info?.skip || !info && !filter) return;
    const query = info?.query(active.predicate) ?? client.query(filter);
    return mc.updateClient(client, query);
  }));
}

// ../core/src/util/AsyncDispatch.js
var AsyncDispatch = class {
  /**
   * Create a new asynchronous dispatcher instance.
   */
  constructor() {
    this._callbacks = /* @__PURE__ */ new Map();
  }
  /**
   * Add an event listener callback for the provided event type.
   * @param {string} type The event type.
   * @param {(value: *) => void | Promise} callback The event handler
   *  callback function to add. If the callback has already been
   *  added for the event type, this method has no effect.
   */
  addEventListener(type, callback) {
    if (!this._callbacks.has(type)) {
      this._callbacks.set(type, {
        callbacks: /* @__PURE__ */ new Set(),
        pending: null,
        queue: new DispatchQueue()
      });
    }
    const entry = this._callbacks.get(type);
    entry.callbacks.add(callback);
  }
  /**
   * Remove an event listener callback for the provided event type.
   * @param {string} type The event type.
   * @param {(value: *) => void | Promise} callback The event handler
   *  callback function to remove.
   */
  removeEventListener(type, callback) {
    const entry = this._callbacks.get(type);
    if (entry) {
      entry.callbacks.delete(callback);
    }
  }
  /**
   * Lifecycle method that returns the event value to emit.
   * This default implementation simply returns the input value as-is.
   * Subclasses may override this method to implement custom transformations
   * prior to emitting an event value to all listeners.
   * @param {string} type The event type.
   * @param {*} value The event value.
   * @returns The (possibly transformed) event value to emit.
   */
  willEmit(type, value) {
    return value;
  }
  /**
   * Lifecycle method that returns a filter function for updating the
   * queue of unemitted event values prior to enqueueing a new value.
   * This default implementation simply returns null, indicating that
   * any other unemitted event values should be dropped (that is, all
   * queued events are filtered).
   * @param {string} type The event type.
   * @param {*} value The new event value that will be enqueued.
   * @returns {(value: *) => boolean|null} A dispatch queue filter
   *  function, or null if all unemitted event values should be filtered.
   */
  emitQueueFilter(type, value) {
    return null;
  }
  /**
   * Cancel all unemitted event values for the given event type.
   * @param {string} type The event type.
   */
  cancel(type) {
    const entry = this._callbacks.get(type);
    entry?.queue.clear();
  }
  /**
   * Returns a promise that resolves when any pending updates complete for
   * the event of the given type currently being processed. The Promise will
   * resolve immediately if the queue for the given event type is empty.
   * @param {string} type The event type to wait for.
   * @returns {Promise} A pending event promise.
   */
  async pending(type) {
    await this._callbacks.get(type)?.pending;
  }
  /**
   * Emit an event value to listeners for the given event type.
   * If a previous emit has not yet resolved, the event value
   * will be queued to be emitted later.
   * The actual event value given to listeners will be the result
   * of passing the input value through the emitValue() method.
   * @param {string} type The event type.
   * @param {*} value The event value.
   */
  emit(type, value) {
    const entry = this._callbacks.get(type) || {};
    if (entry.pending) {
      entry.queue.enqueue(value, this.emitQueueFilter(type, value));
    } else {
      const event = this.willEmit(type, value);
      const { callbacks, queue } = entry;
      if (callbacks?.size) {
        const callbackValues = Array.from(callbacks, (cb) => cb(event));
        entry.pending = Promise.allSettled(callbackValues).then(() => {
          entry.pending = null;
          if (!queue.isEmpty()) {
            this.emit(type, queue.dequeue());
          }
        });
      }
    }
  }
};
var DispatchQueue = class {
  /**
   * Create a new dispatch queue instance.
   */
  constructor() {
    this.clear();
  }
  /**
   * Clear the queue state of all event values.
   */
  clear() {
    this.next = null;
  }
  /**
   * Indicate if the queue is empty.
   * @returns {boolean} True if queue is empty, false otherwise.
   */
  isEmpty() {
    return !this.next;
  }
  /**
   * Add a new value to the queue, and optionally filter the
   * current queue content in response.
   * @param {*} value The value to add.
   * @param {(value: *) => boolean} [filter] An optional filter
   *  function to apply to existing queue content. If unspecified
   *  or falsy, all previously queued values are removed. Otherwise,
   *  the provided function is applied to all queue entries. The
   *  entry is retained if the filter function returns a truthy value,
   *  otherwise the entry is removed.
   */
  enqueue(value, filter) {
    const tail = { value };
    if (filter && this.next) {
      let curr = this;
      while (curr.next) {
        if (filter(curr.next.value)) {
          curr = curr.next;
        } else {
          curr.next = curr.next.next;
        }
      }
      curr.next = tail;
    } else {
      this.next = tail;
    }
  }
  /**
   * Remove and return the next queued event value.
   * @returns {*} The next event value in the queue.
   */
  dequeue() {
    const { next } = this;
    this.next = next?.next;
    return next?.value;
  }
};

// ../core/src/util/distinct.js
function distinct(a, b) {
  return a === b ? false : a instanceof Date && b instanceof Date ? +a !== +b : Array.isArray(a) && Array.isArray(b) ? distinctArray(a, b) : true;
}
function distinctArray(a, b) {
  if (a.length !== b.length) return true;
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return true;
  }
  return false;
}

// ../core/src/Param.js
function isParam(x2) {
  return x2 instanceof Param;
}
var Param = class _Param extends AsyncDispatch {
  /**
   * Create a new Param instance.
   * @param {*} value The initial value of the Param.
   */
  constructor(value) {
    super();
    this._value = value;
  }
  /**
   * Create a new Param instance with the given initial value.
   * @param {*} value The initial value of the Param.
   * @returns {Param} The new Param instance.
   */
  static value(value) {
    return new _Param(value);
  }
  /**
   * Create a new Param instance over an array of initial values,
   * which may contain nested Params.
   * @param {*} values The initial values of the Param.
   * @returns {Param} The new Param instance.
   */
  static array(values) {
    if (values.some((v) => isParam(v))) {
      const p = new _Param();
      const update = () => {
        p.update(values.map((v) => isParam(v) ? v.value : v));
      };
      update();
      values.forEach((v) => isParam(v) ? v.addEventListener("value", update) : 0);
      return p;
    }
    return new _Param(values);
  }
  /**
   * The current value of the Param.
   */
  get value() {
    return this._value;
  }
  /**
   * Update the Param value
   * @param {*} value The new value of the Param.
   * @param {object} [options] The update options.
   * @param {boolean} [options.force] A boolean flag indicating if the Param
   *  should emit a 'value' event even if the internal value is unchanged.
   * @returns {this} This Param instance.
   */
  update(value, { force } = {}) {
    const shouldEmit = distinct(this._value, value) || force;
    if (shouldEmit) {
      this.emit("value", value);
    } else {
      this.cancel("value");
    }
    return this;
  }
  /**
   * Upon value-typed updates, sets the current value to the input value
   * immediately prior to the event value being emitted to listeners.
   * @param {string} type The event type.
   * @param {*} value The input event value.
   * @returns {*} The input event value.
   */
  willEmit(type, value) {
    if (type === "value") {
      this._value = value;
    }
    return value;
  }
};

// ../core/src/Selection.js
function isSelection(x2) {
  return x2 instanceof Selection;
}
function create(options, include) {
  return new Selection(
    new SelectionResolver(options),
    include ? [include].flat() : include
  );
}
var Selection = class _Selection extends Param {
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
  static intersect({ cross = false, empty = false, include = [] } = {}) {
    return create({ cross, empty }, include);
  }
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
  static union({ cross = false, empty = false, include = [] } = {}) {
    return create({ cross, empty, union: true }, include);
  }
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
  static single({ cross = false, empty = false, include = [] } = {}) {
    return create({ cross, empty, single: true }, include);
  }
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
  static crossfilter({ empty = false, include = [] } = {}) {
    return create({ cross: true, empty }, include);
  }
  /**
   * Create a new Selection instance.
   * @param {SelectionResolver} [resolver] The selection resolution
   *  strategy to apply.
   * @param {Selection[]} [include] Upstream selections whose clauses
   * should be included as part of this selection. Any clauses published
   * to these upstream selections will be relayed to this selection.
   */
  constructor(resolver = new SelectionResolver(), include = []) {
    super([]);
    this._resolved = this._value;
    this._resolver = resolver;
    this._relay = /* @__PURE__ */ new Set();
    if (Array.isArray(include)) {
      for (const sel of include) {
        sel._relay.add(this);
      }
    }
  }
  /**
   * Create a cloned copy of this Selection instance.
   * @returns {Selection} A clone of this selection.
   */
  clone() {
    const s = new _Selection(this._resolver);
    s._value = s._resolved = this._value;
    return s;
  }
  /**
   * Create a clone of this Selection with clauses corresponding
   * to the provided source removed.
   * @param {*} source The clause source to remove.
   * @returns {Selection} A cloned and updated Selection.
   */
  remove(source) {
    const s = this.clone();
    s._value = s._resolved = s._resolver.resolve(this._resolved, { source });
    s._value.active = { source };
    return s;
  }
  /**
   * The selection clause resolver.
   */
  get resolver() {
    return this._resolver;
  }
  /**
   * Indicate if this selection has a single resolution strategy.
   */
  get single() {
    return this._resolver.single;
  }
  /**
   * The current array of selection clauses.
   */
  get clauses() {
    return super.value;
  }
  /**
   * The current active (most recently updated) selection clause.
   */
  get active() {
    return this.clauses.active;
  }
  /**
   * The value corresponding to the current active selection clause.
   * This method ensures compatibility where a normal Param is expected.
   */
  get value() {
    return this.active?.value;
  }
  /**
   * The value corresponding to a given source. Returns undefined if
   * this selection does not include a clause from this source.
   * @param {*} source The clause source to look up the value for.
   */
  valueFor(source) {
    return this.clauses.find((c) => c.source === source)?.value;
  }
  /**
   * Emit an activate event with the given selection clause.
   * @param {*} clause The clause repesenting the potential activation.
   */
  activate(clause) {
    this.emit("activate", clause);
    this._relay.forEach((sel) => sel.activate(clause));
  }
  /**
   * Update the selection with a new selection clause.
   * @param {*} clause The selection clause to add.
   * @returns {this} This Selection instance.
   */
  update(clause) {
    this._resolved = this._resolver.resolve(this._resolved, clause, true);
    this._resolved.active = clause;
    this._relay.forEach((sel) => sel.update(clause));
    return super.update(this._resolved);
  }
  /**
   * Upon value-typed updates, sets the current clause list to the
   * input value and returns the active clause value.
   * @param {string} type The event type.
   * @param {*} value The input event value.
   * @returns {*} For value-typed events, returns the active clause
   *  values. Otherwise returns the input event value as-is.
   */
  willEmit(type, value) {
    if (type === "value") {
      this._value = value;
      return this.value;
    }
    return value;
  }
  /**
   * Upon value-typed updates, returns a dispatch queue filter function.
   * The return value depends on the selection resolution strategy.
   * @param {string} type The event type.
   * @param {*} value The new event value that will be enqueued.
   * @returns {(value: *) => boolean|null} For value-typed events,
   *  returns a dispatch queue filter function. Otherwise returns null.
   */
  emitQueueFilter(type, value) {
    return type === "value" ? this._resolver.queueFilter(value) : null;
  }
  /**
   * Indicates if a selection clause should not be applied to a given client.
   * The return value depends on the selection resolution strategy.
   * @param {*} client The selection clause.
   * @param {*} clause The client to test.
   * @returns True if the client should be skipped, false otherwise.
   */
  skip(client, clause) {
    return this._resolver.skip(client, clause);
  }
  /**
   * Return a selection query predicate for the given client.
   * @param {*} client The client whose data may be filtered.
   * @param {boolean} [noSkip=false] Disable skipping of active
   *  cross-filtered sources. If set true, the source of the active
   *  clause in a cross-filtered selection will not be skipped.
   * @returns {*} The query predicate for filtering client data,
   *  based on the current state of this selection.
   */
  predicate(client, noSkip = false) {
    const { clauses } = this;
    const active = noSkip ? null : clauses.active;
    return this._resolver.predicate(clauses, active, client);
  }
};
var SelectionResolver = class {
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
  constructor({ union: union2, cross, single, empty } = {}) {
    this.union = !!union2;
    this.cross = !!cross;
    this.single = !!single;
    this.empty = !!empty;
  }
  /**
   * Resolve a list of selection clauses according to the resolution strategy.
   * @param {*[]} clauseList An array of selection clauses.
   * @param {*} clause A new selection clause to add.
   * @returns {*[]} An updated array of selection clauses.
   */
  resolve(clauseList, clause, reset = false) {
    const { source, predicate } = clause;
    const filtered = clauseList.filter((c) => source !== c.source);
    const clauses = this.single ? [] : filtered;
    if (this.single && reset) filtered.forEach((c) => c.source?.reset?.());
    if (predicate) clauses.push(clause);
    return clauses;
  }
  /**
   * Indicates if a selection clause should not be applied to a given client.
   * The return value depends on the resolution strategy.
   * @param {*} client The selection clause.
   * @param {*} clause The client to test.
   * @returns True if the client should be skipped, false otherwise.
   */
  skip(client, clause) {
    return this.cross && clause?.clients?.has(client);
  }
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
  predicate(clauseList, active, client) {
    const { empty, union: union2 } = this;
    if (empty && !clauseList.length) {
      return [literal(false)];
    }
    if (this.skip(client, active)) return void 0;
    const predicates = clauseList.filter((clause) => !this.skip(client, clause)).map((clause) => clause.predicate);
    return union2 && predicates.length > 1 ? or(predicates) : predicates;
  }
  /**
   * Returns a filter function for queued selection updates.
   * @param {*} value The new event value that will be enqueued.
   * @returns {(value: *) => boolean|null} A dispatch queue filter
   *  function, or null if all unemitted event values should be filtered.
   */
  queueFilter(value) {
    if (this.cross) {
      const source = value.active?.source;
      return (clauses) => clauses.active?.source !== source;
    }
    return null;
  }
};

// ../core/src/util/throttle.js
var NIL = {};
function throttle(callback, debounce = false) {
  let curr;
  let next;
  let pending = NIL;
  function invoke(event) {
    curr = callback(event).catch(() => {
    }).finally(() => {
      if (next) {
        const { value } = next;
        next = null;
        invoke(value);
      } else {
        curr = null;
      }
    });
  }
  function enqueue(event) {
    next = { event };
  }
  function process(event) {
    curr ? enqueue(event) : invoke(event);
  }
  function delay(event) {
    if (pending !== event) {
      requestAnimationFrame(() => {
        const e = pending;
        pending = NIL;
        process(e);
      });
    }
    pending = event;
  }
  return debounce ? delay : process;
}

// ../core/src/MosaicClient.js
var MosaicClient = class {
  /**
   * Constructor.
   * @param {*} filterSelection An optional selection to interactively filter
   *  this client's data. If provided, a coordinator will re-query and update
   *  the client when the selection updates.
   */
  constructor(filterSelection) {
    this._filterBy = filterSelection;
    this._requestUpdate = throttle(() => this.requestQuery(), true);
    this._coordinator = null;
    this._pending = Promise.resolve();
  }
  /**
   * Return this client's connected coordinator.
   */
  get coordinator() {
    return this._coordinator;
  }
  /**
   * Set this client's connected coordinator.
   */
  set coordinator(coordinator2) {
    this._coordinator = coordinator2;
  }
  /**
   * Return a Promise that resolves once the client has updated.
   */
  get pending() {
    return this._pending;
  }
  /**
   * Return this client's filter selection.
   */
  get filterBy() {
    return this._filterBy;
  }
  /**
   * Return a boolean indicating if the client query can be sped up with
   * materialized views of pre-aggregated data. Should return true if changes to
   * the filterBy selection does not change the groupby domain of the client
   * query.
   */
  get filterStable() {
    return true;
  }
  /**
   * Return an array of fields queried by this client.
   * @returns {import('./types.js').FieldInfoRequest[] | null}
   *  The fields to retrieve info for.
   */
  fields() {
    return null;
  }
  /**
   * Called by the coordinator to set the field info for this client.
   * @param {import('./types.js').FieldInfo[]} info The field info result.
   * @returns {this}
   */
  fieldInfo(info) {
    return this;
  }
  /**
   * Return a query specifying the data needed by this client.
   * @param {*} [filter] The filtering criteria to apply in the query.
   * @returns {*} The client query
   */
  query(filter) {
    return null;
  }
  /**
   * Called by the coordinator to inform the client that a query is pending.
   * @returns {this}
   */
  queryPending() {
    return this;
  }
  /**
   * Called by the coordinator to return a query result.
   * @param {*} data The query result.
   * @returns {this}
   */
  queryResult(data) {
    return this;
  }
  /**
   * Called by the coordinator to report a query execution error.
   * @param {*} error
   * @returns {this}
   */
  queryError(error) {
    return this;
  }
  /**
   * Request the coordinator to execute a query for this client.
   * If an explicit query is not provided, the client query method will
   * be called, filtered by the current filterBy selection.
   * @returns {Promise}
   */
  requestQuery(query) {
    const q = query || this.query(this.filterBy?.predicate(this));
    return this._coordinator.requestQuery(this, q);
  }
  /**
   * Request that the coordinator perform a throttled update of this client
   * using the default query. Unlike requestQuery, for which every call will
   * result in an executed query, multiple calls to requestUpdate may be
   * consolidated into a single update.
   */
  requestUpdate() {
    this._requestUpdate();
  }
  /**
   * Reset this client, initiating new field info and query requests.
   * @returns {Promise}
   */
  initialize() {
    return this._coordinator.initializeClient(this);
  }
  /**
   * Requests a client update.
   * For example to (re-)render an interface component.
   *
   * @returns {this | Promise<any>}
   */
  update() {
    return this;
  }
};

// ../core/src/SelectionClause.js
function clausePoint(field2, value, {
  source,
  clients = source ? /* @__PURE__ */ new Set([source]) : void 0
}) {
  const predicate = value !== void 0 ? isIn(field2, [literal(value)]) : null;
  return {
    meta: { type: "point" },
    source,
    clients,
    value,
    predicate
  };
}
function clausePoints(fields, value, {
  source,
  clients = source ? /* @__PURE__ */ new Set([source]) : void 0
}) {
  let predicate = null;
  if (value) {
    const clauses = value.length && fields.length === 1 ? [isIn(fields[0], value.map((v) => literal(v[0])))] : value.map((v) => and(v.map((_, i) => isNotDistinct(fields[i], literal(_)))));
    predicate = value.length === 0 ? literal(false) : clauses.length > 1 ? or(clauses) : clauses[0];
  }
  return {
    meta: { type: "point" },
    source,
    clients,
    value,
    predicate
  };
}
function clauseInterval(field2, value, {
  source,
  clients = source ? /* @__PURE__ */ new Set([source]) : void 0,
  bin,
  scale,
  pixelSize = 1
}) {
  const predicate = value != null ? isBetween(field2, value) : null;
  const meta = { type: "interval", scales: scale && [scale], bin, pixelSize };
  return { meta, source, clients, value, predicate };
}
var MATCH_METHODS = { contains, prefix, suffix, regexp: regexp_matches };
function clauseMatch(field2, value, {
  source,
  clients = void 0,
  method = "contains"
}) {
  let fn2 = MATCH_METHODS[method];
  const predicate = value ? fn2(field2, literal(value)) : null;
  const meta = { type: "match", method };
  return { meta, source, clients, value, predicate };
}

// ../core/src/util/is-arrow-table.js
function isArrowTable(values) {
  return typeof values?.getChild === "function";
}

// ../core/src/util/to-data-columns.js
function toDataColumns(data) {
  return isArrowTable(data) ? arrowToColumns(data) : arrayToColumns(data);
}
function arrowToColumns(data) {
  const { numRows } = data;
  return { numRows, columns: data.toColumns() };
}
function arrayToColumns(data) {
  const numRows = data.length;
  if (typeof data[0] === "object") {
    const names = numRows ? Object.keys(data[0]) : [];
    const columns = {};
    if (names.length > 0) {
      names.forEach((name) => {
        columns[name] = data.map((d) => d[name]);
      });
    }
    return { numRows, columns };
  } else {
    return { numRows, values: data };
  }
}

// src/input.js
function input(InputClass, options) {
  const input2 = new InputClass(options);
  coordinator().connect(input2);
  return input2.element;
}

// src/Menu.js
var isObject = (v) => {
  return v && typeof v === "object" && !Array.isArray(v);
};
var menu = (options) => input(Menu, options);
var Menu = class extends MosaicClient {
  /**
   * Create a new menu input.
   * @param {object} [options] Options object
   * @param {HTMLElement} [options.element] The parent DOM element in which to
   *  place the menu elements. If undefined, a new `div` element is created.
   * @param {Selection} [options.filterBy] A selection to filter the database
   *  table indicated by the *from* option.
   * @param {Param} [options.as] The output param or selection. A selection
   *  clause is added for the currently selected menu option.
   * @param {string} [options.field] The database column name to use within
   *  generated selection clause predicates. Defaults to the *column* option.
   * @param {(any | { value: any, label?: string })[]} [options.options] An
   *  array of menu options, as literal values or option objects. Option
   *  objects have a `value` property and an optional `label` property. If no
   *  label or *format* function is provided, the string-coerced value is used.
   * @param {(value: any) => string} [options.format] A format function that
   *  takes an option value as input and generates a string label. The format
   *  function is not applied when an explicit label is provided in an option
   *  object.
   * @param {*} [options.value] The initial selected menu value.
   * @param {string} [options.from] The name of a database table to use as a data
   *  source for this widget. Used in conjunction with the *column* option.
   * @param {string} [options.column] The name of a database column from which
   *  to pull menu options. The unique column values are used as menu options.
   *  Used in conjunction with the *from* option.
   * @param {string} [options.label] A text label for this input.
   */
  constructor({
    element,
    filterBy,
    as,
    from,
    column: column2,
    label = column2,
    format: format2 = (x2) => x2,
    // TODO
    options,
    value,
    field: field2 = column2
  } = {}) {
    super(filterBy);
    this.from = from;
    this.column = column2;
    this.format = format2;
    this.field = field2;
    const selection = this.selection = as;
    this.element = element ?? document.createElement("div");
    this.element.setAttribute("class", "input");
    Object.defineProperty(this.element, "value", { value: this });
    const lab = document.createElement("label");
    lab.innerText = label || column2;
    this.element.appendChild(lab);
    this.select = document.createElement("select");
    this.element.appendChild(this.select);
    if (options) {
      this.data = options.map((opt) => isObject(opt) ? opt : { value: opt });
      this.selectedValue(value === void 0 ? "" : value);
      this.update();
    }
    if (selection) {
      const isParam2 = !isSelection(selection);
      if (value != null && (!isParam2 || selection.value === void 0)) {
        this.publish(value);
      }
      this.select.addEventListener("input", () => {
        this.publish(this.selectedValue() ?? null);
      });
      if (isParam2) {
        this.selection.addEventListener("value", (value2) => {
          if (value2 !== this.select.value) {
            this.selectedValue(value2);
          }
        });
      } else {
        this.select.addEventListener("pointerenter", (evt) => {
          if (!evt.buttons) this.activate();
        });
        this.select.addEventListener("focus", () => this.activate());
      }
    }
  }
  selectedValue(value) {
    if (arguments.length === 0) {
      const index = this.select.selectedIndex;
      return this.data[index].value;
    } else {
      const index = this.data?.findIndex((opt) => opt.value === value);
      if (index >= 0) {
        this.select.selectedIndex = index;
      } else {
        this.select.value = String(value);
      }
    }
  }
  reset() {
    this.select.selectedIndex = this.from ? 0 : -1;
  }
  activate() {
    this.selection.activate(clausePoint(this.field, 0, { source: this }));
  }
  publish(value) {
    const { selection, field: field2 } = this;
    if (isSelection(selection)) {
      if (value === "") value = void 0;
      const clause = clausePoint(field2, value, { source: this });
      selection.update(clause);
    } else if (isParam(selection)) {
      selection.update(value);
    }
  }
  query(filter = []) {
    const { from, column: column2 } = this;
    if (!from) return null;
    return Query.from(from).select({ value: column2 }).distinct().where(filter).orderby(column2);
  }
  queryResult(data) {
    this.data = [{ value: "", label: "All" }, ...data];
    return this;
  }
  update() {
    const { data, format: format2, select, selection } = this;
    select.replaceChildren();
    for (const { value, label } of data) {
      const opt = document.createElement("option");
      opt.setAttribute("value", value);
      opt.innerText = label ?? format2(value);
      this.select.appendChild(opt);
    }
    if (selection) {
      const value = isSelection(selection) ? selection.valueFor(this) : selection.value;
      this.selectedValue(value === void 0 ? "" : value);
    }
    return this;
  }
};

// src/Search.js
var _id = 0;
var search = (options) => input(Search, options);
var Search = class extends MosaicClient {
  /**
   * Create a new text search input.
   * @param {object} [options] Options object
   * @param {HTMLElement} [options.element] The parent DOM element in which to
   *  place the search elements. If undefined, a new `div` element is created.
   * @param {Selection} [options.filterBy] A selection to filter the database
   *  table indicated by the *from* option.
   * @param {Param} [options.as] The output param or selection. A selection
   *  clause is added based on the current text search query.
   * @param {string} [options.field] The database column name to use within
   *  generated selection clause predicates. Defaults to the *column* option.
   * @param {'contains' | 'prefix' | 'suffix' | 'regexp'} [options.type] The
   *  type of text search query to perform. One of:
   *  - `"contains"` (default): the query string may appear anywhere in the text
   *  - `"prefix"`: the query string must appear at the start of the text
   *  - `"suffix"`: the query string must appear at the end of the text
   *  - `"regexp"`: the query string is a regular expression the text must match
   * @param {string} [options.from] The name of a database table to use as an
   *  autocomplete data source for this widget. Used in conjunction with the
   *  *column* option.
   * @param {string} [options.column] The name of a database column from which
   *  to pull valid search results. The unique column values are used as search
   *  autocomplete values. Used in conjunction with the *from* option.
   * @param {string} [options.label] A text label for this input.
   */
  constructor({
    element,
    filterBy,
    from,
    column: column2,
    label,
    type = "contains",
    field: field2 = column2,
    as
  } = {}) {
    super(filterBy);
    this.id = "search_" + ++_id;
    this.type = type;
    this.from = from;
    this.column = column2;
    this.selection = as;
    this.field = field2;
    this.element = element ?? document.createElement("div");
    this.element.setAttribute("class", "input");
    Object.defineProperty(this.element, "value", { value: this });
    if (label) {
      const lab = document.createElement("label");
      lab.setAttribute("for", this.id);
      lab.innerText = label;
      this.element.appendChild(lab);
    }
    this.searchbox = document.createElement("input");
    this.searchbox.setAttribute("id", this.id);
    this.searchbox.setAttribute("type", "text");
    this.searchbox.setAttribute("placeholder", "Query");
    this.element.appendChild(this.searchbox);
    if (this.selection) {
      this.searchbox.addEventListener("input", () => {
        this.publish(this.searchbox.value || null);
      });
      if (!isSelection(this.selection)) {
        this.selection.addEventListener("value", (value) => {
          if (value !== this.searchbox.value) {
            this.searchbox.value = value;
          }
        });
      } else {
        this.searchbox.addEventListener("pointerenter", (evt) => {
          if (!evt.buttons) this.activate();
        });
        this.searchbox.addEventListener("focus", () => this.activate());
      }
    }
  }
  reset() {
    this.searchbox.value = "";
  }
  clause(value) {
    const { field: field2, type } = this;
    return clauseMatch(field2, value, { source: this, method: type });
  }
  activate() {
    this.selection.activate(this.clause(""));
  }
  publish(value) {
    const { selection } = this;
    if (isSelection(selection)) {
      selection.update(this.clause(value));
    } else if (isParam(selection)) {
      selection.update(value);
    }
  }
  query(filter = []) {
    const { from, column: column2 } = this;
    if (!from) return null;
    return Query.from(from).select({ list: column2 }).distinct().where(filter);
  }
  queryResult(data) {
    this.data = data;
    return this;
  }
  update() {
    const list2 = document.createElement("datalist");
    const id = `${this.id}_list`;
    list2.setAttribute("id", id);
    for (const d of this.data) {
      const opt = document.createElement("option");
      opt.setAttribute("value", d.list);
      list2.append(opt);
    }
    if (this.datalist) this.datalist.remove();
    this.element.appendChild(this.datalist = list2);
    this.searchbox.setAttribute("list", id);
    return this;
  }
};

// src/Slider.js
var _id2 = 0;
var slider = (options) => input(Slider, options);
var Slider = class extends MosaicClient {
  /**
   * Create a new slider input.
   * @param {object} [options] Options object
   * @param {HTMLElement} [options.element] The parent DOM element in which to
   *  place the slider elements. If undefined, a new `div` element is created.
   * @param {Selection} [options.filterBy] A selection to filter the database
   *  table indicated by the *from* option.
   * @param {Param} [options.as] The output param or selection. A selection
   *  clause is added based on the currently selected slider option.
   * @param {string} [options.field] The database column name to use within
   *  generated selection clause predicates. Defaults to the *column* option.
   * @param {'point' | 'interval'} [options.select] The type of selection clause
   *  predicate to generate if the **as** option is a Selection.  If `'point'`
   *  (the default), the selection predicate is an equality check for the slider
   *  value. If `'interval'`, the predicate checks an interval from the minimum
   *  to the current slider value.
   * @param {number} [options.min] The minimum slider value.
   * @param {number} [options.max] The maximum slider value.
   * @param {number} [options.step] The slider step, the amount to increment
   *  between consecutive values.
   * @param {number} [options.value] The initial slider value.
   * @param {string} [options.from] The name of a database table to use as a data
   *  source for this widget. Used in conjunction with the *column* option.
   *  The minimum and maximum values of the column determine the slider range.
   * @param {string} [options.column] The name of a database column whose values
   *  determine the slider range. Used in conjunction with the *from* option.
   *  The minimum and maximum values of the column determine the slider range.
   * @param {string} [options.label] A text label for this input.
   * @param {number} [options.width] The width of the slider in screen pixels.
   */
  constructor({
    element,
    filterBy,
    as,
    min: min2,
    max: max2,
    step,
    from,
    column: column2,
    label = column2,
    value = as?.value,
    select = "point",
    field: field2 = column2,
    width
  } = {}) {
    super(filterBy);
    this.id = "slider_" + ++_id2;
    this.from = from;
    this.column = column2 || "value";
    this.selection = as;
    this.selectionType = select;
    this.field = field2;
    this.min = min2;
    this.max = max2;
    this.step = step;
    this.element = element || document.createElement("div");
    this.element.setAttribute("class", "input");
    Object.defineProperty(this.element, "value", { value: this });
    if (label) {
      const desc2 = document.createElement("label");
      desc2.setAttribute("for", this.id);
      desc2.innerText = label;
      this.element.appendChild(desc2);
    }
    this.slider = document.createElement("input");
    this.slider.setAttribute("id", this.id);
    this.slider.setAttribute("type", "range");
    if (width != null) this.slider.style.width = `${+width}px`;
    if (min2 != null) this.slider.setAttribute("min", `${min2}`);
    if (max2 != null) this.slider.setAttribute("max", `${max2}`);
    if (step != null) this.slider.setAttribute("step", `${step}`);
    this.element.appendChild(this.slider);
    this.curval = document.createElement("label");
    this.curval.setAttribute("for", this.id);
    this.curval.setAttribute("class", "value");
    this.element.appendChild(this.curval);
    if (value != null) {
      this.slider.setAttribute("value", `${value}`);
      if (this.selection?.value === void 0) this.publish(value);
    }
    this.curval.innerText = this.slider.value;
    this.slider.addEventListener("input", () => {
      const { value: value2 } = this.slider;
      this.curval.innerText = value2;
      if (this.selection) this.publish(+value2);
    });
    if (this.selection) {
      if (!isSelection(this.selection)) {
        this.selection.addEventListener("value", (value2) => {
          if (value2 !== +this.slider.value) {
            this.slider.value = value2;
            this.curval.innerText = value2;
          }
        });
      } else {
        this.slider.addEventListener("pointerenter", (evt) => {
          if (!evt.buttons) this.activate();
        });
        this.slider.addEventListener("focus", () => this.activate());
      }
    }
  }
  query(filter = []) {
    const { from, column: column2 } = this;
    if (!from || this.min != null && this.max != null) return null;
    return Query.select({ min: min(column2), max: max(column2) }).from(from).where(filter);
  }
  queryResult(data) {
    const { min: min2, max: max2 } = Array.from(data)[0];
    if (this.min == null) {
      this.min = min2;
      this.slider.setAttribute("min", `${min2}`);
    }
    if (this.max == null) {
      this.max = max2;
      this.slider.setAttribute("max", `${max2}`);
    }
    if (this.step == null) {
      this.step = (max2 - min2) / 500;
      this.slider.setAttribute("step", `${this.step}`);
    }
    return this;
  }
  clause(value) {
    const { field: field2, selectionType } = this;
    if (selectionType === "interval") {
      const domain = [this.min ?? 0, value];
      return clauseInterval(field2, domain, {
        source: this,
        bin: "ceil",
        scale: { type: "identity", domain },
        pixelSize: this.step
      });
    } else {
      return clausePoint(field2, value, { source: this });
    }
  }
  activate() {
    this.selection.activate(this.clause(0));
  }
  publish(value) {
    const { selection } = this;
    if (isSelection(selection)) {
      selection.update(this.clause(value));
    } else if (isParam(this.selection)) {
      selection.update(value);
    }
  }
};

// ../../node_modules/isoformat/src/format.js
function format(date2, fallback) {
  if (!(date2 instanceof Date)) date2 = /* @__PURE__ */ new Date(+date2);
  if (isNaN(date2)) return typeof fallback === "function" ? fallback(date2) : fallback;
  const hours = date2.getUTCHours();
  const minutes = date2.getUTCMinutes();
  const seconds = date2.getUTCSeconds();
  const milliseconds = date2.getUTCMilliseconds();
  return `${formatYear(date2.getUTCFullYear(), 4)}-${pad(date2.getUTCMonth() + 1, 2)}-${pad(date2.getUTCDate(), 2)}${hours || minutes || seconds || milliseconds ? `T${pad(hours, 2)}:${pad(minutes, 2)}${seconds || milliseconds ? `:${pad(seconds, 2)}${milliseconds ? `.${pad(milliseconds, 3)}` : ``}` : ``}Z` : ``}`;
}
function formatYear(year) {
  return year < 0 ? `-${pad(-year, 6)}` : year > 9999 ? `+${pad(year, 6)}` : pad(year, 4);
}
function pad(value, width) {
  return `${value}`.padStart(width, "0");
}

// src/util/format.js
var formatLocaleAuto = localize((locale) => {
  const formatNumber2 = formatLocaleNumber(locale);
  return (value) => value == null ? "" : typeof value === "number" ? formatNumber2(value) : value instanceof Date ? formatDate(value) : `${value}`;
});
var formatLocaleNumber = localize((locale) => {
  return (value) => value === 0 ? "0" : value.toLocaleString(locale);
});
var formatAuto = formatLocaleAuto();
var formatNumber = formatLocaleNumber();
function formatDate(date2) {
  return format(date2, "Invalid Date");
}
function localize(f) {
  let key = null;
  let value;
  return (locale = "en") => locale === key ? value : value = f(key = locale);
}

// src/Table.js
var _id3 = -1;
var table = (options) => input(Table2, options);
var Table2 = class extends MosaicClient {
  /**
   * Create a new Table instance.
   * @param {object} options Options object
   */
  constructor({
    element,
    filterBy,
    from,
    columns = ["*"],
    columnAliases = {},
    align: align2 = {},
    styleHeaders = {},
    styleRows = {},
    format: format2,
    width,
    maxWidth,
    height = 500,
    rowBatch = 100,
    as
  } = {}) {
    super(filterBy);
    this.id = `table-${++_id3}`;
    this.from = from;
    this.columns = columns;
    this.format = format2;
    this.columnAliases = columnAliases;
    this.align = align2;
    this.widths = typeof width === "object" ? width : {};
    if (isParam(from)) {
      from.addEventListener("value", () => this.initialize());
    }
    this.offset = 0;
    this.limit = +rowBatch;
    this.isPending = false;
    this.selection = as;
    this.currentRow = -1;
    this.sortHeader = null;
    this.sortColumn = null;
    this.sortDesc = false;
    this.styleHeaders = styleHeaders;
    this.styleRows = styleRows;
    this.element = element || document.createElement("div");
    this.element.setAttribute("id", this.id);
    Object.defineProperty(this.element, "value", { value: this });
    if (typeof width === "number") this.element.style.width = `${width}px`;
    if (maxWidth) this.element.style.maxWidth = `${maxWidth}px`;
    this.element.style.maxHeight = `${height}px`;
    this.element.style.overflow = "auto";
    let prevScrollTop = -1;
    this.element.addEventListener("scroll", (evt) => {
      const { isPending, loaded } = this;
      const { scrollHeight, scrollTop, clientHeight } = evt.target;
      const back = scrollTop < prevScrollTop;
      prevScrollTop = scrollTop;
      if (back || isPending || loaded) return;
      if (scrollHeight - scrollTop < 2 * clientHeight) {
        this.isPending = true;
        this.requestData(this.offset + this.limit);
      }
    });
    this.tbl = document.createElement("table");
    this.element.appendChild(this.tbl);
    this.head = document.createElement("thead");
    this.tbl.appendChild(this.head);
    this.body = document.createElement("tbody");
    this.tbl.appendChild(this.body);
    if (this.selection) {
      this.body.addEventListener("pointerover", (evt) => {
        const row = resolveRow(evt.target);
        if (row > -1 && row !== this.currentRow) {
          this.currentRow = row;
          this.selection.update(this.clause([row]));
        }
      });
      this.body.addEventListener("pointerleave", () => {
        this.currentRow = -1;
        this.selection.update(this.clause());
      });
    }
    this.style = document.createElement("style");
    this.element.appendChild(this.style);
  }
  sourceTable() {
    return isParam(this.from) ? this.from.value : this.from;
  }
  clause(rows = []) {
    const { data, limit, schema } = this;
    const fields = schema.map((s) => s.column);
    const values = rows.map((row) => {
      const { columns } = data[~~(row / limit)];
      return fields.map((f) => columns[f][row % limit]);
    });
    return clausePoints(fields, values, { source: this });
  }
  requestData(offset = 0) {
    this.offset = offset;
    const query = this.query(this.filterBy?.predicate(this));
    this.requestQuery(query);
    coordinator().prefetch(query.clone().offset(offset + this.limit));
  }
  fields() {
    const table2 = this.sourceTable();
    return this.columns.map((column2) => ({ column: column2, table: table2 }));
  }
  fieldInfo(info) {
    this.schema = info;
    const thead = this.head;
    thead.innerHTML = "";
    const tr = document.createElement("tr");
    for (const { column: column2 } of info) {
      const th = document.createElement("th");
      th.addEventListener("click", (evt) => this.sort(evt, column2));
      th.appendChild(document.createElement("span"));
      th.appendChild(document.createTextNode(this.columnAliases && this.columnAliases[column2] ? this.columnAliases[column2] : column2));
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    this.formats = formatof(this.format, info);
    this.style.innerText = tableCSS(
      this.id,
      this.styleHeaders,
      this.styleRows,
      alignof(this.align, info),
      widthof(this.widths, info)
    );
    return this;
  }
  query(filter = []) {
    const { limit, offset, schema, sortColumn, sortDesc } = this;
    return Query.from(this.sourceTable()).select(schema.map((s) => s.column)).where(filter).orderby(sortColumn ? sortDesc ? desc(sortColumn) : sortColumn : []).limit(limit).offset(offset);
  }
  queryResult(data) {
    if (!this.isPending) {
      this.loaded = false;
      this.data = [];
      this.body.replaceChildren();
      this.offset = 0;
    }
    this.data.push(toDataColumns(data));
    return this;
  }
  update() {
    const { body, formats, data, schema, limit } = this;
    const nf = schema.length;
    const n = data.length - 1;
    const rowCount = limit * n;
    const { numRows, columns } = data[n];
    const cols = schema.map((s) => columns[s.column]);
    for (let i = 0; i < numRows; ++i) {
      const tr = document.createElement("tr");
      Object.assign(tr, { __row__: rowCount + i });
      for (let j = 0; j < nf; ++j) {
        const value = cols[j][i];
        const td = document.createElement("td");
        td.innerText = value == null ? "" : formats[j](value);
        tr.appendChild(td);
      }
      body.appendChild(tr);
    }
    if (numRows < limit) {
      this.loaded = true;
    }
    this.isPending = false;
    return this;
  }
  sort(event, column2) {
    if (event) event.stopPropagation();
    if (column2 === this.sortColumn) {
      this.sortDesc = !this.sortDesc;
    } else {
      this.sortColumn = column2;
      this.sortDesc = false;
    }
    const th = event.currentTarget;
    const currentHeader = this.sortHeader;
    if (currentHeader === th && event.metaKey) {
      currentHeader.firstChild.textContent = "";
      this.sortHeader = null;
      this.sortColumn = null;
    } else {
      if (currentHeader) currentHeader.firstChild.textContent = "";
      this.sortHeader = th;
      th.firstChild.textContent = this.sortDesc ? "\u25BE" : "\u25B4";
    }
    this.requestData();
  }
};
function resolveRow(element) {
  const p = element.parentElement;
  return Object.hasOwn(p, "__row__") ? +p.__row__ : -1;
}
function formatof(base = {}, schema, locale) {
  return schema.map(({ column: column2, type }) => {
    if (column2 in base) {
      return base[column2];
    } else {
      switch (type) {
        case "number":
          return formatLocaleNumber(locale);
        case "date":
          return formatDate;
        default:
          return formatLocaleAuto(locale);
      }
    }
  });
}
function alignof(base = {}, schema) {
  return schema.map(({ column: column2, type }) => {
    if (column2 in base) {
      return base[column2];
    } else if (type === "number") {
      return "right";
    } else {
      return "left";
    }
  });
}
function widthof(base = {}, schema) {
  return schema.map(({ column: column2 }) => base[column2]);
}
function tableCSS(id, styleHeaders, styleRows, aligns, widths) {
  const styles = [];
  styles.push(`#${id} th { ${styleHeaders} }`);
  aligns.forEach((a, i) => {
    const w = +widths[i];
    if (a !== "left" || w) {
      const align2 = a !== "left" ? `text-align:${a};` : "";
      const width = w ? `width:${w}px;max-width:${w}px;` : "";
      styles.push(`#${id} tr>:nth-child(${i + 1}) {${align2}${width} ${styleRows}}`);
    } else styles.push(`#${id} tr>:nth-child(${i + 1}) { ${styleRows}}`);
  });
  return styles.join(" ");
}
export {
  Menu,
  Search,
  Slider,
  Table2 as Table,
  menu,
  search,
  slider,
  table
};
