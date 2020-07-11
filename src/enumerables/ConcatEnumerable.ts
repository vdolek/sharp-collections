import { Enumerable } from '@src/Internal';

export class ConcatEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly firstSource: Iterable<T>,
        private readonly secondSource: Iterable<T>) {
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
}
