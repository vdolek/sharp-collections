export class Errors {
    public static indexOutOfRange(): Error {
        return new Error('Index was out of range');
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

    public static valueIsNotNumber(value: unknown): Error {
        return new Error(`Value ${value} is not a number`);
    }
}
