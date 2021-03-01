import { expect } from 'chai';

import { LinkedList } from '../../src/index';

describe('LinkedList tests', () => {
    it('read test', () => {
        const list = LinkedList.fromRest(2, 4, 6);

        expect(list.size).to.be.equal(3);
        expect(list.head!.value).to.be.equal(2);
        expect(list.head!.previous).to.be.undefined;
        expect(list.head!.next!.value).to.be.equal(4);
        expect(list.head!.next!.next!.value).to.be.equal(6);
        expect(list.head!.next!.next).to.be.equal(list.tail);
        expect(list.tail!.value).to.be.equal(6);
        expect(list.tail!.next).to.be.undefined;
        expect(list.tail!.previous!.value).to.be.equal(4);
        expect(list.tail!.previous!.previous!.value).to.be.equal(2);
        expect(list.tail!.previous!.previous).to.be.equal(list.head);
    });

    it('write test', () => {
        const list = LinkedList.fromRest(2, 4, 6);
        list.head!.value = 2;
        list.addHead(1);
        list.addTail(8);

        expect(list.size).to.be.equal(5);
        expect(list.head!.value).to.be.equal(1);
        expect(list.head!.previous).to.be.undefined;
        expect(list.head!.next!.value).to.be.equal(2);
        expect(list.head!.next!.next!.value).to.be.equal(4);
        expect(list.head!.next!.next!.next!.value).to.be.equal(6);
        expect(list.head!.next!.next!.next!.next!.value).to.be.equal(8);
        expect(list.head!.next!.next!.next!.next).to.be.equal(list.tail);
        expect(list.tail!.value).to.be.equal(8);
        expect(list.tail!.next).to.be.undefined;
        expect(list.tail!.previous!.value).to.be.equal(6);
        expect(list.tail!.previous!.previous!.value).to.be.equal(4);
        expect(list.tail!.previous!.previous!.previous!.value).to.be.equal(2);
        expect(list.tail!.previous!.previous!.previous!.previous!.value).to.be.equal(1);
        expect(list.tail!.previous!.previous!.previous!.previous!).to.be.equal(list.head);
    });

    it('remove test', () => {
        const list = LinkedList.fromRest(2, 4, 6);
        list.removeHead();
        list.addHead(1);
        list.addTail(8);
        list.removeTail();

        expect(list.size).to.be.equal(3);
        expect(list.head!.value).to.be.equal(1);
        expect(list.head!.previous).to.be.undefined;
        expect(list.head!.next!.value).to.be.equal(4);
        expect(list.head!.next!.next!.value).to.be.equal(6);
        expect(list.head!.next!.next).to.be.equal(list.tail);
        expect(list.tail!.value).to.be.equal(6);
        expect(list.tail!.next).to.be.undefined;
        expect(list.tail!.previous!.value).to.be.equal(4);
        expect(list.tail!.previous!.previous!.value).to.be.equal(1);
        expect(list.tail!.previous!.previous!!).to.be.equal(list.head);
    });

    it('empty test', () => {
        const list = LinkedList.empty();

        expect(list.size).to.be.equal(0);
        expect(list.head).to.be.undefined;
        expect(list.tail).to.be.undefined;
    });

    it('remove single test', () => {
        const list = LinkedList.fromRest(2, 4, 6, 8);
        list.removeTail();
        list.removeHead();
        list.removeTail();

        expect(list.size).to.be.equal(1);
        expect(list.head).to.be.equal(list.tail);
        expect(list.head!.value).to.be.equal(4);
    });

    it('remove empty test', () => {
        const list = LinkedList.fromRest(2, 4, 6);
        list.removeTail();
        list.removeHead();
        list.removeTail();

        expect(list.size).to.be.equal(0);
        expect(list.head).to.be.undefined;
        expect(list.tail).to.be.undefined;
    });

    it('enumerate test', () => {
        const list = LinkedList.fromRest(2, 4, 6);
        list.head!.value = 2;
        list.addHead(1);
        list.addTail(8);

        const array = list.toArray();
        const reverseArray = list.reverse().toArray();

        expect(array).to.be.deep.equal([1, 2, 4, 6, 8]);
        expect(reverseArray).to.be.deep.equal([8, 6, 4, 2, 1]);
    });

    it('items test', () => {
        const list = LinkedList.fromRest(2, 4);
        list.head!.value = 2;
        list.addTail(6);

        expect(list.items.toArray()).to.be.deep.equal([list.head, list.head!.next, list.tail]);
    });
});
