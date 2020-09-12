import { expect } from 'chai';

import { Pair, ReadOnlyDictionary } from '../../../src/internal';

describe('ReadOnlyDictionary creation tests', () => {
    it('empty test', () => {
        const dict = ReadOnlyDictionary.empty();

        expect(dict.size).to.be.equal(0);
    });

    it('from test', () => {
        const dict = ReadOnlyDictionary.from([Pair.from(1, 2), Pair.from(2, 4)]);

        expect(dict.size).to.be.equal(2);
        expect(dict.get(1)).to.be.equal(2);
        expect(dict.get(2)).to.be.equal(4);
    });

    it('fromRest test', () => {
        const dict = ReadOnlyDictionary.fromRest(Pair.from(1, 2), Pair.from(2, 4));

        expect(dict.size).to.be.equal(2);
        expect(dict.get(1)).to.be.equal(2);
        expect(dict.get(2)).to.be.equal(4);
    });

    it('single test', () => {
        const dict = ReadOnlyDictionary.single(1, 2);

        expect(dict.size).to.be.equal(1);
        expect(dict.single()).to.be.deep.equal(Pair.from(1, 2));
    });
});
