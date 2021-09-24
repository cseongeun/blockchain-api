import { Constructor } from '../helper/mixInHelper'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Base<T extends Constructor>(C: T) {
    abstract class Base extends C {
     
      constructor(...args: any[]) {
        super(...args)
      }
      // find user lending position
      abstract getUserLendings(userAddress: string): Promise<any>
    }
    return Base;
}



