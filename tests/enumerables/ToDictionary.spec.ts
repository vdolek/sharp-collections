import { expect } from 'chai';

import { Enumerable, Pair } from '../../src/internal';

describe('toDictionary tests', () => {
    it('toDictionary test', () => {
        const enumerable = Enumerable.range(1, 3);
        const dict = enumerable.toDictionary(x => `Key${x}`, x => x * 2);

        expect(dict.count()).to.be.equal(3);
        expect(dict.toArray()).to.have.deep.members([Pair.from('Key1', 2), Pair.from('Key2', 4), Pair.from('Key3', 6)]);
    });

    it('toReadOnlyDictionary test', () => {
        const enumerable = Enumerable.range(1, 3);
        const dict = enumerable.toReadOnlyDictionary(x => `Key${x}`, x => x * 2);

        expect(dict.count()).to.be.equal(3);
        expect(dict.toArray()).to.have.deep.members([Pair.from('Key1', 2), Pair.from('Key2', 4), Pair.from('Key3', 6)]);
    });
});
