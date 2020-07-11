import { List } from '@src/internal';
import { expect } from 'chai';

class Foo { public constructor(public readonly value: number) { } }

describe('Average tests', () => {
    it('Simple test', () => {
        const list = List.from(2, 4, 6);
        const avg = list.average();

        expect(avg).to.be.equal(4);
    });

    it('Empty source test', () => {
        const list = List.empty();

        expect(() => list.average()).to.throw('Sequence contains no elements');
    });

    it('Not a number throws test', () => {
        const list = List
            .from(2, 4, 6)
            .select(x => new Foo(x))
            .toList();

        expect(() => list.sum()).to.throw('Value is not a number');
    });

    it('Selector test', () => {
        const list = List
            .from(2, 4, 6)
            .select(x => new Foo(x))
            .toList();
        const avg = list.sum(x => x.value);

        expect(avg).to.be.equal(12);
    });
});
