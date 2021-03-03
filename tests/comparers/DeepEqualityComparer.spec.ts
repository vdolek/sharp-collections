import { expect } from 'chai';

import { EqualityComparer } from '../../src/index';

describe('DeepEqualityComparer tests', () => {
    it('simple test', () => {
        const comparer = EqualityComparer.deep();

        expect(comparer.getHashCode('AAA')).to.be.equal(comparer.getHashCode('AAA'));
        expect(comparer.getHashCode('AAA')).to.be.not.equal(comparer.getHashCode('BBB'));

        expect(comparer.equals('AAA', 'AAA')).to.be.true;
        expect(comparer.equals('AAA', 'BBB')).to.be.false;
    });

    it('object test', () => {
        const obj1 = { name: 'martin', age: 20, address: { city: 'prague' } };
        const obj2 = { name: 'martin', age: 20, address: obj1.address };
        const obj3 = { age: 20, address: obj1.address, name: 'martin' };
        const obj4 = { name: 'martin', age: 20, address: { city: 'prague' } };
        const obj5 = { name: 'martin', age: 20, address: { city: 'brno' } };
        const obj6 = { name: 'martin', address: { city: 'brno' } };
        const obj7 = { name: 'martin', age: 20 };

        const comparer = EqualityComparer.deep();

        expect(comparer.getHashCode(obj1)).to.be.equal(comparer.getHashCode(obj1));
        expect(comparer.getHashCode(obj1)).to.be.equal(comparer.getHashCode(obj2));
        expect(comparer.getHashCode(obj1)).to.be.equal(comparer.getHashCode(obj3));
        expect(comparer.getHashCode(obj1)).to.be.equal(comparer.getHashCode(obj4));
        expect(comparer.getHashCode(obj1)).to.be.not.equal(comparer.getHashCode(obj5));
        expect(comparer.getHashCode(obj1)).to.be.not.equal(comparer.getHashCode(obj6));
        expect(comparer.getHashCode(obj1)).to.be.not.equal(comparer.getHashCode(obj7));

        expect(comparer.equals(obj1, obj1)).to.be.true;
        expect(comparer.equals(obj1, obj2)).to.be.true;
        expect(comparer.equals(obj1, obj3)).to.be.true;
        expect(comparer.equals(obj1, obj4)).to.be.true;
        expect(comparer.equals(obj1, obj5)).to.be.false;
        expect(comparer.equals(obj1, obj6)).to.be.false;
        expect(comparer.equals(obj1, obj7)).to.be.false;
    });

    it('function test', () => {
        const obj1 = { func: () => 1 };
        const obj2 = { func: obj1.func };
        const obj3 = { func: () => 1 };
        const obj4 = { func: () => 4 };

        const comparer = EqualityComparer.deep();

        expect(comparer.getHashCode(obj1)).to.be.equal(comparer.getHashCode(obj1));
        expect(comparer.getHashCode(obj1)).to.be.equal(comparer.getHashCode(obj2));
        // expect(comparer.getHashCode(obj1)).to.be.not.equal(comparer.getHashCode(obj3));
        // expect(comparer.getHashCode(obj1)).to.be.not.equal(comparer.getHashCode(obj4));

        expect(comparer.equals(obj1, obj1)).to.be.true;
        expect(comparer.equals(obj1, obj2)).to.be.true;
        expect(comparer.equals(obj1, obj3)).to.be.false;
        expect(comparer.equals(obj1, obj4)).to.be.false;
    });

    it('undefined test', () => {
        const obj1 = { a: undefined };
        const obj2 = { a: undefined };

        const comparer = EqualityComparer.deep();

        expect(comparer.getHashCode(obj1)).to.be.equal(comparer.getHashCode(obj1));
        expect(comparer.getHashCode(obj1)).to.be.equal(comparer.getHashCode(obj2));

        expect(comparer.equals(obj1, obj1)).to.be.true;
        expect(comparer.equals(obj1, obj2)).to.be.true;
    });
});
