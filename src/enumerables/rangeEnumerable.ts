import { Enumerable } from '@src/internal';

export class RangeEnumerable extends Enumerable<number> {
    private readonly start: number;
    private readonly cnt: number;
    private readonly increment: number;

    public constructor(count: number);
    public constructor(start: number, count: number);
    public constructor(start: number, count: number, increment: number);
    public constructor(a: number, b?: number, c?: number) {
        super();

        this.start = b == null ? 0 : a;
        this.cnt = b == null ? a : b;
        this.increment = c ?? 1;
    }

    public *[Symbol.iterator](): Iterator<number> {
        for (let i = 0; i < this.cnt; ++i) {
            yield this.start + i * this.increment;
        }
    }
}
