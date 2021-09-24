import { Constructor } from '../helper/mixInHelper'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Base<T extends Constructor>(C: T) {
  
  abstract class Base extends C {
    constructor(...args: any[]) {
      super(...args)
    }
    // find user liquidity position
    abstract getUserAMMs(): Promise<any>
  }
  return Base;
}



