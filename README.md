[![CI](https://github.com/vdolek/sharp-collections/workflows/CI/badge.svg)](https://github.com/vdolek/sharp-collections/actions?query=workflow%3ACI)
[![npm version](https://badge.fury.io/js/sharp-collections.svg)](https://www.npmjs.com/package/sharp-collections)

# sharp-collections
.NET Linq like collection library for TypeScript and JavaScript. This is the library that you want to use for collections in TypeScript. It implements **most of .NET Linq methods** (select, where, single, join etc.).

## Features

- Lazy execution
- Implemented using ES6 generators and iterators
- ForOf compatible
- Supports ES5 targeting (with `es2015.iterable` and `es2015.collection` libraries)

## How to install

```
npm install sharp-collections
```

## Example

```typescript
import { Enumerable } from 'sharp-collections';

const data = [
  { name: 'Martin', sex: 'M', age: 28 },
  { name: 'Jane', sex: 'F', age: 27 },
  { name: 'Thomas', sex: 'M', age: 15 },
  { name: 'William', sex: 'M', age: 78 },
  { name: 'Kelly', sex: 'F', age: 30 },
]

const enumerable = Enumerable.from(data); // or List.from(data)

const adults = enumerable.where(x => x.age >= 18);
const adultsGroupedBySex = adults.groupBy(x => x.sex); // nothing is executed so far

// use any collection (Enumerable, List, ...) in ForOf cycle
for (const group of adultsGroupedBySex) {
  console.debug(`Sex: ${group.key}, count: ${group.count()}`);
}

// project Enumerable to List
const adultsGroupedBySexList = adultsGroupedBySex.toList(); // or toReadOnlyList()

// project Enumerable to JS Array
const adultsGroupedBySexArray = adultsGroupedBySex.toArray();
```

## Collections

| Collection | Read-Only alternative | Description                                                                 |
|------------|-----------------------|-----------------------------------------------------------------------------|
| Enumerable | -                     | Represents a collection which supports a simple iteration.                  |
| List       | ReadOnlyList          | Represents a list of objects that can be accessed by index.                 |
| Dictionary | ReadOnlyDictionary    | Represents a collection of keys and values. Values can be accessed by keys. |
| HashSet    | ReadOnlyHashSet       | Represents a set of values.                                                 |

## Implemented methods

- `append`
- `aggregate`
- `all`
- `any`
- `average`
- `cast`
- `concat`
- `contains`
- `count`
- `distinct`
- `distinctBy`
- `elementAt`
- `elementAtOrNull`
- `elementsAt`
- `except`
- `first`
- `firstOrNull`
- `fullJoin`
- `groupBy`
- `groupJoin`
- `intersect`
- `isEmpty`
- `join`
- `last`
- `lastOrNull`
- `leftGroupJoin`
- `leftJoin`
- `max`
- `maxBy`
- `min`
- `minBy`
- `no`
- `ofType`
- `orderBy`
- `orderByDescending`
- `prepend`
- `reverse`
- `rightJoin`
- `select`
- `selectMany`
- `sequenceEqual`
- `single`
- `singleOrNull`
- `skip`
- `skipWhile`
- `slice`
- `sum`
- `take`
- `takeWhile`
- `toArray`
- `toReadOnlyDictionary`
- `toDictionary`
- `toHashSet`
- `toList`
- `toLookup`
- `toMap`
- `toReadOnlyHashSet`
- `toReadOnlyList`
- `toReadOnlyMap`
- `toReadOnlySet`
- `toSet`
- `union`
- `where`
- `zip`
