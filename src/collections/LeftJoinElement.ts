export class LeftJoinElement<TLeft, TRight> {
    public constructor(
        public readonly left: TLeft,
        public readonly right: TRight | undefined
    ) {
    }
}
