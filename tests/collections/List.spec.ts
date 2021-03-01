import { assert, expect } from 'chai';

import { List } from '../../src/index';

describe('List tests', () => {
    it('containsIndex test', () => {
        const list = List.fromRest(2, 4, 6);

        expect(list.containsIndex(-1)).to.be.false;
        expect(list.containsIndex(0)).to.be.true;
        expect(list.containsIndex(1)).to.be.true;
        expect(list.containsIndex(2)).to.be.true;
        expect(list.containsIndex(3)).to.be.false;
        expect(() => list.containsIndex(2.5)).throws(Error, 'Index was not an integer');
    });

    it('reverse test', () => {
        const list = List.fromRest(2, 4, 6)
            .reverse();

        expect(list.toArray()).to.be.deep.equal([6, 4, 2]);
    });

    it('clear test', () => {
        const list = List.fromRest(2, 4, 6);
        list.clear();

        expect(list.count()).to.be.equal(0);

        for (const item of list) {
            assert.fail();
        }
    });
});
