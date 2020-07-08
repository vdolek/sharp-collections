import { Enumerable } from '@src/internal';

export class RangeEnumerable extends Enumerable<number> {
    private readonly start: number;
    private readonly count: number;
    private readonly increment: number;

    public constructor(count: number);
    public constructor(start: number, count: number);
    public constructor(start: number, count: number, increment: number);
    public constructor(a: number, b?: number, c?: number) {
        super();

        this.start = b == null ? 0 : a;
        this.count = b == null ? a : b;
        this.increment = c ?? 1;
    }

    public *[Symbol.iterator](): Iterator<number> {
        for (let i = 0; i < this.count; ++i) {
            yield this.start + i * this.increment;
        }
    }
}
