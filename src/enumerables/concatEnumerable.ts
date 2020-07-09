import { Enumerable } from '@src/internal';

export class ConcatEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly firstSource: Enumerable<T>,
        private readonly secondSource: Enumerable<T>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        for (const element of this.firstSource) {
            yield element;
        }

        for (const element of this.secondSource) {
            yield element;
        }
    }

    public count(): number {
        const count = this.firstSource.count() + this.secondSource.count();
        return count;
    }
}
