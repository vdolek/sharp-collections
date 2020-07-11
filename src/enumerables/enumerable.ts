import {
    ArrayEnumerable,
    ConcatEnumerable, EmptyEnumerable, EqualityComparer,
    Errors,
    List, OfTypeEnumerable, RangeEnumerable,
    ReadOnlyList, RepeatEnumerable,
    SelectEnumerable,
    SelectManyEnumerable, SkipEnumerable, SkipWhileEnumerable,
    TakeEnumerable, TakeWhileEnumerable,
    WhereEnumerable
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
        // @ts-ignore
        return new RangeEnumerable(a, b, c);
    }

    public abstract [Symbol.iterator](): Iterator<T>;

    public aggregate(seed: T, func: (a: T, s: T) => T): T;
    public aggregate<TAccumulate>(seed: TAccumulate, func: (a: TAccumulate, s: T) => TAccumulate): TAccumulate;
    public aggregate<TAccumulate, TResult>(seed: TAccumulate, func: (a: TAccumulate, s: T) => TAccumulate, resultSelector: (a: TAccumulate) => TResult): TResult;
    public aggregate<TAccumulate, TResult>(seed: TAccumulate, func: (a: TAccumulate, s: T) => TAccumulate, resultSelector?: (a: TAccumulate) => TResult): TAccumulate | TResult {
        let result = seed;
        for (const element of this) {
            result = func(result, element);
        }
        return resultSelector != null ? resultSelector(result) : result;
    }

    public all(predicate: (x: T) => boolean): boolean;
    public all(predicate: (x: T, index: number) => boolean): boolean;
    public all(predicate: ((x: T) => boolean) | ((x: T, idx: number) => boolean)): boolean {
        let index = 0;
        for (const element of this) {
            if (!predicate(element, index++)) {
                return false;
            }
        }
        return true;
    }

    public any(): boolean;
    public any(predicate: (x: T) => boolean): boolean;
    public any(predicate: (x: T, index: number) => boolean): boolean;
    public any(predicate?: ((x: T) => boolean) | ((x: T, idx: number) => boolean)): boolean {
        let index = 0;
        for (const element of this) {
            if (predicate == null || predicate(element, index++)) {
                return true;
            }
        }
        return false;
    }

    public cast<TResult>(): Enumerable<TResult> {
        return this as unknown as Enumerable<TResult>; // TODO MV throw?
    }

    public concat(second: Enumerable<T>): Enumerable<T> {
        return new ConcatEnumerable(this, second);
    }

    public contains(value: T): boolean;
    public contains(value: T, comparer: EqualityComparer<T>): boolean;
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

    public empty(): boolean {
        return this.no();
    }

    public first(): T;
    public first(predicate: (x: T) => boolean): T;
    public first(predicate: (x: T, index: number) => boolean): T;
    public first(predicate?: ((x: T) => boolean) | ((x: T, index: number) => boolean)): T {
        let index = 0;
        for (const item of this) {
            if (predicate == null || predicate(item, index++)) {
                return item;
            }
        }

        throw predicate != null ? Errors.noMatch() : Errors.noElements();
    }

    public firstOrDefault(): T | null;
    public firstOrDefault(predicate: (x: T) => boolean): T | null;
    public firstOrDefault(predicate: (x: T, index: number) => boolean): T | null;
    public firstOrDefault(predicate?: ((x: T) => boolean) | ((x: T, index: number) => boolean)): T | null {
        let index = 0;
        for (const item of this) {
            if (predicate == null || predicate(item, index++)) {
                return item;
            }
        }

        return null;
    }

    public no(): boolean;
    public no(predicate: (x: T) => boolean): boolean;
    public no(predicate: (x: T, index: number) => boolean): boolean;
    public no(predicate?: ((x: T) => boolean) | ((x: T, idx: number) => boolean)): boolean {
        // @ts-ignore
        const result = !this.any(predicate);
        return result;
    }

    // tslint:disable-next-line:no-any
    public ofType<TResult>(type: new(...args: any[]) => TResult): Enumerable<TResult> {
        return new OfTypeEnumerable(this, type);
    }

    public select<TResult>(selector: (x: T) => TResult): Enumerable<TResult>;
    public select<TResult>(selector: (x: T, index: number) => TResult): Enumerable<TResult>;
    public select<TResult>(selector: ((x: T) => TResult) | ((x: T, idx: number) => TResult)): Enumerable<TResult> {
        return new SelectEnumerable(this, selector);
    }

    public selectMany<TResult>(selector: (x: T) => Enumerable<TResult>): Enumerable<TResult> {
        return new SelectManyEnumerable(this, selector);
    }

    public single(): T;
    public single(predicate: (x: T) => boolean): T;
    public single(predicate: (x: T, index: number) => boolean): T;
    public single(predicate?: ((x: T) => boolean) | ((x: T, index: number) => boolean)): T {
        let value: T;
        let found = false;
        let index = 0;
        for (const item of this) {
            if (predicate == null || predicate(item, index++)) {
                if (found) {
                    throw predicate != null ? Errors.moreThanOneMatch() : Errors.moreThanOneElement();
                }

                value = item;
                found = true;
            }
        }

        if (!found) {
            throw predicate != null ? Errors.noMatch() : Errors.noElements();
        }

        // @ts-ignore
        return value;
    }

    public singleOrDefault(): T | null;
    public singleOrDefault(predicate: (x: T) => boolean): T | null;
    public singleOrDefault(predicate: (x: T, index: number) => boolean): T | null;
    public singleOrDefault(predicate?: ((x: T) => boolean) | ((x: T, index: number) => boolean)): T | null {
        let value: T | null = null;
        let found = false;
        let index = 0;
        for (const item of this) {
            if (predicate == null || predicate(item, index++)) {
                if (found) {
                    throw predicate != null ? Errors.moreThanOneMatch() : Errors.moreThanOneElement();
                }

                value = item;
                found = true;
            }
        }

        return value;
    }

    public skip(count: number): Enumerable<T> {
        return new SkipEnumerable(this, count);
    }

    public skipWhile(predicate: (item: T) => boolean): Enumerable<T>;
    public skipWhile(predicate: (item: T, index: number) => boolean): Enumerable<T>;
    public skipWhile(predicate: ((item: T) => boolean) | ((item: T, index: number) => boolean)): Enumerable<T> {
        return new SkipWhileEnumerable(this, predicate);
    }

    public sum(): number;
    public sum(selector: (element: T) => number): number;
    public sum(selector: (element: T, index: number) => number): number;
    public sum(selector?: ((element: T) => number) | ((element: T, index: number) => number)): number {
        let index = 0;
        let sum = 0;
        for (const element of this) {
            const value: unknown = selector != null ? selector(element, index++) : element;
            if (typeof value !== 'number') {
                throw Errors.valueIsNotNumber(value);
            }

            sum += value;
        }
        return sum;
    }

    public take(count: number): Enumerable<T> {
        return new TakeEnumerable(this, count);
    }

    public takeWhile(predicate: (item: T) => boolean): Enumerable<T>;
    public takeWhile(predicate: (item: T, index: number) => boolean): Enumerable<T>;
    public takeWhile(predicate: ((item: T) => boolean) | ((item: T, index: number) => boolean)): Enumerable<T> {
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

    public where(predicate: (item: T) => boolean): Enumerable<T>;
    public where(predicate: (item: T, index: number) => boolean): Enumerable<T>;
    public where(predicate: ((item: T) => boolean) | ((item: T, index: number) => boolean)): Enumerable<T> {
        return new WhereEnumerable(this, predicate);
    }
}
