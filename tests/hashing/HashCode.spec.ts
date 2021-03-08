import { expect } from 'chai';

import { HashCode } from '../../src/index';

describe('HashCode tests', () => {
    it('simple test', () => {
        expect(HashCode.getHashCode(false)).to.be.equal(HashCode.getHashCode(false));
        expect(HashCode.getHashCode(true)).to.be.equal(HashCode.getHashCode(true));
        expect(HashCode.getHashCode(false)).to.not.be.equal(HashCode.getHashCode(true));
        expect(HashCode.getHashCode(false)).to.not.be.equal(HashCode.getHashCode(0));
        expect(HashCode.getHashCode(true)).to.not.be.equal(HashCode.getHashCode(1));

        expect(HashCode.getHashCode(0)).to.be.equal(HashCode.getHashCode(0));
        expect(HashCode.getHashCode(1)).to.be.equal(HashCode.getHashCode(1));
        expect(HashCode.getHashCode(0)).to.not.be.equal(HashCode.getHashCode(1));
        expect(HashCode.getHashCode(146431586)).to.be.equal(HashCode.getHashCode(146431586));
        expect(HashCode.getHashCode(-146431586)).to.be.equal(HashCode.getHashCode(-146431586));
        expect(HashCode.getHashCode(146431586)).to.not.be.equal(HashCode.getHashCode(-146431586));
        expect(HashCode.getHashCode(5)).to.not.be.equal(HashCode.getHashCode('5'));

        expect(HashCode.getHashCode('')).to.be.equal(HashCode.getHashCode(''));
        expect(HashCode.getHashCode('hello')).to.be.equal(HashCode.getHashCode('hello'));
        expect(HashCode.getHashCode('hello world')).to.be.equal(HashCode.getHashCode('hello world'));
        expect(HashCode.getHashCode('hello')).to.not.be.equal(HashCode.getHashCode('hello world'));

        expect(HashCode.getHashCode(null)).to.be.equal(HashCode.getHashCode(null));
        expect(HashCode.getHashCode(null)).to.not.be.equal(HashCode.getHashCode(5));
        expect(HashCode.getHashCode(null)).to.not.be.equal(HashCode.getHashCode('null'));

        expect(HashCode.getHashCode(Symbol('aaa'))).to.be.equal(HashCode.getHashCode(Symbol('aaa')));
        expect(HashCode.getHashCode(Symbol('aaa'))).to.not.be.equal(HashCode.getHashCode(Symbol('bbb')));
        expect(HashCode.getHashCode(Symbol('aaa'))).to.not.be.equal(HashCode.getHashCode(Symbol('aaa').toString()));
    });

    it('object test', () => {
        const a = { id: 5 };
        const b = { id: 5 };
        const c = { id: 10 };

        expect(HashCode.getHashCode(a)).to.be.equal(HashCode.getHashCode(a));
        expect(HashCode.getHashCode(a)).to.not.be.equal(HashCode.getHashCode(b));
        expect(HashCode.getHashCode(a)).to.not.be.equal(HashCode.getHashCode(c));

        const hashCode = HashCode.getHashCode(a);
        a.id = 50;
        expect(hashCode).to.be.equal(HashCode.getHashCode(a));
    });

    it('combine test', () => {
        expect(HashCode.combineRest(1, 2)).to.be.equal(HashCode.combineRest(1, 2));
        expect(HashCode.combineRest(1, 2)).to.not.be.equal(HashCode.combineRest(2, 1));
    });
});
