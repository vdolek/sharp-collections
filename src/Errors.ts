export class Errors {
    public static argumentOutOfRange(): Error {
        return new Error('Argument was out of range');
    }

    public static indexOutOfRange(): Error {
        return new Error('Index was out of range');
    }

    public static indexNotInteger(): Error {
        return new Error('Index was not an integer');
    }

    public static itemWithKeyAlreadyAdded(): Error {
        return new Error('An item with the same key has already been added');
    }

    public static elementAlreadyAdded(): Error {
        return new Error('The element has already been added');
    }

    public static keyNotInDictionary(): Error {
        return new Error('The given key was not present in the dictionary');
    }

    public static linkedListEmpty(): Error {
        return new Error('LinkedList is empty');
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

    public static stackEmpty(): Error {
        return new Error('Stack is empty');
    }

    public static queueEmpty(): Error {
        return new Error('Queue is empty');
    }

    public static unexpectedError(): Error {
        return new Error('Unexpected error');
    }

    public static valueIsNotNumber(): Error {
        return new TypeError('Value is not a number');
    }

    public static valueNotFoundLinkedList(): Error {
        return new Error('The value is not present in LinkedList');
    }
}
