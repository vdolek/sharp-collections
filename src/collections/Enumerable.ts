import {
    AppendEnumerable,
    ArrayEnumerable,
    Comparer,
    ConcatEnumerable,
    Dictionary,
    DistinctByEnumerable,
    ElementsAtEnumerable,
    EmptyEnumerable,
    EqualityComparer,
    Errors,
    ExceptEnumerable,
    ExtremaEnumerable,
    FullJoinElement,
    FullJoinEnumerable,
    GroupByEnumerable,
    Grouping,
    GroupJoinElement,
    GroupJoinEnumerable,
    HashSet,
    IntersectEnumerable,
    IterableEnumerable,
    JoinElement,
    JoinEnumerable,
    LeftGroupJoinElement,
    LeftGroupJoinEnumerable,
    LeftJoinElement,
    LeftJoinEnumerable,
    List,
    Lookup,
    OfTypeEnumerable,
    OrderedEnumerable,
    OrderedEnumerableInner,
    Pair,
    PrependEnumerable,
    RangeEnumerable,
    ReadOnlyDictionary,
    ReadOnlyHashSet,
    ReadOnlyList,
    RepeatEnumerable,
    ReverseEnumerable,
    RightJoinElement,
    RightJoinEnumerable,
    SelectEnumerable,
    SelectManyEnumerable,
    SetEnumerable,
    SkipEnumerable,
    SkipWhileEnumerable,
    TakeEnumerable,
    TakeWhileEnumerable,
    WhereEnumerable,
    ZipElement,
    ZipEnumerable
} from '../internal';

/**
 * Represents a collection which supports a simple iteration.
 */
export abstract class Enumerable<T> implements Iterable<T> {
    /** Returns an empty enumerable. */
    public static empty<T>(): Enumerable<T> {
        return new EmptyEnumerable();
    }

    /** Returns an Enumerable from source. */
    public static from<T>(source: Iterable<T>): Enumerable<T> {
        if (Array.isArray(source)) {
            return new ArrayEnumerable(source);
        }

        if (source instanceof Set) {
            return new SetEnumerable(source);
        }

        return new IterableEnumerable(source);
    }

    /** Returns an enumerable from parameters. */
    public static fromRest<T>(...elements: T[]): Enumerable<T> {
        return new ArrayEnumerable(elements);
    }

    /** Generates a sequence that contains one repeated value. */
    public static repeat<T>(element: T, count: number): Enumerable<T> {
        return new RepeatEnumerable(element, count);
    }

    /** Generates a sequence of integral numbers within a specified range. */
    public static range(count: number): Enumerable<number>;
    /** Generates a sequence of integral numbers within a specified range. */
    public static range(start: number, count: number): Enumerable<number>;
    /** Generates a sequence of integral numbers within a specified range. */
    public static range(start: number, count: number, increment: number): Enumerable<number>;
    public static range(a: number, b?: number, c?: number): Enumerable<number> {
        const start = b == null ? 0 : a;
        const count = b == null ? a : b;
        const increment = c ?? 1;

        return new RangeEnumerable(start, count, increment);
    }

    /** Returns a sequence containing exactly one value. */
    public static single<T>(element: T): Enumerable<T> {
        return Enumerable.fromRest(element);
    }

    public abstract [Symbol.iterator](): Iterator<T>;

    /** Bypasses a specified number of elements in a sequence and then returns the remaining elements. */
    public skip(count: number): Enumerable<T> {
        return new SkipEnumerable(this, count);
    }

    /** Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements. */
    public skipWhile(predicate: (element: T, index: number) => boolean): Enumerable<T> {
        return new SkipWhileEnumerable(this, predicate);
    }

    /** Returns subsequence of a sequence. */
    public slice(startIndex: number, count: number): Enumerable<T> {
        return this.skip(startIndex).take(count);
    }

    /** Computes the sum of the sequence that are obtained by invoking a transform function on each element of the input sequence. */
    public sum(selector?: (element: T, index: number) => number): number {
        let index = 0;
        let sum = 0;
        for (const element of this) {
            const value: unknown = selector != null ? selector(element, index++) : element;
            if (typeof value !== 'number') {
                throw Errors.valueIsNotNumber();
            }

            sum += value;
        }
        return sum;
    }

    /** Returns a specified number of contiguous elements from the start of a sequence. */
    public take(count: number): Enumerable<T> {
        return new TakeEnumerable(this, count);
    }

    /** Returns elements from a sequence as long as a specified condition is true. */
    public takeWhile(predicate: (element: T, index: number) => boolean): Enumerable<T> {
        return new TakeWhileEnumerable(this, predicate);
    }

    /** Converts sequence to an Array. */
    public toArray(): T[] {
        return Array.from(this);
    }

    /** Converts sequence to a ReadOnlyDictionary. */
    public toReadOnlyDictionary<TKey, TValue = T>(
        keySelector: (element: T, index: number) => TKey,
        valueSelector?: (element: T, index: number) => TValue
    ): ReadOnlyDictionary<TKey, TValue> {
        const pairs = this.select((x, idx) => Pair.from(
            keySelector(x, idx),
            valueSelector != null ? valueSelector(x, idx) : x as unknown as TValue
        ));

        return new Dictionary(pairs);
    }

    /** Converts sequence to a Dictionary. */
    public toDictionary<TKey, TValue = T>(
        keySelector: (element: T, index: number) => TKey,
        valueSelector?: (element: T, index: number) => TValue
    ): Dictionary<TKey, TValue> {
        const pairs = this.select((x, idx) => Pair.from(
            keySelector(x, idx),
            valueSelector != null ? valueSelector(x, idx) : x as unknown as TValue));

        return new Dictionary<TKey, TValue>(pairs);
    }

    /** Converts sequence to a HashSet. */
    public toHashSet(): HashSet<T> {
        return new HashSet(this);
    }

    /** Converts sequence to a List. */
    public toList(): List<T> {
        return new List(this);
    }

    /** Converts sequence to a Lookup. */
    public toLookup<TKey, TValue = T>(
        keySelector: (element: T, index: number) => TKey,
        valueSelector?: (element: T, index: number) => TValue
    ): Lookup<TKey, TValue> {
        const dict = this
            .groupBy(keySelector, valueSelector)
            .toReadOnlyDictionary(x => x.key);
        return new Lookup(dict);
    }

    /** Converts sequence to a Map. */
    public toMap<TKey, TValue = T>(
        keySelector: (element: T, index: number) => TKey,
        valueSelector?: (element: T, index: number) => TValue
    ): Map<TKey, TValue> {
        const selected = this.select<[TKey, TValue]>((x, idx) => [
            keySelector(x, idx),
            valueSelector != null ? valueSelector(x, idx) : x as unknown as TValue]
        );
        return new Map<TKey, TValue>(selected);
    }

    /** Converts sequence to a ReadOnlyHashSet. */
    public toReadOnlyHashSet(): ReadOnlyHashSet<T> {
        return new ReadOnlyHashSet(this);
    }

    /** Converts sequence to a ReadOnlyList. */
    public toReadOnlyList(): ReadOnlyList<T> {
        return new ReadOnlyList(this);
    }

    /** Converts sequence to a ReadOnlyMap. */
    public toReadOnlyMap<TKey, TValue = T>(
        keySelector: (element: T, index: number) => TKey,
        valueSelector?: (element: T, index: number) => TValue
    ): ReadonlyMap<TKey, TValue> {
        return this.toMap(keySelector, valueSelector);
    }

    /** Converts sequence to a ReadOnlySet. */
    public toReadOnlySet(): ReadonlySet<T> {
        return this.toSet();
    }

    /** Converts sequence to a Set. */
    public toSet(): Set<T> {
        return new Set(this);
    }

    /** Produces the set union of two sequences. */
    public union(second: Enumerable<T>): Enumerable<T> { // TODO MV Equality Comparer
        return this.concat(second).distinct();
    }

    /** Filters a sequence of values based on a predicate. */
    public where(predicate: (element: T, index: number) => boolean): Enumerable<T> {
        return new WhereEnumerable(this, predicate);
    }

    /** Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results. */
    public zip<TSecond, TResult = ZipElement<T, TSecond>>(
        second: Enumerable<TSecond>,
        resultSelector?: (first: T, second: TSecond, index: number) => TResult
    ): Enumerable<TResult> {
        const selector = resultSelector ?? ((f, s) => new ZipElement(f, s));
        // @ts-ignore
        return new ZipEnumerable(this, second, selector);
    }
}
