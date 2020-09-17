import { Enumerable } from '../collections/Enumerable';

export class RepeatEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly element: T,
        private readonly elementCount: number) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        for (let i = 0; i < this.elementCount; ++i) {
            yield this.element;
        }
    }

    public count(): number {
        return this.elementCount;
    }
}
