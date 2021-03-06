import { expect } from 'chai';

import { Enumerable } from '../../src/index';

interface Foo { value: number; }
class Bar implements Foo { public constructor(public readonly value: number) { } }

describe('cast tests', () => {
    it('simple test', () => {
        const list = Enumerable.fromRest(2, 4).select(x => new Bar(x));
        const casted = list.cast<string>();

        expect(casted.toArray()).to.be.deep.equal([new Bar(2), new Bar(4)]);
    });
});
