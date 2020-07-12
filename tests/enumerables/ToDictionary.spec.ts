import { ArrayEnumerable, Enumerable, List, Pair } from '@sharp-collections';
import { expect } from 'chai';

describe('toDictionary tests', () => {
    it('toDictionary test', () => {
        const enumerable = Enumerable.range(1, 3);
        const dict = enumerable.toDictionary(x => `Key${x}`, x => x * 2);

        expect(dict.count()).to.be.equal(3);
        expect(dict.toArray()).to.have.deep.members([Pair.fromElements('Key1', 2), Pair.fromElements('Key2', 4), Pair.fromElements('Key3', 6)]);
    });

    it('toReadOnlyDictionary test', () => {
        const enumerable = Enumerable.range(1, 3);
        const dict = enumerable.toReadOnlyDictionary(x => `Key${x}`, x => x * 2);

        expect(dict.count()).to.be.equal(3);
        expect(dict.toArray()).to.have.deep.members([Pair.fromElements('Key1', 2), Pair.fromElements('Key2', 4), Pair.fromElements('Key3', 6)]);
    });
});
