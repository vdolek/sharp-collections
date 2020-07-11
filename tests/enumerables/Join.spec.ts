/* tslint:disable:max-classes-per-file */
import { Enumerable, JoinElement } from '@src/Internal';
import { expect } from 'chai';

class Foo { public constructor(public readonly foo: number) { } }
class Bar { public constructor(public readonly bar: number) { } }

describe('join tests', () => {
    it('simple test', () => {
        const list1 = Enumerable
            .range(0, 5)
            .select(x => new Foo(x))
            .toList();

        const list2 = Enumerable
            .range(2, 7)
            .select(x => new Bar(x))
            .toList();

        const joined = list1
            .join(list2, x => x.foo, x => x.bar)
            .toArray();

        expect(joined).to.have.length(3);
        expect(joined).to.be.deep.equal([
            new JoinElement(list1.get(2), list2.get(0)),
            new JoinElement(list1.get(3), list2.get(1)),
            new JoinElement(list1.get(4), list2.get(2))
        ]);
    });
});
