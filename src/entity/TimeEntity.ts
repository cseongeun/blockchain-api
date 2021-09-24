import { Column, CreateDateColumn,UpdateDateColumn } from "typeorm";
import { Constructor } from '../helper/mixInHelper'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function TimeEntity<TBaseTime extends Constructor>(BaseTime: TBaseTime) {
    abstract class AbstractEntity extends BaseTime {
            @CreateDateColumn({type:"timestamp"})
            created_at: Date;
        
            @UpdateDateColumn({type:"timestamp"})
            updated_at: Date;
        
            @Column({type:"timestamp", nullable: true})
            deleted_at?: Date | null;
    }

    return AbstractEntity
}
