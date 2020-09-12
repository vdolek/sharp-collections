import { Enumerable } from '../collections/Enumerable';

export class RangeEnumerable extends Enumerable<number> {
    public constructor(
        private readonly start: number,
        private readonly elementCount: number,
        private readonly increment: number) {
        super();
    }

    public *[Symbol.iterator](): Iterator<number> {
        for (let i = 0; i < this.elementCount; ++i) {
            yield this.start + i * this.increment;
        }
    }

    public count(): number {
        return this.elementCount;
    }
}
