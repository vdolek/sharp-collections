import { expect } from 'chai';

import { List } from '../../src/index';

class Foo { public constructor(public readonly value: number) { } }

describe('average tests', () => {
    it('simple test', () => {
        const list = List.fromRest(2, 4, 6);
        const avg = list.average();

        expect(avg).to.be.equal(4);
    });

    it('empty source test', () => {
        const list = List.empty();

        expect(() => list.average()).to.throw('Sequence contains no elements');
    });

    it('not a number throws test', () => {
        const list = List
            .fromRest(2, 4, 6)
            .select(x => new Foo(x))
            .toList();

        expect(() => list.sum()).to.throw('Value is not a number');
    });

    it('selector test', () => {
        const list = List
            .fromRest(2, 4, 6)
            .select(x => new Foo(x))
            .toList();
        const avg = list.sum(x => x.value);

        expect(avg).to.be.equal(12);
    });
});
