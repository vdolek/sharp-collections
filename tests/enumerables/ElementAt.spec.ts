import { expect } from 'chai';

import { List } from '../../src/internal';

describe('elementAt tests', () => {
    it('elementAt test', () => {
        const list = List.fromElements(2, 4, 6);

        expect(list.elementAt(0)).to.be.equal(2);
        expect(list.elementAt(1)).to.be.equal(4);
        expect(list.elementAt(2)).to.be.equal(6);

        expect(() => list.elementAt(-1)).to.throw('Index was out of range');
        expect(() => list.elementAt(3)).to.throw('Index was out of range');
    });

    it('elementAtOrNull test', () => {
        const list = List.fromElements(2, 4, 6);

        expect(list.elementAtOrNull(0)).to.be.equal(2);
        expect(list.elementAtOrNull(1)).to.be.equal(4);
        expect(list.elementAtOrNull(2)).to.be.equal(6);

        expect(list.elementAtOrNull(-1)).to.be.null;
        expect(list.elementAtOrNull(3)).to.be.null;
    });
});
