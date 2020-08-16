/* tslint:disable:max-classes-per-file */
import { Enumerable, LeftJoinElement } from '../../src/internal';
import { expect } from 'chai';

class Foo { public constructor(public readonly foo: number) { } }
class Bar { public constructor(public readonly bar: number) { } }

describe('leftJoin tests', () => {
    it('simple test', () => {
        const list1 = Enumerable
            .fromElements(1, 2, 1, 3, 5, 3, 4)
            .select(x => new Foo(x))
            .toList();

        const list2 = Enumerable
            .fromElements(2, 3, 3, 6, 5)
            .select(x => new Bar(x))
            .toList();

        const joined = list1
            .leftJoin(list2, x => x.foo, x => x.bar)
            .toArray();

        expect(joined).to.be.deep.equal([
            new LeftJoinElement(list1.get(0), null),
            new LeftJoinElement(list1.get(1), list2.get(0)),
            new LeftJoinElement(list1.get(2), null),
            new LeftJoinElement(list1.get(3), list2.get(1)),
            new LeftJoinElement(list1.get(3), list2.get(2)),
            new LeftJoinElement(list1.get(4), list2.get(4)),
            new LeftJoinElement(list1.get(5), list2.get(1)),
            new LeftJoinElement(list1.get(5), list2.get(2)),
            new LeftJoinElement(list1.get(6), null)
        ]);
    });
});
