import { Constructor } from '../helper/mixInHelper'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Base<T extends Constructor>(C: T) {
    abstract class Base extends C {

      // will be fill mixed in module base (모듈 베이스와 믹싱되면 값이 채워짐, 선언만 진행)


      constructor(...args: any[]) {
        super(...args)
      }
      // find user nft cards
      abstract getUserNFTs(userAddress: string): Promise<any>
    }
    return Base;
}



