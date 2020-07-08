import { Enumerable, List } from '@src/internal';
import { expect } from 'chai';

class Foo { public constructor(public readonly value: number) { } }

describe('Aggregate tests', () => {
    it('Simple test', () => {
        const list = List.from(2, 4, 6);
        const result = list.aggregate(0, (val, res) => res + val);

        expect(result).to.be.equal(12);
    });

    it('With result selector test', () => {
        const list = List.from(2, 4, 6);
        const result = list.aggregate(0, (val, res) => res + val, x => x * 2);

        expect(result).to.be.equal(24);
    });

    it('Typed test', () => {
        const list = List.from(2, 4, 6).select(x => new Foo(x));
        const result = list.aggregate(0, (val, res) => res.value + val);

        expect(result).to.be.equal(12);
    });

    it('Typed with result selector test', () => {
        const list = List.from(2, 4, 6).select(x => new Foo(x));
        const result = list.aggregate(0, (val, res) => res.value + val, x => x * 2);

        expect(result).to.be.equal(24);
    });

    it('Typed2 test', () => {
        const list = List.from(2, 4, 6).select(x => new Foo(x));
        const result = list.aggregate(new Foo(0), (val, res) => new Foo(res.value + val.value));

        expect(result).to.be.deep.equal(new Foo(12));
    });

    it('Typed2 with result selector test', () => {
        const list = List.from(2, 4, 6).select(x => new Foo(x));
        const result = list.aggregate(new Foo(0), (val, res) => new Foo(res.value + val.value), x => x.value);

        expect(result).to.be.equal(12);
    });
});
