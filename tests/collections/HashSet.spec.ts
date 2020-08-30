import { expect } from 'chai';

import { HashSet } from '../../src/internal';

describe('HashSet tests', () => {
    it('contains test', () => {
        const set = HashSet.fromRest(1, 2);
        set.add(3);
        set.add(2);

        expect(set.count()).to.be.equal(3);
        expect(set.contains(1)).to.be.true;
        expect(set.contains(2)).to.be.true;
        expect(set.contains(3)).to.be.true;
        expect(set.contains(4)).to.be.false;
    });

    it('toArray test', () => {
        const set = HashSet.fromRest(1, 2);
        set.add(3);

        const asArray = set.toArray();

        expect(asArray).to.have.length(3);
        expect(asArray).to.have.members([1, 2, 3]);
    });

    it('remove test', () => {
        const set = HashSet.fromRest(1, 2);
        set.add(3);
        set.remove(2);

        expect(set.count()).to.be.equal(2);
        expect(set.contains(1)).to.be.true;
        expect(set.contains(2)).to.be.false;
        expect(set.contains(3)).to.be.true;
        expect(set.contains(4)).to.be.false;
    });

    it('clear test', () => {
        const set = HashSet.fromRest(1, 2);
        set.add(3);
        set.clear();

        expect(set.count()).to.be.equal(0);
        expect(set.contains(1)).to.be.false;
        expect(set.contains(2)).to.be.false;
        expect(set.contains(3)).to.be.false;
        expect(set.contains(4)).to.be.false;
    });
});
