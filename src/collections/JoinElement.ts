export class JoinElement<TLeft, TRight> {
    public constructor(
        public readonly left: TLeft,
        public readonly right: TRight
    ) {
    }
}
