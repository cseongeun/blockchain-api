import { div, toBigNumber } from './bignumberHelper';

const EXP_SCALE = toBigNumber(1e18);
const DOUBLE_SCALE = toBigNumber(1e36);
const HALF_EXP_SCALE = div(EXP_SCALE, 2);
const MANTISSA_ONE = EXP_SCALE;

export const truncate = (value: any) => {
  return div(value, EXP_SCALE);
};
