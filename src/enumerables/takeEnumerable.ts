import { Enumerable } from '@src/internal';

export class TakeEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Enumerable<T>,
        private readonly count: number) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        let idx = 0;
        for (const item of this.source) {
            if (idx === this.count) {
                break;
            }

            yield item;

            ++idx;
        }
    }
}
