/**
 * Base error class for all collection-related errors
 */
export class CollectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CollectionError';
        Object.setPrototypeOf(this, CollectionError.prototype);
    }
}

/**
 * Thrown when an argument is out of range
 */
export class ArgumentOutOfRangeError extends CollectionError {
    constructor(paramName?: string) {
        super(`Argument${paramName ? ` '${paramName}'` : ''} was out of range`);
        this.name = 'ArgumentOutOfRangeError';
    }
}

/**
 * Thrown when an index is out of range
 */
export class IndexOutOfRangeError extends CollectionError {
    constructor() {
        super('Index was out of range');
        this.name = 'IndexOutOfRangeError';
    }
}

/**
 * Thrown when an index is not an integer
 */
export class IndexNotIntegerError extends CollectionError {
    constructor() {
        super('Index was not an integer');
        this.name = 'IndexNotIntegerError';
    }
}

/**
 * Thrown when an item with the same key has already been added
 */
export class DuplicateKeyError extends CollectionError {
    constructor() {
        super('An item with the same key has already been added');
        this.name = 'DuplicateKeyError';
    }
}

/**
 * Thrown when an element has already been added to a set
 */
export class DuplicateElementError extends CollectionError {
    constructor() {
        super('The element has already been added');
        this.name = 'DuplicateElementError';
    }
}

/**
 * Thrown when a key is not found in dictionary
 */
export class KeyNotFoundError extends CollectionError {
    constructor() {
        super('The given key was not present in the dictionary');
        this.name = 'KeyNotFoundError';
    }
}

/**
 * Thrown when a linked list is empty
 */
export class LinkedListEmptyError extends CollectionError {
    constructor() {
        super('LinkedList is empty');
        this.name = 'LinkedListEmptyError';
    }
}

/**
 * Thrown when a sequence contains no elements
 */
export class NoElementsError extends CollectionError {
    constructor() {
        super('Sequence contains no elements');
        this.name = 'NoElementsError';
    }
}

/**
 * Thrown when no element matches the condition
 */
export class NoMatchError extends CollectionError {
    constructor() {
        super('Sequence contains no matching element');
        this.name = 'NoMatchError';
    }
}

/**
 * Thrown when more than one element matches
 */
export class MoreThanOneMatchError extends CollectionError {
    constructor() {
        super('Sequence contains more than one element');
        this.name = 'MoreThanOneMatchError';
    }
}

/**
 * Thrown when more than one element exists
 */
export class MoreThanOneElementError extends CollectionError {
    constructor() {
        super('Sequence contains more than one matching element');
        this.name = 'MoreThanOneElementError';
    }
}

/**
 * Thrown when stack is empty
 */
export class StackEmptyError extends CollectionError {
    constructor() {
        super('Stack is empty');
        this.name = 'StackEmptyError';
    }
}

/**
 * Thrown when queue is empty
 */
export class QueueEmptyError extends CollectionError {
    constructor() {
        super('Queue is empty');
        this.name = 'QueueEmptyError';
    }
}

/**
 * Thrown for unexpected errors
 */
export class UnexpectedError extends CollectionError {
    constructor() {
        super('Unexpected error');
        this.name = 'UnexpectedError';
    }
}

/**
 * Thrown when a value is not a number
 * Note: Extends TypeError instead of CollectionError for backward compatibility
 * with the original implementation that used new TypeError()
 */
export class ValueNotNumberError extends TypeError {
    constructor() {
        super('Value is not a number');
        this.name = 'ValueNotNumberError';
    }
}

/**
 * Thrown when a value is not found in linked list
 */
export class ValueNotFoundError extends CollectionError {
    constructor() {
        super('The value is not present in LinkedList');
        this.name = 'ValueNotFoundError';
    }
}

/**
 * Legacy Errors class for backward compatibility
 * @deprecated Use specific error classes instead
 */
export class Errors {
    public static argumentOutOfRange(): Error {
        return new ArgumentOutOfRangeError();
    }

    public static indexOutOfRange(): Error {
        return new IndexOutOfRangeError();
    }

    public static indexNotInteger(): Error {
        return new IndexNotIntegerError();
    }

    public static itemWithKeyAlreadyAdded(): Error {
        return new DuplicateKeyError();
    }

    public static elementAlreadyAdded(): Error {
        return new DuplicateElementError();
    }

    public static keyNotInDictionary(): Error {
        return new KeyNotFoundError();
    }

    public static linkedListEmpty(): Error {
        return new LinkedListEmptyError();
    }

    public static noElements(): Error {
        return new NoElementsError();
    }

    public static noMatch(): Error {
        return new NoMatchError();
    }

    public static moreThanOneMatch(): Error {
        return new MoreThanOneMatchError();
    }

    public static moreThanOneElement(): Error {
        return new MoreThanOneElementError();
    }

    public static stackEmpty(): Error {
        return new StackEmptyError();
    }

    public static queueEmpty(): Error {
        return new QueueEmptyError();
    }

    public static unexpectedError(): Error {
        return new UnexpectedError();
    }

    public static valueIsNotNumber(): Error {
        return new ValueNotNumberError();
    }

    public static valueNotFoundLinkedList(): Error {
        return new ValueNotFoundError();
    }
}
