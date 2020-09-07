import { Enumerable } from '../collections/Enumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Applies an accumulator function over a sequence. */
        aggregate<TAccumulate = T, TResult = T>(
            this: Enumerable<T>,
            seed: TAccumulate,
            func: (acc: TAccumulate, value: T, index: number) => TAccumulate,
            resultSelector?: (a: TAccumulate) => TResult
        ): TAccumulate | TResult;
    }
}

function aggregate<T, TAccumulate = T, TResult = T>(
    this: Enumerable<T>,
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

Enumerable.prototype.aggregate = aggregate;
