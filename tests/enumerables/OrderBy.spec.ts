import { List } from '@sharp-collections';
import { expect } from 'chai';

class Foo { public constructor(public readonly val1: number, public readonly val2: number, public readonly val3: number) { } }

describe('orderBy tests', () => {
    it.only('simple test', () => {
        const list = List.fromElements(5, 7, 6, 2, 8, 5, 6);

        expect(list.orderBy(x => x).toArray()).to.be.deep.equal([2, 5, 5, 6, 6, 7, 8]);
        expect(list.orderBy(x => x, undefined, true).toArray()).to.be.deep.equal([8, 7, 6, 6, 5, 5, 2]);
        expect(list.orderByDescending(x => x).toArray()).to.be.deep.equal([8, 7, 6, 6, 5, 5, 2]);
    });

    it.only('complex test', () => {
        const list = List.fromElements(
            new Foo(2, 1, 0),  // 0
            new Foo(1, 3, 1),  // 1
            new Foo(2, 1, 2),  // 2
            new Foo(2, 1, 3),  // 3
            new Foo(3, 2, 4),  // 4
            new Foo(2, 3, 5),  // 5
            new Foo(2, 2, 6),  // 6
            new Foo(1, 2, 7),  // 7
            new Foo(3, 3, 8),  // 8
            new Foo(3, 1, 9),  // 9
            new Foo(1, 1, 10), // 10
            new Foo(2, 1, 11)  // 11
        );

        const array = list.toArray();
        const ordered = list
            .orderBy(x => x.val1)
            .thenBy(x => x.val2)
            .toArray();

        expect(ordered).to.be.deep.equal([
            array[10],
            array[7],
            array[1],
            array[0],
            array[2],
            array[3],
            array[11],
            array[6],
            array[5],
            array[9],
            array[4],
            array[8]
        ]);
    });
});
