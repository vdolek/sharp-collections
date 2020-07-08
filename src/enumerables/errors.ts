export class Errors {
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
}