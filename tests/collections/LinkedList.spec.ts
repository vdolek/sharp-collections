import { expect } from 'chai';

import { LinkedList } from '../../src/index';

describe('LinkedList tests', () => {
    it('read test', () => {
        const list = LinkedList.fromRest(2, 4, 6);

        expect(list.size).to.be.equal(3);
        expect(list.firstItem!.value).to.be.equal(2);
        expect(list.firstItem!.previous).to.be.undefined;
        expect(list.firstItem!.next!.value).to.be.equal(4);
        expect(list.firstItem!.next!.next!.value).to.be.equal(6);
        expect(list.firstItem!.next!.next).to.be.equal(list.lastItem);
        expect(list.lastItem!.value).to.be.equal(6);
        expect(list.lastItem!.next).to.be.undefined;
        expect(list.lastItem!.previous!.value).to.be.equal(4);
        expect(list.lastItem!.previous!.previous!.value).to.be.equal(2);
        expect(list.lastItem!.previous!.previous).to.be.equal(list.firstItem);
    });

    it('write test', () => {
        const list = LinkedList.fromRest(2, 4, 6);
        list.firstItem!.value = 2;
        list.addFirst(1);
        list.addLast(8);

        expect(list.size).to.be.equal(5);
        expect(list.firstItem!.value).to.be.equal(1);
        expect(list.firstItem!.previous).to.be.undefined;
        expect(list.firstItem!.next!.value).to.be.equal(2);
        expect(list.firstItem!.next!.next!.value).to.be.equal(4);
        expect(list.firstItem!.next!.next!.next!.value).to.be.equal(6);
        expect(list.firstItem!.next!.next!.next!.next!.value).to.be.equal(8);
        expect(list.firstItem!.next!.next!.next!.next).to.be.equal(list.lastItem);
        expect(list.lastItem!.value).to.be.equal(8);
        expect(list.lastItem!.next).to.be.undefined;
        expect(list.lastItem!.previous!.value).to.be.equal(6);
        expect(list.lastItem!.previous!.previous!.value).to.be.equal(4);
        expect(list.lastItem!.previous!.previous!.previous!.value).to.be.equal(2);
        expect(list.lastItem!.previous!.previous!.previous!.previous!.value).to.be.equal(1);
        expect(list.lastItem!.previous!.previous!.previous!.previous!).to.be.equal(list.firstItem);
    });

    it('empty test', () => {
        const list = LinkedList.empty();

        expect(list.size).to.be.equal(0);
        expect(list.firstItem).to.be.undefined;
        expect(list.lastItem).to.be.undefined;
    });

    it('enumerate test', () => {
        const list = LinkedList.fromRest(2, 4, 6);
        list.firstItem!.value = 2;
        list.addFirst(1);
        list.addLast(8);

        const array = list.toArray();
        const reverseArray = list.reverse().toArray();

        expect(array).to.be.deep.equal([1, 2, 4, 6, 8]);
        expect(reverseArray).to.be.deep.equal([8, 6, 4, 2, 1]);
    });
});
