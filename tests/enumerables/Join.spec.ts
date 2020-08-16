/* tslint:disable:max-classes-per-file */
import { expect } from 'chai';

import { Enumerable, JoinElement } from '../../src/internal';

class Foo { public constructor(public readonly foo: number) { } }
class Bar { public constructor(public readonly bar: number) { } }

describe('join tests', () => {
    it('simple test', () => {
        const list1 = Enumerable
            .fromElements(1, 2, 1, 3, 5, 3)
            .select(x => new Foo(x))
            .toList();

        const list2 = Enumerable
            .fromElements(2, 3, 3, 6, 5)
            .select(x => new Bar(x))
            .toList();

        const joined = list1
            .join(list2, x => x.foo, x => x.bar)
            .toArray();

        expect(joined).to.be.deep.equal([
            new JoinElement(list1.get(1), list2.get(0)),
            new JoinElement(list1.get(3), list2.get(1)),
            new JoinElement(list1.get(3), list2.get(2)),
            new JoinElement(list1.get(4), list2.get(4)),
            new JoinElement(list1.get(5), list2.get(1)),
            new JoinElement(list1.get(5), list2.get(2))
        ]);
    });
});
