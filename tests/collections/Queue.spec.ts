import { expect } from 'chai';

import { Queue } from '../../src/index';

describe('LinkedList tests', () => {
    it('read test', () => {
        const stack = Queue.fromRest(2, 4);
        stack.enqueue(6);

        expect(stack.size).to.be.equal(3);
        expect(stack.peek()).to.be.equal(2);
        expect(stack.size).to.be.equal(3);

        expect(stack.dequeue()).to.be.equal(2);
        expect(stack.size).to.be.equal(2);

        expect(stack.peek()).to.be.equal(4);
        expect(stack.size).to.be.equal(2);

        expect(stack.dequeue()).to.be.equal(4);
        expect(stack.size).to.be.equal(1);

        expect(stack.dequeue()).to.be.equal(6);
        expect(stack.size).to.be.equal(0);
    });

    it('empty test', () => {
        const stack = Queue.fromRest(1);
        stack.dequeue();

        expect(() => stack.peek()).throws(Error, 'Queue is empty');
        expect(() => stack.dequeue()).throws(Error, 'Queue is empty');
    });

    it('enumerate test', () => {
        const stack = Queue.fromRest(2, 4, 6);

        const array = stack.toArray();
        const reverseArray = stack.reverse().toArray();

        expect(array).to.be.deep.equal([2, 4, 6]);
        expect(reverseArray).to.be.deep.equal([6, 4, 2]);
    });
});
