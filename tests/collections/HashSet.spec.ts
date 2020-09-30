/* tslint:disable:no-invalid-template-strings */
import { expect } from 'chai';
import { itParam } from 'mocha-param';

import { EqualityComparer, HashSet } from '../../src/index';

describe('HashSet tests', () => {
    itParam('contains test (with equality comparer: ${value})', [false, true], (withEqualityComparer: boolean) => {
        const set = getHashSet(withEqualityComparer);
        set.add(3);
        set.set(2);

        expect(set.size).to.be.equal(3);
        expect(set.count()).to.be.equal(3);
        expect(set.contains(1)).to.be.true;
        expect(set.contains(2)).to.be.true;
        expect(set.contains(3)).to.be.true;
        expect(set.contains(4)).to.be.false;
    });

    itParam('add test (with equality comparer: ${value})', [false, true], (withEqualityComparer: boolean) => {
        const set = getHashSet(withEqualityComparer);

        expect(() => set.add(1)).throw('The element has already been added');
        expect(() => set.set(1)).does.not.throw();
        expect(() => set.add(3)).does.not.throw();
    });

    itParam('toArray test (with equality comparer: ${value})', [false, true], (withEqualityComparer: boolean) => {
        const set = getHashSet(withEqualityComparer);
        set.add(3);

        const asArray = set.toArray();

        expect(asArray).to.have.length(3);
        expect(asArray).to.have.members([1, 2, 3]);
    });

    itParam('remove test (with equality comparer: ${value})', [false, true], (withEqualityComparer: boolean) => {
        const set = getHashSet(withEqualityComparer);
        set.add(3);
        set.remove(2);

        expect(set.size).to.be.equal(2);
        expect(set.count()).to.be.equal(2);
        expect(set.contains(1)).to.be.true;
        expect(set.contains(2)).to.be.false;
        expect(set.contains(3)).to.be.true;
        expect(set.contains(4)).to.be.false;
    });

    itParam('clear test (with equality comparer: ${value})', [false, true], (withEqualityComparer: boolean) => {
        const set = getHashSet(withEqualityComparer);
        set.add(3);
        set.clear();

        expect(set.size).to.be.equal(0);
        expect(set.count()).to.be.equal(0);
        expect(set.contains(1)).to.be.false;
        expect(set.contains(2)).to.be.false;
        expect(set.contains(3)).to.be.false;
        expect(set.contains(4)).to.be.false;
    });

    function getHashSet(withEqualityComparer: boolean): HashSet<number> {
        const hashSet = withEqualityComparer
            ? new HashSet<number>(EqualityComparer.getDefault())
            : new HashSet<number>();

        hashSet.add(1);
        hashSet.add(2);

        return hashSet;
    }
});
