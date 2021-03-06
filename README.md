# Sharp Collections - TypeScript LINQ library
Sharp Collections is new and modern LINQ library for TypeScript (can
be used with JavaScript also). This is the library
that you want to use for collections in TypeScript. It implements
**all of .NET Linq methods and some more** (first, groupBy, groupJoin, orderBy, select,
singleOrDefault, join, where etc.).

[![github version](https://img.shields.io/github/package-json/v/vdolek/sharp-collections/master?label=github)](https://github.com/vdolek/sharp-collections)
[![npm version](https://img.shields.io/npm/v/sharp-collections)](https://www.npmjs.com/package/sharp-collections)
[![build status](https://img.shields.io/github/workflow/status/vdolek/sharp-collections/CI/master)](https://github.com/vdolek/sharp-collections/actions?query=workflow%3ACI)
![dependencies](https://img.shields.io/david/vdolek/sharp-collections)
![dev dependencies](https://img.shields.io/david/dev/vdolek/sharp-collections)
[![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/vdolek/sharp-collections)](https://snyk.io/test/github/vdolek/sharp-collections)

<!---[![downloads](https://img.shields.io/npm/dt/sharp-collections)](https://www.npmjs.com/package/sharp-collections)--->

## Features

- All .NET LINQ methods available and some more
- Deferred (lazy) execution
- Dictionary and HashSet with EqualityComparer support (same as in .NET)
- Intellisense friendly
- Implemented using generators and iterators
- ForOf cycle compatible
- Supports ES5 targeting

## Playground

[CodeSandbox playground](https://codesandbox.io/s/sharp-collections-playground-ys45x?file=/src/app/app.component.ts)

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
];

const enumerable = Enumerable.from(data); // or List.from(data)

const adults = enumerable.where(x => x.age >= 18);
const adultsGroupedBySex = adults.groupBy(x => x.sex); // nothing is executed so far

// use any collection (Enumerable, List, Dictionary, ...) in ForOf cycle
for (const group of adultsGroupedBySex) {
  console.debug(`Sex: ${group.key}, count: ${group.count()}`);
}

// converts Enumerable to List
const adultsGroupedBySexList = adultsGroupedBySex.toList(); // or toReadOnlyList()

// converts Enumerable to JS Array
const adultsGroupedBySexArray = adultsGroupedBySex.toArray();
```

## Collections

| Collection   | Read-Only alternative   | Description                                                                 |
|--------------|-------------------------|-----------------------------------------------------------------------------|
| `Enumerable` | -                       | Represents a collection which supports a simple iteration.                  |
| `List`       | `ReadOnlyList`          | Represents a list of objects that can be accessed by index.                 |
| `Dictionary` | `ReadOnlyDictionary`    | Represents a collection of keys and values. Values can be accessed by keys. |
| `HashSet`    | `ReadOnlyHashSet`       | Represents a set of values.                                                 |
| `LinkedList` | -                       | Represents a linked list of objects.                                        |
| `Stack`      | -                       | Represents a stack of objects.                                              |
| `Queue`      | -                       | Represents a queue of objects.                                              |

<p align="center">
  <img src="https://yuml.me/vdolek/sharp-collections.svg">
</p>

## Implemented Linq methods

| Method                | Description |
|-----------------------|-------------|
| `aggregate`           | Applies an accumulator function over a sequence. |
| `all`                 | Determines whether all elements of a sequence satisfy a condition. |
| `any`                 | Determines whether a sequence contains any elements. |
| `append`              | Appends a value to the end of the sequence. |
| `asEnumerable`        | Returns the sequence typed as an `Enumerable`. |
| `asIndexed`           | Returns indexed sequence. |
| `average`             | Computes the average of a sequence that are obtained by invoking a transform function on each element of the input sequence. |
| `cast`                | Casts the elements to the specified type. |
| `concat`              | Concatenates two sequences. |
| `contains`            | Determines whether a sequence contains a specified element by using an equality comparer. |
| `count`               | Returns a number that represents how many elements in the specified sequence satisfy a condition. |
| `distinct`            | Returns distinct elements from a sequence. |
| `distinctBy`          | Returns distinct elements from a sequence by using key selector to compare values. |
| `elementAt`           | Returns the element at a specified index in a sequence. |
| `elementAtOrDefault`  | Returns the element at a specified index in a sequence or a default value if the index is out of range. |
| `elementsAt`          | Returns elements at a specified indexes in a sequence. |
| `elementsAtRest`      | Returns elements at a specified indexes in a rest sequence. |
| `except`              | Produces the set difference of two sequences. |
| `first`               | Returns the first element of a sequence. |
| `firstOrDefault`      | Returns the first element of a sequence, or undefined if the sequence contains no elements. |
| `fullJoin`            | Performs a full outer join on two homogeneous sequences. |
| `groupBy`             | Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. |
| `groupJoin`           | Correlates the elements of two sequences based on equality of keys and groups the results. |
| `intersect`           | Produces the set intersection of two sequences. |
| `isEmpty`             | Determines whether the sequence is empty. |
| `join`                | Correlates the elements of two sequences based on matching keys. |
| `last`                | Returns the last element of a sequence that satisfies a specified condition. |
| `lastOrDefault`       | Returns the last element of a sequence that satisfies a condition or undefined if no such element is found. |
| `leftGroupJoin`       | Correlates the elements of two sequences based on equality of keys and groups the results. |
| `leftJoin`            | Performs a left outer join on two homogeneous sequences. |
| `max`                 | Invokes a transform function on each element of a sequence and returns the maximum value. |
| `maxBy`               | Returns the maximal elements of the given sequence, based on the given projection. |
| `min`                 | Invokes a transform function on each element of a sequence and returns the minimum value. |
| `minBy`               | Returns the minimal elements of the given sequence, based on the given projection. |
| `no`                  | Determines whether no elements of a sequence satisfy a condition. |
| `ofType`              | Filters the elements based on a specified type. |
| `orderBy`             | Sorts the elements of a sequence according to a key. |
| `orderByDescending`   | Sorts the elements of a sequence in descending order according to a key. |
| `prepend`             | Adds a value to the beginning of the sequence. |
| `reverse`             | Inverts the order of the elements in a sequence. |
| `rightJoin`           | Performs a right outer join on two homogeneous sequences. |
| `select`              | Projects each element of a sequence into a new form. |
| `selectMany`          | Projects each element of a sequence and flattens the resulting sequences into one sequence. |
| `sequenceEqual`       | Determines whether two sequences are equal by comparing the elements. |
| `single`              | Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists. |
| `singleOrDefault`     | Returns the only element of a sequence that satisfies a specified condition or undefined if no such element exists; this method throws an exception if more than one element satisfies the condition. |
| `skip`                | Bypasses a specified number of elements in a sequence and then returns the remaining elements. |
| `skipWhile`           | Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements. |
| `slice`               | Returns subsequence of a sequence. |
| `sum`                 | Computes the sum of the sequence that are obtained by invoking a transform function on each element of the input sequence. |
| `take`                | Returns a specified number of contiguous elements from the start of a sequence. |
| `takeWhile`           | Returns elements from a sequence as long as a specified condition is true. |
| `thenBy`              | Performs a subsequent ordering of the elements in a sequence according to a key. |
| `thenByDescending`    | Performs a subsequent ordering of the elements in a sequence in descending order according to a key. |
| `toArray`             | Converts sequence to an `Array`. |
| `toReadOnlyDictionary`| Converts sequence to a `ReadOnlyDictionary`. |
| `toDictionary`        | Converts sequence to a `Dictionary`. |
| `toHashSet`           | Converts sequence to a `HashSet`. |
| `toLinkedList`        | Converts sequence to a `LinkedList`. |
| `toList`              | Converts sequence to a `List`. |
| `toLookup`            | Converts sequence to a `Lookup`. |
| `toMap`               | Converts sequence to a `Map`. |
| `toReadOnlyHashSet`   | Converts sequence to a `ReadOnlyHashSet`. |
| `toReadOnlyList`      | Converts sequence to a `ReadOnlyList`. |
| `toReadOnlyMap`       | Converts sequence to a `ReadOnlyMap`. |
| `toReadOnlySet`       | Converts sequence to a `ReadOnlySet`. |
| `toSet`               | Converts sequence to a `Set`. |
| `union`               | Produces the set union of two sequences. |
| `where`               | Filters a sequence of values based on a predicate.  |
| `zip`                 | Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results. |

## License

MIT © [Martin Volek](mailto:martin@vdolek.cz)
