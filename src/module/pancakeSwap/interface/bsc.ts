import { BigNumber } from "@ethersproject/bignumber";

export class FarmInfoDTO {
  readonly lpToken: string;
  readonly allocPoint: BigNumber;
  readonly lastRewardBlock: BigNumber;
  readonly accCakePerShare: BigNumber;
}

