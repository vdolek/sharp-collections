import { expect } from 'chai';

import { List } from '../../src/index';

describe('takeWhileEnumerable tests', () => {
    it('simple test', () => {
        const list = List.fromRest(2, 4, 6, 8, 10)
            .takeWhile(x => x < 5);

        expect(list.toArray()).to.be.deep.equal([2, 4]);
    });

    it('simple indexed test', () => {
        const list = List.fromRest(2, 4, 6, 8, 10)
            .takeWhile((x, idx) => idx < 3);

        expect(list.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('empty source test', () => {
        const list = List.empty<number>()
            .takeWhile(x => x < 5);

        expect(list.toArray()).to.be.empty;
    });

    it('empty result test', () => {
        const list = List.fromRest(2, 4, 6, 8, 10)
            .takeWhile(x => x > 10);

        expect(list.toArray()).to.be.empty;
    });
});
