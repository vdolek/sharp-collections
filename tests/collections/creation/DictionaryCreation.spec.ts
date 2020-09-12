import { expect } from 'chai';

import { Dictionary, Pair } from '../../../src/internal';

describe('Dictionary creation tests', () => {
    it('empty test', () => {
        const dict = Dictionary.empty();

        expect(dict.size).to.be.equal(0);
    });

    it('from test', () => {
        const dict = Dictionary.from([Pair.from(1, 2), Pair.from(2, 4)]);

        expect(dict.size).to.be.equal(2);
        expect(dict.get(1)).to.be.equal(2);
        expect(dict.get(2)).to.be.equal(4);
    });

    it('fromRest test', () => {
        const dict = Dictionary.fromRest(Pair.from(1, 2), Pair.from(2, 4));

        expect(dict.size).to.be.equal(2);
        expect(dict.get(1)).to.be.equal(2);
        expect(dict.get(2)).to.be.equal(4);
    });

    it('single test', () => {
        const dict = Dictionary.single(1, 2);

        expect(dict.size).to.be.equal(1);
        expect(dict.single()).to.be.deep.equal(Pair.from(1, 2));
    });
});
