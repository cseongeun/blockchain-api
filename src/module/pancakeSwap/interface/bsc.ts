import { BigNumber } from "@ethersproject/bignumber";

class FarmInfo {
  lpToken: string;
  allocPoint: BigNumber;
  lastRewardBlock: BigNumber;
  accCakePerShare: BigNumber;
}


export { FarmInfo }