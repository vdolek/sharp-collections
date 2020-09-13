import { expect } from 'chai';

import { List } from '../../src/index';

class Foo { public constructor(public readonly value: number) { } }

describe('sum tests', () => {
    it('simple test', () => {
        const list = List.fromRest(2, 4, 6);
        const sum = list.sum();

        expect(sum).to.be.equal(12);
    });

    it('empty source test', () => {
        const list = List.empty();
        const sum = list.sum();

        expect(sum).to.be.equal(0);
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
        const sum = list.sum(x => x.value);

        expect(sum).to.be.equal(12);
    });
});
