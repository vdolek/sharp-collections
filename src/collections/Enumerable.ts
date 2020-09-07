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
