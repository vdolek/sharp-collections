import { List } from '@src/internal';
import { expect } from 'chai';

class Foo { public constructor(public readonly value: number) { } }

describe('Min and Max tests', () => {
    it('Simple test', () => {
        const list = List.from(4, 2, 8, 6);

        expect(list.min()).to.be.equal(2);
        expect(list.max()).to.be.equal(8);
    });

    it('Empty source test', () => {
        const list = List.empty();

        expect(() => list.min()).to.throw('Sequence contains no elements');
        expect(() => list.max()).to.throw('Sequence contains no elements');
    });

    it('Not a number throws test', () => {
        const list = List
            .from(2, 4, 6)
            .select(x => new Foo(x))
            .toList();

        expect(() => list.min()).to.throw('Value is not a number');
        expect(() => list.max()).to.throw('Value is not a number');
    });

    it('Selector test', () => {
        const list = List
            .from(4, 2, 8, 6)
            .select(x => new Foo(x))
            .toList();

        expect(list.min(x => x.value)).to.be.equal(2);
        expect(list.max(x => x.value)).to.be.equal(8);
    });
});
