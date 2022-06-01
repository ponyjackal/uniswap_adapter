import { expect } from "chai";

export default (): void => {
  it("LIQUIDITY", async function (): Promise<void> {
    const createPair = await this.instance.createPair(
      this.instanceTokenA.address,
      this.instanceTokenB.address
    );
    const { events } = await createPair.wait();

    const { args } = events.find((it: any) => it.event === "CreatePair");
    const [addressPair] = args;

    const pair = await this.instance.getPair(
      this.instanceTokenA.address,
      this.instanceTokenB.address
    );

    expect(pair).to.eq(addressPair);

    const addLiquidity = await this.instance.addLiquidity(
      this.instanceTokenA.address,
      this.instanceTokenB.address,
      BigInt(this.amount),
      BigInt(this.amount)
    );

    const { events: addLiquidityEvents } = await addLiquidity.wait();

    const { args: args2 } = addLiquidityEvents.find(
      (it: any) => it.event === "AddLiquidity"
    );
    const [amountA, amountB, liquidity] = args2;
    const result = [+amountA, +amountB, +liquidity];
    const expectResult = [this.amount, this.amount, 999999999999999000];

    expect(result).to.deep.eq(expectResult);

    const getLiquidity = await this.instance.getLiquidity(pair);

    expect(+getLiquidity).to.eq(+liquidity);

    const removeLiquidity = await this.instance.removeLiquidity(
      this.instanceTokenA.address,
      this.instanceTokenB.address
    );

    const { events: removeLiquidityEvents } = await removeLiquidity.wait();
    const { args: args3 } = removeLiquidityEvents.find(
      (it: any) => it.event === "RemoveLiquidity"
    );
    const [removeAmountA, removeAmountB] = args3;
    const removeResult = [+removeAmountA, +removeAmountB];
    const expectRemoveResult = [+liquidity, +liquidity];

    expect(removeResult).to.deep.eq(expectRemoveResult);

    const zeroLiquidity = await this.instance.getLiquidity(pair);

    expect(+zeroLiquidity).to.eq(0);
  });
};
