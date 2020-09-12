import { expect } from 'chai';

import { List } from '../../src/index';

describe('toLookup tests', () => {
    it('simple test', () => {
        const list = List.fromRest('Hello', 'Hi', 'Good morning', 'Bye', 'Good evening');
        const lookup = list.toLookup(x => x[0]);

        expect(lookup.count()).to.be.equal(3);
        expect(lookup.get('H').toArray()).to.be.deep.equal(['Hello', 'Hi']);
        expect(lookup.get('G').toArray()).to.be.deep.equal(['Good morning', 'Good evening']);
        expect(lookup.get('B').toArray()).to.be.deep.equal(['Bye']);
        expect(() => lookup.get('dummy')).throws(Error, 'The given key was not present in the dictionary');
        expect(lookup.getOrDefault('dummy')).to.be.undefined;
    });

    it('valueSelector test', () => {
        const list = List.fromRest('Hello', 'Hi', 'Good morning', 'Bye', 'Good evening');
        const lookup = list.toLookup(x => x[0], x => `${x}XXX`);

        expect(lookup.count()).to.be.equal(3);
        expect(lookup.get('H').toArray()).to.be.deep.equal(['HelloXXX', 'HiXXX']);
        expect(lookup.get('G').toArray()).to.be.deep.equal(['Good morningXXX', 'Good eveningXXX']);
        expect(lookup.get('B').toArray()).to.be.deep.equal(['ByeXXX']);
        expect(() => lookup.get('dummy')).throws(Error, 'The given key was not present in the dictionary');
        expect(lookup.getOrDefault('dummy')).to.be.undefined;
    });
});
