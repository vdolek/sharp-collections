/* tslint:disable:max-classes-per-file */
import { List } from '@src/Internal';
import { expect } from 'chai';

class Base { public constructor(public readonly value: number) { }}
class FooA extends Base { }
class FooB extends FooA { }
class Bar extends Base { }

describe('ofType tests', () => {
    it('simple test', () => {
        const list = List.fromElements(new FooA(1), new FooB(2), new Bar(3), new FooB(4))
            .ofType(FooA);

        expect(list.toArray()).to.be.deep.equal([new FooA(1), new FooB(2), new FooB(4)]);
    });
});
