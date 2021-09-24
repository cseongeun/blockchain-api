import { Generated, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Constructor } from '../helper/mixInHelper'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function UuidEntity<TId extends Constructor>(Id: TId) {
    abstract class AbstractEntity extends Id {
        @PrimaryGeneratedColumn('uuid', { name: 'id' })
        id: string;            
    }

    return AbstractEntity
}
