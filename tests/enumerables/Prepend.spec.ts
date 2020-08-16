import { Enumerable } from '../../src/internal';
import { expect } from 'chai';

describe('prepend tests', () => {
    it('simple test', () => {
        const list = Enumerable.fromElements(2, 4, 6);
        const appended = list.prepend(99).toArray();

        expect(appended).to.be.deep.equal([99, 2, 4, 6]);
    });
});
