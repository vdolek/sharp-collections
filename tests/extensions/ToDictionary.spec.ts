import { expect } from 'chai';

import { Enumerable, EqualityComparer, Pair } from '../../src/index';

describe('toDictionary tests', () => {
    it('toDictionary test (simple)', () => {
        const enumerable = Enumerable.range(1, 3);
        const dict = enumerable.toDictionary(x => `Key${x}`, x => x * 2);

        expect(dict.count()).to.be.equal(3);
        expect(dict.toArray()).to.have.deep.members([Pair.from('Key1', 2), Pair.from('Key2', 4), Pair.from('Key3', 6)]);
    });

    it('toDictionary test (equality comparer, without value selector)', () => {
        const enumerable = Enumerable.range(1, 3);
        const dict = enumerable.toDictionary(x => `Key${x}`, EqualityComparer.getDefault<string>());

        expect(dict.count()).to.be.equal(3);
        expect(dict.toArray()).to.have.deep.members([Pair.from('Key1', 1), Pair.from('Key2', 2), Pair.from('Key3', 3)]);
    });

    it('toDictionary test (equality comparer, with value selector)', () => {
        const enumerable = Enumerable.range(1, 3);
        const dict = enumerable.toDictionary(x => `Key${x}`, x => x * 2, EqualityComparer.getDefault<string>());

        expect(dict.count()).to.be.equal(3);
        expect(dict.toArray()).to.have.deep.members([Pair.from('Key1', 2), Pair.from('Key2', 4), Pair.from('Key3', 6)]);
    });

    it('toReadOnlyDictionary test (simple)', () => {
        const enumerable = Enumerable.range(1, 3);
        const dict = enumerable.toReadOnlyDictionary(x => `Key${x}`, x => x * 2);

        expect(dict.count()).to.be.equal(3);
        expect(dict.toArray()).to.have.deep.members([Pair.from('Key1', 2), Pair.from('Key2', 4), Pair.from('Key3', 6)]);
    });

    it('toReadOnlyDictionary test (equality comparer, without value selector)', () => {
        const enumerable = Enumerable.range(1, 3);
        const dict = enumerable.toReadOnlyDictionary(x => `Key${x}`, EqualityComparer.getDefault<string>());

        expect(dict.count()).to.be.equal(3);
        expect(dict.toArray()).to.have.deep.members([Pair.from('Key1', 1), Pair.from('Key2', 2), Pair.from('Key3', 3)]);
    });

    it('toReadOnlyDictionary test (equality comparer, with value selector)', () => {
        const enumerable = Enumerable.range(1, 3);
        const dict = enumerable.toReadOnlyDictionary(x => `Key${x}`, x => x * 2, EqualityComparer.getDefault<string>());

        expect(dict.count()).to.be.equal(3);
        expect(dict.toArray()).to.have.deep.members([Pair.from('Key1', 2), Pair.from('Key2', 4), Pair.from('Key3', 6)]);
    });
});
