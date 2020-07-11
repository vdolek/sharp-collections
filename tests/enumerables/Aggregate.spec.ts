import { List } from '@src/Internal';
import { expect } from 'chai';

class Foo { public constructor(public readonly value: number) { } }

describe('aggregate tests', () => {
    it('simple test', () => {
        const list = List.from(2, 4, 6);
        const result = list.aggregate(0, (acc, val) => acc + val);

        expect(result).to.be.equal(12);
    });

    it('non commutative test', () => {
        const list = List.from(2, 3, 4);
        const result = list.aggregate(2, (acc, val) => Math.pow(acc, val));

        expect(result).to.be.equal(16777216);
    });

    it('with result selector test', () => {
        const list = List.from(2, 4, 6);
        const result = list.aggregate(0, (acc, val) => acc + val, x => x * 2);

        expect(result).to.be.equal(24);
    });

    it('typed test', () => {
        const list = List.from(2, 4, 6).select(x => new Foo(x));
        const result = list.aggregate(0, (acc, val) => acc + val.value);

        expect(result).to.be.equal(12);
    });

    it('typed with result selector test', () => {
        const list = List.from(2, 4, 6).select(x => new Foo(x));
        const result = list.aggregate(0, (acc, val) => acc + val.value, x => x * 2);

        expect(result).to.be.equal(24);
    });

    it('typed2 test', () => {
        const list = List.from(2, 4, 6).select(x => new Foo(x));
        const result = list.aggregate(new Foo(0), (acc, val) => new Foo(acc.value + val.value));

        expect(result).to.be.deep.equal(new Foo(12));
    });

    it('typed2 with result selector test', () => {
        const list = List.from(2, 4, 6).select(x => new Foo(x));
        const result = list.aggregate(new Foo(0), (acc, val) => new Foo(acc.value + val.value), x => x.value);

        expect(result).to.be.equal(12);
    });

    it('simple indexed test', () => {
        const list = List.from(2, 4, 6);
        const result = list.aggregate(0, (acc, val, idx) => acc + idx);

        expect(result).to.be.equal(3);
    });
});
