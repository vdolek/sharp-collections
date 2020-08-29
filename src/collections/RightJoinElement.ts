export class RightJoinElement<TLeft, TRight> {
    public constructor(
        public readonly left: TLeft | undefined,
        public readonly right: TRight
    ) {
    }
}
