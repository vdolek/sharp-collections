import { expect } from 'chai';

import { Dictionary, Pair } from '../../src/internal';

describe('Dictionary tests', () => {
    it('get test', () => {
        const dict = Dictionary.fromElements(Pair.from('a1', 1), Pair.from('a2', 2));
        dict.add('a3', 3);
        dict.set('a2', 22);

        expect(dict.count()).to.be.equal(3);
        expect(dict.get('a1')).to.be.equal(1);
        expect(dict.get('a2')).to.be.equal(22);
        expect(dict.get('a3')).to.be.equal(3);
        expect(() => dict.get('dummy')).throws('The given key was not present in the dictionary');
        expect(dict.getOrNull('dummy')).to.be.null;
    });

    it('add test', () => {
        const dict = Dictionary.fromElements(Pair.from('a1', 1), Pair.from('a2', 2));

        expect(() => dict.add('a1', 11)).throws('An item with the same key has already been added');
    });

    it('remove test', () => {
        const dict = Dictionary.fromElements(Pair.from('a1', 1), Pair.from('a2', 2));
        dict.add('a3', 3);
        dict.remove('a2');

        expect(dict.count()).to.be.equal(2);
        expect(dict.get('a1')).to.be.equal(1);
        expect(dict.get('a3')).to.be.equal(3);
        expect(() => dict.get('a2')).throws('The given key was not present in the dictionary');
        expect(dict.getOrNull('a2')).to.be.null;
    });

    it('clear test', () => {
        const dict = Dictionary.fromElements(Pair.from('a1', 1), Pair.from('a2', 2));
        dict.add('a3', 3);
        dict.clear();

        expect(dict.count()).to.be.equal(0);
        expect(dict.getOrNull('a1')).to.null;
        expect(dict.getOrNull('a2')).to.null;
        expect(dict.getOrNull('a3')).to.null;
    });

    it('keys test', () => {
        const dict = Dictionary.fromElements(Pair.from('a1', 1), Pair.from('a2', 2));
        const keys = dict.keys().toArray();

        expect(keys).to.have.length(2);
        expect(keys).to.have.members(['a1', 'a2']);
    });

    it('values test', () => {
        const dict = Dictionary.fromElements(Pair.from('a1', 1), Pair.from('a2', 2));
        const values = dict.values().toArray();

        expect(values).to.have.length(2);
        expect(values).to.have.members([1, 2]);
    });
});
