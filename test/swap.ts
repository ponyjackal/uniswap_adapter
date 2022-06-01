import { expect } from "chai";

export default (): void => {
  it("SWAP", async function (): Promise<void> {
    await this.instance.createPair(
      this.instanceTokenA.address,
      this.instanceTokenB.address
    );

    const addLiquidity = await this.instance.addLiquidity(
      this.instanceTokenA.address,
      this.instanceTokenB.address,
      BigInt(this.amount),
      BigInt(this.amount)
    );

    await addLiquidity.wait();

    const balanceA = await this.instanceTokenA.balanceOf(this.owner.address);
    const balanceB = await this.instanceTokenB.balanceOf(this.owner.address);

    const swap = await this.instance.swap(
      this.instanceTokenA.address,
      this.instanceTokenB.address,
      this.swapAmount
    );

    const { events } = await swap.wait();

    const { args } = events.find((it: any) => it.event === "Swap");
    const [address, amounts] = args;

    const balanceAfterSwapA = await this.instanceTokenA.balanceOf(
      this.owner.address
    );
    const balanceAfterSwapB = await this.instanceTokenB.balanceOf(
      this.owner.address
    );

    expect(this.owner.address).to.eq(address);
    expect(BigInt(balanceAfterSwapA)).to.eq(
      BigInt(balanceA) - BigInt(amounts[0])
    );
    expect(BigInt(balanceAfterSwapB)).to.eq(
      BigInt(balanceB) + BigInt(amounts[1])
    );
  });
  it("SWAP-REVERT", async function (): Promise<void> {
    await expect(
      this.instance.swap(
        this.instanceTokenA.address,
        this.instanceTokenB.address,
        this.swapAmount
      )
    ).to.be.revertedWith("No pair");
  });
};
