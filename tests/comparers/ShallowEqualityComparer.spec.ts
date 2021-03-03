import { expect } from 'chai';

import { EqualityComparer } from '../../src/index';

describe('ShallowEqualityComparer tests', () => {
    it('simple test', () => {
        const obj1 = { name: 'martin', age: 20, address: { city: 'prague' } };
        const obj2 = { name: 'martin', age: 20, address: obj1.address };
        const obj3 = { name: 'martin', age: 20, address: { city: 'prague' } };
        const obj4 = { name: 'martin', age: 20, address: { city: 'brno' } };
        const obj5 = { name: 'martin', address: { city: 'brno' } };
        const obj6 = { name: 'martin', age: 20 };

        const comparer = EqualityComparer.shallow();

        expect(comparer.getHashCode(obj1)).to.be.equal(comparer.getHashCode(obj1));
        expect(comparer.getHashCode(obj1)).to.be.equal(comparer.getHashCode(obj2));
        expect(comparer.getHashCode(obj1)).to.be.not.equal(comparer.getHashCode(obj3));
        expect(comparer.getHashCode(obj1)).to.be.not.equal(comparer.getHashCode(obj4));
        expect(comparer.getHashCode(obj1)).to.be.not.equal(comparer.getHashCode(obj5));
        expect(comparer.getHashCode(obj1)).to.be.not.equal(comparer.getHashCode(obj6));

        expect(comparer.equals(obj1, obj1)).to.be.true;
        expect(comparer.equals(obj1, obj2)).to.be.true;
        expect(comparer.equals(obj1, obj3)).to.be.false;
        expect(comparer.equals(obj1, obj4)).to.be.false;
        expect(comparer.equals(obj1, obj5)).to.be.false;
        expect(comparer.equals(obj1, obj6)).to.be.false;
    });
});