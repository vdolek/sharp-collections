import { Enumerable } from '@src/internal';

export class ZipEnumerable<TFirst, TSecond, TResult> extends Enumerable<TResult> {
    public constructor(
        private readonly firstSource: Enumerable<TFirst>,
        private readonly secondSource: Enumerable<TSecond>,
        private readonly resultSelector: (first: TFirst, second: TSecond, index: number) => TResult) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        let index = 0;
        const iterator1 = this.firstSource[Symbol.iterator]();
        const iterator2 = this.secondSource[Symbol.iterator]();

        for (let i1 = iterator1.next(), i2 = iterator2.next(); i1.done !== true && i2.done !== true; i1 = iterator1.next(), i2 = iterator2.next()) {
            const value = this.resultSelector(i1.value, i2.value, index++);
            yield value;
        }
    }

    public count(): number {
        const count1 = this.firstSource.count();
        const count2 = this.secondSource.count();
        return Math.min(count1, count2);
    }
}
