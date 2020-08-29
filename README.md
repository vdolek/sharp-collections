[![CI](https://github.com/vdolek/sharp-collections/workflows/CI/badge.svg)](https://github.com/vdolek/sharp-collections/actions?query=workflow%3ACI)
[![npm version](https://badge.fury.io/js/sharp-collections.svg)](https://www.npmjs.com/package/sharp-collections)

# sharp-collections
.NET Linq like collection library for TypeScript and JavaScript. This is the library that you want to use for collections in TypeScript. It implements **most of .NET Linq methods** (select, where, single, join etc.). **Lazy execution** supported.

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

const adultsGroupedBySexList = adultsGroupedBySex.toList(); // or toReadOnlyList()
```

## Collections

- `Enumerable`
- `List` (and `ReadOnlyList`)
- `Dictionary` (and `ReadOnlyDictionary`)
- `HashSet` (and `ReadOnlyHashSet`)

| Collection | Read Only alternative | Description                                                                 |
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
