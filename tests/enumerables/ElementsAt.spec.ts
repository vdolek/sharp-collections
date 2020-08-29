import { expect } from 'chai';

import { ElementsAtNotFoundBehavior, List } from '../../src/internal';

describe('elementsAt tests', () => {
    it('elementsAt test', () => {
        const list = List.fromElements(0, 2, 4, 6, 8, 10, 12);

        expect(list.elementsAt([]).toArray()).to.be.deep.equal([]);
        expect(list.elementsAt([1, 4, 3]).toArray()).to.be.deep.equal([2, 8, 6]);
        expect(() => list.elementsAt([1, 4, 99, 3]).toArray()).throws(Error, 'Index was out of range');
        expect(() => list.elementsAt([1, 4, -99, 3]).toArray()).throws(Error, 'Index was out of range');
    });

    it('returnUndefined test', () => {
        const list = List.fromElements(0, 2, 4, 6, 8, 10, 12);

        expect(list.elementsAt([], ElementsAtNotFoundBehavior.returnDefault).toArray()).to.be.deep.equal([]);
        expect(list.elementsAt([1, 4, 3], ElementsAtNotFoundBehavior.returnDefault).toArray()).to.be.deep.equal([2, 8, 6]);
        expect(list.elementsAt([1, 4, 99, 3], ElementsAtNotFoundBehavior.returnDefault).toArray()).to.be.deep.equal([2, 8, undefined, 6]);
        expect(list.elementsAt([1, 4, -99, 3], ElementsAtNotFoundBehavior.returnDefault).toArray()).to.be.deep.equal([2, 8, undefined, 6]);
    });

    it('returnUndefined test', () => {
        const list = List.fromElements(0, 2, 4, 6, 8, 10, 12);

        expect(list.elementsAt([], ElementsAtNotFoundBehavior.ignore).toArray()).to.be.deep.equal([]);
        expect(list.elementsAt([1, 4, 3], ElementsAtNotFoundBehavior.ignore).toArray()).to.be.deep.equal([2, 8, 6]);
        expect(list.elementsAt([1, 4, 99, 3], ElementsAtNotFoundBehavior.ignore).toArray()).to.be.deep.equal([2, 8, 6]);
        expect(list.elementsAt([1, 4, -99, 3], ElementsAtNotFoundBehavior.ignore).toArray()).to.be.deep.equal([2, 8, 6]);
    });
});
