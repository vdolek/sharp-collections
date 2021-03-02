import { expect } from 'chai';

import { EqualityComparer, Queue } from '../../src/index';

describe('DeepEqualityComparer tests', () => {
    it('simple test', () => {
        const comparer = EqualityComparer.deep();
        const obj1 = { name: 'martin', age: 20 };
        const obj2 = { name: 'martin', age: 20 };
        const obj3 = { name: 'peter', age: 20 };
        const obj4 = { name: 'peter' };

        expect(comparer.getHashCode(obj1)).to.be.equal(comparer.getHashCode(obj1));
        expect(comparer.getHashCode(obj1)).to.be.equal(comparer.getHashCode(obj2));
        expect(comparer.getHashCode(obj1)).to.be.not.equal(comparer.getHashCode(obj3));
        expect(comparer.getHashCode(obj1)).to.be.not.equal(comparer.getHashCode(obj4));
        expect(comparer.getHashCode(obj3)).to.be.not.equal(comparer.getHashCode(obj4));

        expect(comparer.equals(obj1, obj1)).to.be.true;
        expect(comparer.equals(obj1, obj2)).to.be.true;
        expect(comparer.equals(obj1, obj3)).to.be.false;
        expect(comparer.equals(obj1, obj4)).to.be.false;
        expect(comparer.equals(obj3, obj4)).to.be.false;
        expect(comparer.equals(obj4, obj3)).to.be.false;
    });
});
