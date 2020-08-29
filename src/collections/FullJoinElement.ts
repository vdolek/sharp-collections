export class FullJoinElement<TLeft, TRight> {
    public constructor(
        public readonly left: TLeft | undefined,
        public readonly right: TRight | undefined
    ) {
    }
}
