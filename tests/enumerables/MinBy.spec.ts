import { Enumerable } from '@sharp-collections';
import { expect } from 'chai';

class Foo { public constructor(public readonly value: number) { } }

describe('minBy tests', () => {
    it('simple test', () => {
        const list = Enumerable
            .fromElements(2, 6, 2, 4, 6)
            .select(x => new Foo(x))
            .toList();

        const values = list.minBy(x => x.value);

        expect(values.toArray()).to.be.deep.equal([list.get(0), list.get(2)]);
    });
});
