export class FullJoinElement<TLeft, TRight> {
    public constructor(
        public readonly left: TLeft | null,
        public readonly right: TRight | null
    ) {
    }
}
