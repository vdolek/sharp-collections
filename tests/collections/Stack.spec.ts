import { expect } from 'chai';

import { Stack } from '../../src/index';

describe('LinkedList tests', () => {
    it('read test', () => {
        const stack = Stack.fromRest(2, 4);
        stack.push(6);

        expect(stack.size).to.be.equal(3);
        expect(stack.peek()).to.be.equal(6);
        expect(stack.size).to.be.equal(3);

        expect(stack.pop()).to.be.equal(6);
        expect(stack.size).to.be.equal(2);

        expect(stack.peek()).to.be.equal(4);
        expect(stack.size).to.be.equal(2);

        expect(stack.pop()).to.be.equal(4);
        expect(stack.size).to.be.equal(1);

        expect(stack.pop()).to.be.equal(2);
        expect(stack.size).to.be.equal(0);
    });

    it('empty test', () => {
        const stack = Stack.fromRest(1);
        stack.pop();

        expect(() => stack.peek()).throws(Error, 'Stack is empty');
        expect(() => stack.pop()).throws(Error, 'Stack is empty');
    });

    it('enumerate test', () => {
        const stack = Stack.fromRest(2, 4, 6);

        const array = stack.toArray();
        const reverseArray = stack.reverse().toArray();

        expect(array).to.be.deep.equal([6, 4, 2]);
        expect(reverseArray).to.be.deep.equal([2, 4, 6]);
    });
});
