import {
    AppendEnumerable,
    ArrayEnumerable,
    Comparer,
    ConcatEnumerable,
    Dictionary,
    DistinctByEnumerable,
    ElementsAtEnumerable,
    ElementsAtNotFoundBehavior,
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
    public static fromElements<T>(...elements: T[]): Enumerable<T> {
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
        return Enumerable.fromElements(element);
    }

    public abstract [Symbol.iterator](): Iterator<T>;

    public asEnumerable(): Enumerable<T> {
        return Enumerable.from(this);
    }

    /** Applies an accumulator function over a sequence. */
    public aggregate<TAccumulate = T, TResult = T>(
        seed: TAccumulate,
        func: (acc: TAccumulate, value: T, index: number) => TAccumulate,
        resultSelector?: (a: TAccumulate) => TResult
    ): TAccumulate | TResult {
        let index = 0;
        let result = seed;
        for (const element of this) {
            result = func(result, element, index++);
        }
        return resultSelector != null ? resultSelector(result) : result;
    }

    /** Determines whether all elements of a sequence satisfy a condition. */
    public all(predicate: (x: T, idx: number) => boolean): boolean {
        let index = 0;
        for (const element of this) {
            if (!predicate(element, index++)) {
                return false;
            }
        }
        return true;
    }

    /** Determines whether a sequence contains any elements. */
    public any(predicate?: (x: T, index: number) => boolean): boolean {
        let index = 0;
        for (const element of this) {
            if (predicate == null || predicate(element, index++)) {
                return true;
            }
        }
        return false;
    }

    /** Appends a value to the end of the sequence. */
    public append(value: T): Enumerable<T> {
        return new AppendEnumerable(this, value);
    }

    /** Computes the average of a sequence that are obtained by invoking a transform function on each element of the input sequence. */
    public average(selector?: (element: T, index: number) => number): number {
        let index = 0;
        let sum = 0;
        for (const element of this) {
            const value = selector != null ? selector(element, index) : element;
            if (typeof value !== 'number') {
                throw Errors.valueIsNotNumber();
            }

            sum += value;
            index++;
        }

        if (index === 0) {
            throw Errors.noElements();
        }

        return sum / index;
    }

    /** Casts the elements to the specified type. */
    public cast<TResult>(): Enumerable<TResult> {
        return this as unknown as Enumerable<TResult>; // TODO MV throw?
    }

    /** Concatenates two sequences. */
    public concat(second: Enumerable<T>): Enumerable<T> {
        return new ConcatEnumerable(this, second);
    }

    /** Determines whether a sequence contains a specified element by using an equality comparer. */
    public contains(value: T, comparer?: EqualityComparer<T>): boolean {
        const cmp = comparer ?? EqualityComparer.default<T>();
        for (const element of this) {
            if (cmp.equals(value, element)) {
                return true;
            }
        }
        return false;
    }

    /** Returns a number that represents how many elements in the specified sequence satisfy a condition. */
    public count(predicate?: (element: T, index: number) => boolean): number {
        let index = 0;
        let count = 0;
        for (const element of this) {
            if (predicate == null || predicate(element, index)) {
                ++count;
            }
            ++index;
        }
        return count;
    }

    /** Returns distinct elements from a sequence. */
    public distinct(): Enumerable<T> { // TODO MV EqualityComparer
        return new DistinctByEnumerable(this);
    }

    /** Returns distinct elements from a sequence by using key selector to compare values. */
    public distinctBy<TKey = T>(keySelector: (element: T, index: number) => TKey): Enumerable<T> {
        return new DistinctByEnumerable(this, keySelector);
    }

    /** Returns the element at a specified index in a sequence. */
    public elementAt(index: number): T {
        if (index < 0) {
            throw Errors.indexOutOfRange();
        }

        let idx = 0;
        for (const element of this) {
            if (idx === index) {
                return element;
            }
            ++idx;
        }

        throw Errors.indexOutOfRange();
    }

    /** Returns the element at a specified index in a sequence or a default value if the index is out of range. */
    public elementAtOrDefault(index: number): T | undefined {
        if (index < 0) {
            return undefined;
        }

        let idx = 0;
        for (const element of this) {
            if (idx === index) {
                return element;
            }
            ++idx;
        }

        return undefined;
    }

    /** Returns elements at a specified indexes in a sequence. */
    public elementsAt(indexes: Iterable<number>): Enumerable<T>;
    /** Returns elements at a specified indexes in a sequence. */
    public elementsAt(indexes: Iterable<number>, behavior: ElementsAtNotFoundBehavior.returnDefault): Enumerable<T | undefined>;
    /** Returns elements at a specified indexes in a sequence. */
    public elementsAt(indexes: Iterable<number>, behavior: ElementsAtNotFoundBehavior.throw | ElementsAtNotFoundBehavior.ignore): Enumerable<T>;
    public elementsAt(indexes: Iterable<number>, behavior: ElementsAtNotFoundBehavior = ElementsAtNotFoundBehavior.throw): Enumerable<T | undefined> {
        return new ElementsAtEnumerable(this, indexes, behavior);
    }

    /** Produces the set difference of two sequences. */
    public except(except: Iterable<T>): Enumerable<T> { // TODO MV EqualityComparer
        return new ExceptEnumerable(this, except);
    }

    /** Returns the first element of a sequence. */
    public first(predicate?: (x: T, index: number) => boolean): T {
        let index = 0;
        for (const element of this) {
            if (predicate == null || predicate(element, index++)) {
                return element;
            }
        }

        throw predicate != null ? Errors.noMatch() : Errors.noElements();
    }

    /** Returns the first element of a sequence, or undefined if the sequence contains no elements. */
    public firstOrDefault(predicate?: (x: T, index: number) => boolean): T | undefined {
        let index = 0;
        for (const element of this) {
            if (predicate == null || predicate(element, index++)) {
                return element;
            }
        }

        return undefined;
    }

    /** Performs a full outer join on two homogeneous sequences. */
    public fullJoin<TRight, TKey, TResult = FullJoinElement<T, TRight>>(
        rightSource: Iterable<TRight>,
        leftKeySelector: (value: T, index: number) => TKey,
        rightKeySelector: (value: TRight, index: number) => TKey,
        resultSelector?: (left: T | undefined, right: TRight | undefined) => TResult
    ): Enumerable<TResult> {
        return new FullJoinEnumerable(this, rightSource, leftKeySelector, rightKeySelector, resultSelector);
    }

    /** Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. */
    public groupBy<TKey, TElement = T, TResult = Grouping<TKey, TElement>>(
        keySelector: (x: T, index: number) => TKey,
        elementSelector?: (value: T, index: number) => TElement,
        resultSelector?: (key: TKey, group: Enumerable<TElement>) => TResult
    ): Enumerable<TResult> {
        return new GroupByEnumerable(this, keySelector, elementSelector, resultSelector);
    }

    /** Correlates the elements of two sequences based on equality of keys and groups the results. */
    public groupJoin<TRight, TKey, TResult = GroupJoinElement<T, TRight>>(
        rightSource: Iterable<TRight>,
        leftKeySelector: (value: T, index: number) => TKey,
        rightKeySelector: (value: TRight, index: number) => TKey,
        resultSelector?: (left: T, rightList: ReadOnlyList<TRight>) => TResult
    ): Enumerable<TResult> {
        return new GroupJoinEnumerable(this, rightSource, leftKeySelector, rightKeySelector, resultSelector);
    }

    /** Produces the set intersection of two sequences. */
    public intersect(second: Iterable<T>): Enumerable<T> {
        return new IntersectEnumerable(this, second);
    }

    /** Determines whether the sequence is empty. */
    public isEmpty(): boolean {
        return this.no();
    }

    /** Correlates the elements of two sequences based on matching keys. */
    public join<TRight, TKey, TResult = JoinElement<T, TRight>>(
        rightSource: Iterable<TRight>,
        leftKeySelector: (value: T, index: number) => TKey,
        rightKeySelector: (value: TRight, index: number) => TKey,
        resultSelector?: (left: T, right: TRight) => TResult
    ): Enumerable<TResult> {
        return new JoinEnumerable(this, rightSource, leftKeySelector, rightKeySelector, resultSelector);
    }

    /** Returns the last element of a sequence that satisfies a specified condition. */
    public last(predicate?: (x: T, index: number) => boolean): T {
        let index = 0;
        let lastItem: T | undefined;
        let lastItemSet = false;
        for (const element of this) {
            if (predicate == null || predicate(element, index++)) {
                lastItem = element;
                lastItemSet = true;
            }
        }

        if (lastItemSet) {
            return lastItem as T;
        }

        throw predicate != null ? Errors.noMatch() : Errors.noElements();
    }

    /** Returns the last element of a sequence that satisfies a condition or undefined if no such element is found. */
    public lastOrDefault(predicate?: (x: T, index: number) => boolean): T | undefined {
        let index = 0;
        let lastItem: T | undefined;
        let lastItemSet = false;
        for (const element of this) {
            if (predicate == null || predicate(element, index++)) {
                lastItem = element;
                lastItemSet = true;
            }
        }

        if (lastItemSet) {
            return lastItem;
        }

        return undefined;
    }

    /** Correlates the elements of two sequences based on equality of keys and groups the results. */
    public leftGroupJoin<TRight, TKey, TResult = LeftGroupJoinElement<T, TRight>>(
        rightSource: Iterable<TRight>,
        leftKeySelector: (value: T, index: number) => TKey,
        rightKeySelector: (value: TRight, index: number) => TKey,
        resultSelector?: (left: T, rightList: ReadOnlyList<TRight> | undefined) => TResult
    ): Enumerable<TResult> {
        return new LeftGroupJoinEnumerable(this, rightSource, leftKeySelector, rightKeySelector, resultSelector);
    }

    /** Performs a left outer join on two homogeneous sequences. */
    public leftJoin<TRight, TKey, TResult = LeftJoinElement<T, TRight>>(
        rightSource: Iterable<TRight>,
        leftKeySelector: (value: T, index: number) => TKey,
        rightKeySelector: (value: TRight, index: number) => TKey,
        resultSelector?: (left: T, right: TRight | undefined) => TResult
    ): Enumerable<TResult> {
        return new LeftJoinEnumerable(this, rightSource, leftKeySelector, rightKeySelector, resultSelector);
    }

    /** Invokes a transform function on each element of a sequence and returns the maximum value. */
    public max(selector?: (element: T, index: number) => number): number {
        let index = 0;
        let maxValue = Number.NaN;
        for (const element of this) {
            const value = selector != null ? selector(element, index) : element;
            if (typeof value !== 'number') {
                throw Errors.valueIsNotNumber();
            }

            if (isNaN(maxValue) || maxValue < value) {
                maxValue = value;
            }

            index++;
        }

        if (index === 0) {
            throw Errors.noElements();
        }

        return maxValue;
    }

    /** Returns the maximal elements of the given sequence, based on the given projection. */
    public maxBy<TKey>(keySelector: (element: T, index: number) => TKey, comparer: Comparer<TKey> = Comparer.default<TKey>()): Enumerable<T> {
        return new ExtremaEnumerable(this, keySelector, comparer);
    }

    /** Invokes a transform function on each element of a sequence and returns the minimum value. */
    public min(selector?: (element: T, index: number) => number): number {
        let index = 0;
        let minValue = Number.NaN;
        for (const element of this) {
            const value = selector != null ? selector(element, index) : element;
            if (typeof value !== 'number') {
                throw Errors.valueIsNotNumber();
            }

            if (isNaN(minValue) || minValue > value) {
                minValue = value;
            }

            index++;
        }

        if (index === 0) {
            throw Errors.noElements();
        }

        return minValue;
    }

    /** Returns the minimal elements of the given sequence, based on the given projection. */
    public minBy<TKey>(keySelector: (element: T, index: number) => TKey, comparer: Comparer<TKey> = Comparer.default<TKey>()): Enumerable<T> {
        return new ExtremaEnumerable(this, keySelector, comparer.invert());
    }

    /** Determines whether no elements of a sequence satisfy a condition. */
    public no(predicate?: (x: T, index: number) => boolean): boolean {
        return !this.any(predicate);
    }

    /** Filters the elements based on a specified type. */
    // tslint:disable-next-line:no-any
    public ofType<TResult>(type: new(...args: any[]) => TResult): Enumerable<TResult> {
        return new OfTypeEnumerable(this, type);
    }

    /** Sorts the elements of a sequence according to a key. */
    public orderBy<TKey>(keySelector: (element: T) => TKey, comparer: Comparer<TKey> = Comparer.default<TKey>(), descending: boolean = false): OrderedEnumerable<T> {
        const newComparer = comparer.invert(descending);
        return new OrderedEnumerableInner(this, keySelector, newComparer);
    }

    /** Sorts the elements of a sequence in descending order according to a key. */
    public orderByDescending<TKey>(keySelector: (element: T) => TKey, comparer: Comparer<TKey> = Comparer.default<TKey>()): OrderedEnumerable<T> {
        return this.orderBy(keySelector, comparer, true);
    }

    /** Adds a value to the beginning of the sequence. */
    public prepend(value: T): Enumerable<T> {
        return new PrependEnumerable(this, value);
    }

    /** Inverts the order of the elements in a sequence. */
    public reverse(): Enumerable<T> {
        return new ReverseEnumerable(this);
    }

    /** Performs a right outer join on two homogeneous sequences. */
    public rightJoin<TRight, TKey, TResult = RightJoinElement<T, TRight>>(
        rightSource: Iterable<TRight>,
        leftKeySelector: (value: T, index: number) => TKey,
        rightKeySelector: (value: TRight, index: number) => TKey,
        resultSelector?: (left: T | undefined, right: TRight) => TResult
    ): Enumerable<TResult> {
        return new RightJoinEnumerable(this, rightSource, leftKeySelector, rightKeySelector, resultSelector);
    }

    /** Projects each element of a sequence into a new form. */
    public select<TResult>(selector: (x: T, index: number) => TResult): Enumerable<TResult> {
        return new SelectEnumerable(this, selector);
    }

    /** Projects each element of a sequence and flattens the resulting sequences into one sequence. */
    public selectMany<TResult>(selector: (x: T) => Enumerable<TResult>): Enumerable<TResult> {
        return new SelectManyEnumerable(this, selector);
    }

    /** Determines whether two sequences are equal by comparing the elements. */
    public sequenceEqual(secondSource: Enumerable<T>, comparer?: EqualityComparer<T>): boolean {
        const cmp = comparer ?? EqualityComparer.default<T>();

        const iterator1 = this[Symbol.iterator]();
        const iterator2 = secondSource[Symbol.iterator]();

        let i1 = iterator1.next();
        let i2 = iterator2.next();
        for (; i1.done !== true && i2.done !== true; i1 = iterator1.next(), i2 = iterator2.next()) {
            if (!cmp.equals(i1.value, i2.value)) {
                return false;
            }
        }

        if (i1.done !== true || i2.done !== true) {
            return false;
        }

        return true;
    }

    /** Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists. */
    public single(predicate?: (x: T, index: number) => boolean): T {
        let value: T;
        let found = false;
        let index = 0;
        for (const element of this) {
            if (predicate == null || predicate(element, index++)) {
                if (found) {
                    throw predicate != null ? Errors.moreThanOneMatch() : Errors.moreThanOneElement();
                }

                value = element;
                found = true;
            }
        }

        if (!found) {
            throw predicate != null ? Errors.noMatch() : Errors.noElements();
        }

        // @ts-ignore
        return value;
    }

    /**
     *  Returns the only element of a sequence that satisfies a specified condition or
     *  undefined if no such element exists; this method throws an exception if
     *  more than one element satisfies the condition.
     */
    public singleOrDefault(predicate?: (x: T, index: number) => boolean): T | undefined {
        let value: T | undefined;
        let found = false;
        let index = 0;
        for (const element of this) {
            if (predicate == null || predicate(element, index++)) {
                if (found) {
                    throw predicate != null ? Errors.moreThanOneMatch() : Errors.moreThanOneElement();
                }

                value = element;
                found = true;
            }
        }

        return value;
    }

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

    /** Converts sequence to ReadOnlyDictionary. */
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

    /** Converts sequence to Dictionary. */
    public toDictionary<TKey, TValue = T>(
        keySelector: (element: T, index: number) => TKey,
        valueSelector?: (element: T, index: number) => TValue
    ): Dictionary<TKey, TValue> {
        const pairs = this.select((x, idx) => Pair.from(
            keySelector(x, idx),
            valueSelector != null ? valueSelector(x, idx) : x as unknown as TValue));

        return new Dictionary<TKey, TValue>(pairs);
    }

    /** Converts sequence to HashSet. */
    public toHashSet(): HashSet<T> {
        return new HashSet(this);
    }

    /** Converts sequence to List. */
    public toList(): List<T> {
        return new List(this);
    }

    /** Converts sequence to Lookup. */
    public toLookup<TKey, TValue = T>(
        keySelector: (element: T, index: number) => TKey,
        valueSelector?: (element: T, index: number) => TValue
    ): Lookup<TKey, TValue> {
        const dict = this
            .groupBy(keySelector, valueSelector)
            .toReadOnlyDictionary(x => x.key);
        return new Lookup(dict);
    }

    /** Converts sequence to Map. */
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

    /** Converts sequence to ReadOnlyHashSet. */
    public toReadOnlyHashSet(): ReadOnlyHashSet<T> {
        return new ReadOnlyHashSet(this);
    }

    /** Converts sequence to ReadOnlyList. */
    public toReadOnlyList(): ReadOnlyList<T> {
        return new ReadOnlyList(this);
    }

    /** Converts sequence to ReadOnlyMap. */
    public toReadOnlyMap<TKey, TValue = T>(
        keySelector: (element: T, index: number) => TKey,
        valueSelector?: (element: T, index: number) => TValue
    ): ReadonlyMap<TKey, TValue> {
        return this.toMap(keySelector, valueSelector);
    }

    /** Converts sequence to ReadOnlySet. */
    public toReadOnlySet(): ReadonlySet<T> {
        return this.toSet();
    }

    /** Converts sequence to Set. */
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
