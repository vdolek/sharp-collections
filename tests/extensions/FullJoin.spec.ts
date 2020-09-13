/* tslint:disable:max-classes-per-file */
import { expect } from 'chai';

import { Enumerable, FullJoinElement } from '../../src/index';

class Foo { public constructor(public readonly foo: number) { } }
class Bar { public constructor(public readonly bar: number) { } }

describe('fullJoin tests', () => {
    it('simple test', () => {
        const list1 = Enumerable
            .fromRest(1, 2, 1, 3, 5, 3)
            .select(x => new Foo(x))
            .toList();

        const list2 = Enumerable
            .fromRest(2, 3, 3, 6, 5)
            .select(x => new Bar(x))
            .toList();

        const joined = list1
            .fullJoin(list2, x => x.foo, x => x.bar)
            .toArray();

        expect(joined.length).to.be.equal(9);
        expect(joined).to.have.deep.members([
            new FullJoinElement(list1.get(0), undefined),
            new FullJoinElement(list1.get(1), list2.get(0)),
            new FullJoinElement(list1.get(2), undefined),
            new FullJoinElement(list1.get(3), list2.get(1)),
            new FullJoinElement(list1.get(3), list2.get(2)),
            new FullJoinElement(list1.get(4), list2.get(4)),
            new FullJoinElement(list1.get(5), list2.get(1)),
            new FullJoinElement(list1.get(5), list2.get(2)),
            new FullJoinElement(undefined, list2.get(3))
        ]);
    });
});
