/* tslint:disable:no-invalid-template-strings */
import { expect } from 'chai';
import { itParam } from 'mocha-param';

import { Errors } from '../../src/Errors';
import { Enumerable, EqualityComparer, HashSet } from '../../src/index';

enum HashSetType {
    Simple,
    Selector,
    Comparer
}

const allHashSetTypes = [HashSetType.Simple, HashSetType.Selector, HashSetType.Comparer];

describe('HashSet tests', () => {
    itParam('contains test (with equality comparer: ${value})', allHashSetTypes, (hashSetType: HashSetType) => {
        const set = getHashSet(hashSetType);
        set.add(3);
        set.set(2);

        expect(set.size).to.be.equal(3);
        expect(set.count()).to.be.equal(3);
        expect(set.contains(1)).to.be.true;
        expect(set.contains(2)).to.be.true;
        expect(set.contains(3)).to.be.true;
        expect(set.contains(4)).to.be.false;
    });

    itParam('add test (with equality comparer: ${value})', allHashSetTypes, (hashSetType: HashSetType) => {
        const set = getHashSet(hashSetType);

        expect(() => set.add(1)).throw('The element has already been added');
        expect(() => set.set(1)).does.not.throw();
        expect(() => set.add(3)).does.not.throw();
    });

    itParam('toArray test (with equality comparer: ${value})', allHashSetTypes, (hashSetType: HashSetType) => {
        const set = getHashSet(hashSetType);
        set.add(3);

        const asArray = set.toArray();

        expect(asArray).to.have.length(3);
        expect(asArray).to.have.members([1, 2, 3]);
    });

    itParam('remove test (with equality comparer: ${value})', allHashSetTypes, (hashSetType: HashSetType) => {
        const set = getHashSet(hashSetType);
        set.add(3);
        set.remove(2);

        expect(set.size).to.be.equal(2);
        expect(set.count()).to.be.equal(2);
        expect(set.contains(1)).to.be.true;
        expect(set.contains(2)).to.be.false;
        expect(set.contains(3)).to.be.true;
        expect(set.contains(4)).to.be.false;
    });

    itParam('clear test (with equality comparer: ${value})', allHashSetTypes, (hashSetType: HashSetType) => {
        const set = getHashSet(hashSetType);
        set.add(3);
        set.clear();

        expect(set.size).to.be.equal(0);
        expect(set.count()).to.be.equal(0);
        expect(set.contains(1)).to.be.false;
        expect(set.contains(2)).to.be.false;
        expect(set.contains(3)).to.be.false;
        expect(set.contains(4)).to.be.false;
    });

    itParam('object test (with equality comparer: ${value})', allHashSetTypes, (hashSetType: HashSetType) => {
        const objects = Enumerable.range(0, 5)
            .select(x => new Foo(x))
            .toList();

        let set: HashSet<Foo> | undefined;
        switch (hashSetType) {
            case HashSetType.Simple: set = objects.toHashSet(); break;
            case HashSetType.Selector: set = objects.toHashSet(EqualityComparer.fromSelector(x => x)); break;
            case HashSetType.Comparer: set = objects.toHashSet(EqualityComparer.fromPredicate((x, y) => x === y)); break;
            default: throw Errors.unexpectedError();
        }

        const second = objects.get(1);
        expect(set.contains(second)).to.be.true;
        expect(set.contains(new Foo(1))).to.be.false;

        second.id = 99;
        expect(set.contains(second)).to.be.true;
    });

    it('object test (with selector equality comparer)', () => {
        const objects = Enumerable.range(0, 5)
            .select(x => new Foo(x))
            .toList();

        const set = objects.toHashSet(EqualityComparer.fromSelector((x: Foo) => x.id));

        const second = objects.get(1);
        expect(set.contains(second)).to.be.true;
        expect(set.contains(new Foo(1))).to.be.true;
    });

    function getHashSet(hashSetType: HashSetType): HashSet<number> {
        let hashSet: HashSet<number> | undefined;
        switch (hashSetType) {
            case HashSetType.Simple: hashSet = new HashSet<number>(); break;
            case HashSetType.Selector: hashSet = new HashSet<number>(EqualityComparer.fromSelector(x => x)); break;
            case HashSetType.Comparer: hashSet = new HashSet<number>(EqualityComparer.fromPredicate((x, y) => x === y)); break;
            default: throw Errors.unexpectedError();
        }

        hashSet.add(1);
        hashSet.add(2);

        return hashSet;
    }

    class Foo {
        public constructor(public id: number) { }
    }
});
