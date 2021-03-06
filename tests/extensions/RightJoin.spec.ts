/* tslint:disable:max-classes-per-file */
import { expect } from 'chai';

import { Enumerable, RightJoinElement } from '../../src/index';

class Foo { public constructor(public readonly foo: number) { } }
class Bar { public constructor(public readonly bar: number) { } }

describe('leftJoin tests', () => {
    it('simple test', () => {
        const list1 = Enumerable
            .fromRest(1, 2, 1, 3, 5, 3, 4)
            .select(x => new Foo(x))
            .toList();

        const list2 = Enumerable
            .fromRest(2, 3, 3, 6, 5)
            .select(x => new Bar(x))
            .toList();

        const joined = list1
            .rightJoin(list2, x => x.foo, x => x.bar)
            .toArray();

        expect(joined).to.be.deep.equal([
            new RightJoinElement(list1.get(1), list2.get(0)),
            new RightJoinElement(list1.get(3), list2.get(1)),
            new RightJoinElement(list1.get(3), list2.get(1)),
            new RightJoinElement(list1.get(5), list2.get(2)),
            new RightJoinElement(list1.get(5), list2.get(2)),
            new RightJoinElement(undefined, list2.get(3)),
            new RightJoinElement(list1.get(4), list2.get(4))
        ]);
    });
});
