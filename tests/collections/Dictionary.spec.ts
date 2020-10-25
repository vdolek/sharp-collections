/* tslint:disable:no-invalid-template-strings */
import { expect } from 'chai';
import { itParam } from 'mocha-param';

import { Errors } from '../../src/Errors';
import { Dictionary, Enumerable, EqualityComparer } from '../../src/index';

enum DictionaryType {
    Simple,
    Selector,
    Comparer
}

const allDictionaryTypes = [DictionaryType.Simple, DictionaryType.Selector, DictionaryType.Comparer];

describe('Dictionary tests', () => {
    itParam('get test (with equality comparer: ${value})', allDictionaryTypes, (dictionaryType: DictionaryType) => {
        const dict = getDictionary(dictionaryType);
        dict.add('a3', 3);
        dict.set('a2', 22);

        expect(dict.size).to.be.equal(3);
        expect(dict.count()).to.be.equal(3);
        expect(dict.get('a1')).to.be.equal(1);
        expect(dict.get('a2')).to.be.equal(22);
        expect(dict.get('a3')).to.be.equal(3);
        expect(() => dict.get('dummy')).throws('The given key was not present in the dictionary');
        expect(dict.getOrDefault('dummy')).to.be.undefined;
    });

    itParam('add test (with equality comparer: ${value})', allDictionaryTypes, (dictionaryType: DictionaryType) => {
        const dict = getDictionary(dictionaryType);
        dict.add('a3', 3);
        dict.set('a2', 22);

        expect(() => dict.add('a1', 11)).throws('An item with the same key has already been added');
    });

    itParam('remove test (with equality comparer: ${value})', allDictionaryTypes, (dictionaryType: DictionaryType) => {
        const dict = getDictionary(dictionaryType);
        dict.add('a3', 3);
        dict.remove('a2');

        expect(dict.size).to.be.equal(2);
        expect(dict.count()).to.be.equal(2);
        expect(dict.get('a1')).to.be.equal(1);
        expect(dict.get('a3')).to.be.equal(3);
        expect(() => dict.get('a2')).throws('The given key was not present in the dictionary');
        expect(dict.getOrDefault('a2')).to.be.undefined;
    });

    itParam('clear test (with equality comparer: ${value})', allDictionaryTypes, (dictionaryType: DictionaryType) => {
        const dict = getDictionary(dictionaryType);
        dict.add('a3', 3);
        dict.clear();

        expect(dict.size).to.be.equal(0);
        expect(dict.count()).to.be.equal(0);
        expect(dict.getOrDefault('a1')).to.be.undefined;
        expect(dict.getOrDefault('a2')).to.be.undefined;
        expect(dict.getOrDefault('a3')).to.be.undefined;
    });

    itParam('size test (with equality comparer: ${value})', allDictionaryTypes, (dictionaryType: DictionaryType) => {
        const dict = getDictionary(dictionaryType);
        expect(dict.size).to.be.equal(2);
        expect(dict.count()).to.be.equal(2);

        dict.add('a3', 3);
        expect(dict.size).to.be.equal(3);
        expect(dict.count()).to.be.equal(3);

        dict.remove('a1');
        expect(dict.size).to.be.equal(2);
        expect(dict.count()).to.be.equal(2);
    });

    itParam('keys test (with equality comparer: ${value})', allDictionaryTypes, (dictionaryType: DictionaryType) => {
        const dict = getDictionary(dictionaryType);
        const keys = dict.keys().toArray();

        expect(keys).to.have.length(2);
        expect(keys).to.have.members(['a1', 'a2']);
    });

    itParam('values test (with equality comparer: ${value})', allDictionaryTypes, (dictionaryType: DictionaryType) => {
        const dict = getDictionary(dictionaryType);
        const values = dict.values().toArray();

        expect(values).to.have.length(2);
        expect(values).to.have.members([1, 2]);
    });

    itParam('object test (with equality comparer: ${value})', allDictionaryTypes, (dictionaryType: DictionaryType) => {
        const objects = Enumerable.range(0, 5)
            .select(x => new Foo(x))
            .toList();

        const dict = dictionaryType
            ? objects.toDictionary(x => x, y => y.id, EqualityComparer.getDefault())
            : objects.toDictionary(x => x, y => y.id);

        const second = objects.get(1);
        expect(dict.get(second)).to.be.equal(1);
        expect(dict.getOrDefault(new Foo(1))).to.be.undefined;
        expect(() => dict.get({ id: 1 })).throw('The given key was not present in the dictionary');

        second.id = 99;
        expect(dict.get(second)).to.be.equal(1);
    });

    it('object test (with selector equality comparer)', () => {
        const objects = Enumerable.range(0, 5)
            .select(x => new Foo(x))
            .toList();

        const dict = objects.toDictionary(x => x, y => y.id, EqualityComparer.fromSelector((x: Foo) => x.id));

        const second = objects.get(1);
        expect(dict.get(second)).to.be.equal(1);
        expect(dict.get(new Foo(1))).to.be.equal(1);
    });

    function getDictionary(hashSetType: DictionaryType): Dictionary<string, number> {
        let dict: Dictionary<string, number> | undefined;

        switch (hashSetType) {
            case DictionaryType.Simple: dict = new Dictionary<string, number>(); break;
            case DictionaryType.Selector: dict = new Dictionary<string, number>(EqualityComparer.fromSelector(x => x)); break;
            case DictionaryType.Comparer: dict = new Dictionary<string, number>(EqualityComparer.fromPredicate((x, y) => x === y)); break;
            default: throw Errors.unexpectedError();
        }

        dict.add('a1', 1);
        dict.add('a2', 2);

        return dict;
    }

    class Foo {
        public constructor(public id: number) { }
    }
});
