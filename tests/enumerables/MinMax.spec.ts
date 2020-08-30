import { expect } from 'chai';

import { List } from '../../src/internal';

class Foo { public constructor(public readonly value: number) { } }

describe('min and max tests', () => {
    it('simple test', () => {
        const list = List.fromRest(4, 2, 8, 6);

        expect(list.min()).to.be.equal(2);
        expect(list.max()).to.be.equal(8);
    });

    it('empty source test', () => {
        const list = List.empty();

        expect(() => list.min()).to.throw('Sequence contains no elements');
        expect(() => list.max()).to.throw('Sequence contains no elements');
    });

    it('not a number throws test', () => {
        const list = List
            .fromRest(2, 4, 6)
            .select(x => new Foo(x))
            .toList();

        expect(() => list.min()).to.throw('Value is not a number');
        expect(() => list.max()).to.throw('Value is not a number');
    });

    it('selector test', () => {
        const list = List
            .fromRest(4, 2, 8, 6)
            .select(x => new Foo(x))
            .toList();

        expect(list.min(x => x.value)).to.be.equal(2);
        expect(list.max(x => x.value)).to.be.equal(8);
    });
});
