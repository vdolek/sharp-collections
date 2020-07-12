export class Errors {
    public static argumentOutOfRange(): Error {
        return new Error('Argument was out of range');
    }

    public static indexOutOfRange(): Error {
        return new Error('Index was out of range');
    }

    public static itemWithKeyAlreadyAdded(): Error {
        return new Error('An item with the same key has already been added');
    }

    public static keyNotInDictionary(): Error {
        return new Error('The given key was not present in the dictionary');
    }

    public static noElements(): Error {
        return new Error('Sequence contains no elements');
    }

    public static noMatch(): Error {
        return new Error('Sequence contains no matching element');
    }

    public static moreThanOneMatch(): Error {
        return new Error('Sequence contains more than one element');
    }

    public static moreThanOneElement(): Error {
        return new Error('Sequence contains more than one matching element');
    }

    public static valueIsNotNumber(): Error {
        return new TypeError('Value is not a number');
    }
}
