import { Enumerable } from '@src/internal';

export class SkipEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Enumerable<T>,
        private readonly count: number) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        let index = 0;
        for (const element of this.source) {
            if (index >= this.count) {
                yield element;
            }

            ++index;
        }
    }
}
