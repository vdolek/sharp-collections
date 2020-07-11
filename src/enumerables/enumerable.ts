import { ZipElement } from '@src/collections/zipElement';
import {
    ArrayEnumerable,
    ConcatEnumerable, EmptyEnumerable, EqualityComparer,
    Errors,
    List, OfTypeEnumerable, RangeEnumerable,
    ReadOnlyList, RepeatEnumerable,
    SelectEnumerable,
    SelectManyEnumerable, SkipEnumerable, SkipWhileEnumerable,
    TakeEnumerable, TakeWhileEnumerable,
    WhereEnumerable, ZipEnumerable
} from '@src/internal';

export abstract class Enumerable<T> implements Iterable<T> {
    public static empty<T>(): Enumerable<T> {
        return new EmptyEnumerable();
    }

    public static from<T>(...elements: T[]): Enumerable<T> {
        return new ArrayEnumerable(elements);
    }

    public static repeat<T>(element: T, count: number): Enumerable<T> {
        return new RepeatEnumerable(element, count);
    }

    public static range(count: number): Enumerable<number>;
    public static range(start: number, count: number): Enumerable<number>;
    public static range(start: number, count: number, increment: number): Enumerable<number>;
    public static range(a: number, b?: number, c?: number): Enumerable<number> {
        const start = b == null ? 0 : a;
        const count = b == null ? a : b;
        const increment = c ?? 1;

        return new RangeEnumerable(start, count, increment);
    }

    public abstract [Symbol.iterator](): Iterator<T>;

    public aggregate(seed: T, func: (acc: T, value: T, index: number) => T): T;
    public aggregate<TAccumulate>(seed: TAccumulate, func: (acc: TAccumulate, value: T, index: number) => TAccumulate): TAccumulate;
    public aggregate<TAccumulate, TResult>(seed: TAccumulate, func: (acc: TAccumulate, value: T, index: number) => TAccumulate, resultSelector: (a: TAccumulate) => TResult): TResult;
    public aggregate<TAccumulate, TResult>(seed: TAccumulate, func: (acc: TAccumulate, value: T, index: number) => TAccumulate, resultSelector?: (a: TAccumulate) => TResult): TAccumulate | TResult {
        let index = 0;
        let result = seed;
        for (const element of this) {
            result = func(result, element, index++);
        }
        return resultSelector != null ? resultSelector(result) : result;
    }

    public all(predicate: (x: T, idx: number) => boolean): boolean {
        let index = 0;
        for (const element of this) {
            if (!predicate(element, index++)) {
                return false;
            }
        }
        return true;
    }

    public any(predicate?: (x: T, index: number) => boolean): boolean {
        let index = 0;
        for (const element of this) {
            if (predicate == null || predicate(element, index++)) {
                return true;
            }
        }
        return false;
    }

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

    public cast<TResult>(): Enumerable<TResult> {
        return this as unknown as Enumerable<TResult>; // TODO MV throw?
    }

    public concat(second: Enumerable<T>): Enumerable<T> {
        return new ConcatEnumerable(this, second);
    }

    public contains(value: T, comparer?: EqualityComparer<T>): boolean {
        const cmp = comparer ?? EqualityComparer.default<T>();
        for (const element of this) {
            if (cmp.equals(value, element)) {
                return true;
            }
        }
        return false;
    }

    public count(): number {
        let index = 0;
        for (const element of this) {
            ++index;
        }
        return index;
    }

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

    public elementAtOrDefault(index: number): T | null {
        if (index < 0) {
            return null;
        }

        let idx = 0;
        for (const element of this) {
            if (idx === index) {
                return element;
            }
            ++idx;
        }

        return null;
    }

    public empty(): boolean {
        return this.no();
    }

    public first(predicate?: (x: T, index: number) => boolean): T {
        let index = 0;
        for (const element of this) {
            if (predicate == null || predicate(element, index++)) {
                return element;
            }
        }

        throw predicate != null ? Errors.noMatch() : Errors.noElements();
    }

    public firstOrDefault(predicate?: (x: T, index: number) => boolean): T | null {
        let index = 0;
        for (const element of this) {
            if (predicate == null || predicate(element, index++)) {
                return element;
            }
        }

        return null;
    }

    public last(predicate?: (x: T, index: number) => boolean): T {
        let index = 0;
        let lastItem: T | null = null;
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

    public lastOrDefault(predicate?: (x: T, index: number) => boolean): T | null {
        let index = 0;
        let lastItem: T | null = null;
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

        return null;
    }

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

    public no(predicate?: (x: T, index: number) => boolean): boolean {
        return !this.any(predicate);
    }

    // tslint:disable-next-line:no-any
    public ofType<TResult>(type: new(...args: any[]) => TResult): Enumerable<TResult> {
        return new OfTypeEnumerable(this, type);
    }

    public select<TResult>(selector: (x: T, index: number) => TResult): Enumerable<TResult> {
        return new SelectEnumerable(this, selector);
    }

    public selectMany<TResult>(selector: (x: T) => Enumerable<TResult>): Enumerable<TResult> {
        return new SelectManyEnumerable(this, selector);
    }

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

    public singleOrDefault(predicate?: (x: T, index: number) => boolean): T | null {
        let value: T | null = null;
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

    public skip(count: number): Enumerable<T> {
        return new SkipEnumerable(this, count);
    }

    public skipWhile(predicate: (element: T, index: number) => boolean): Enumerable<T> {
        return new SkipWhileEnumerable(this, predicate);
    }

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

    public take(count: number): Enumerable<T> {
        return new TakeEnumerable(this, count);
    }

    public takeWhile(predicate: (element: T, index: number) => boolean): Enumerable<T> {
        return new TakeWhileEnumerable(this, predicate);
    }

    public toArray(): T[] {
        return Array.from(this);
    }

    public toList(): List<T> {
        return new List<T>(this.toArray());
    }

    public toReadOnlyList(): ReadOnlyList<T> {
        return new ReadOnlyList<T>(this.toArray());
    }

    public where(predicate: (element: T, index: number) => boolean): Enumerable<T> {
        return new WhereEnumerable(this, predicate);
    }

    public zip<TSecond, TResult = ZipElement<T, TSecond>>(second: Enumerable<TSecond>, resultSelector?: (first: T, second: TSecond, index: number) => TResult): Enumerable<TResult> {
        const selector = resultSelector ?? ((f, s) => new ZipElement(f, s));
        // @ts-ignore
        return new ZipEnumerable(this, second, selector);
    }
}
