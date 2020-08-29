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

    it('elementAtOrDefault test', () => {
        const list = List.fromElements(2, 4, 6);

        expect(list.elementAtOrDefault(0)).to.be.equal(2);
        expect(list.elementAtOrDefault(1)).to.be.equal(4);
        expect(list.elementAtOrDefault(2)).to.be.equal(6);

        expect(list.elementAtOrDefault(-1)).to.be.undefined;
        expect(list.elementAtOrDefault(3)).to.be.undefined;
    });
});
