import { expect } from 'chai';

import { Enumerable } from '../../src/internal';

class Foo { public constructor(public readonly value: number) { } }

describe('maxBy tests', () => {
    it('simple test', () => {
        const list = Enumerable
            .fromElements(2, 6, 2, 4, 6)
            .select(x => new Foo(x))
            .toList();

        const values = list.maxBy(x => x.value);

        expect(values.toArray()).to.be.deep.equal([list.get(1), list.get(4)]);
    });
});