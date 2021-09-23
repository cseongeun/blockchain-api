import { Generated, PrimaryColumn} from "typeorm";
import { BigintValueTransformer } from "./BigintValueTransformer";

// eslint-disable-next-line @typescript-eslint/ban-types
export type Constructor<T = {}> = new (...args: any[]) => T

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function IdEntity<TId extends Constructor>(Id: TId) {
    abstract class AbstractEntity extends Id {
        @Generated("increment")
        @PrimaryColumn({type: 'bigint', transformer: new BigintValueTransformer()})
        id: number;            
    }

    return AbstractEntity
}
