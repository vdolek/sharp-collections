import { assert, expect } from 'chai';

import { ArrayEnumerable, List } from '../../src/internal';

describe('List tests', () => {
    it('containsIndex test', () => {
        const list = List.fromElements(2, 4, 6);

        expect(list.containsIndex(-1)).to.be.false;
        expect(list.containsIndex(0)).to.be.true;
        expect(list.containsIndex(1)).to.be.true;
        expect(list.containsIndex(2)).to.be.true;
        expect(list.containsIndex(3)).to.be.false;
        expect(() => list.containsIndex(2.5)).throws(Error, 'Index was not an integer');
    });

    it('fromElements test', () => {
        const enumerable = List.fromElements(2, 4, 6);

        expect(enumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('from ArrayEnumerable test', () => {
        const list = new List(new ArrayEnumerable([2, 4, 6]));

        expect(list.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('clear test', () => {
        const list = List.fromElements(2, 4, 6);
        list.clear();

        expect(list.count()).to.be.equal(0);

        for (const item of list) {
            assert.fail();
        }
    });
});
