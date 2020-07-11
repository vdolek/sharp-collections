import { Enumerable, List } from '@src/Internal';
import { expect } from 'chai';

interface Foo { value: number; }
class Bar implements Foo { public constructor(public readonly value: number) { } }

describe('Cast tests', () => {
    it('Enumerable simple test', () => {
        const list = Enumerable.from(2, 4).select(x => new Bar(x));
        const casted = list.cast<string>();

        expect(casted.toArray()).to.be.deep.equal([new Bar(2), new Bar(4)]);
    });
});
