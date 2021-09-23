import { Column, CreateDateColumn,UpdateDateColumn } from "typeorm";

// eslint-disable-next-line @typescript-eslint/ban-types
export type Constructor<T = {}> = new (...args: any[]) => T

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function TimeEntity<TBaseTime extends Constructor>(BaseTime: TBaseTime) {
    abstract class AbstractEntity extends BaseTime {
            @CreateDateColumn({type:"timestamp"})
            createdAt: Date;
        
            @UpdateDateColumn({type:"timestamp"})
            updatedAt: Date;
        
            @Column({type:"timestamp", nullable: true})
            deletedAt?: Date | null;
    }

    return AbstractEntity
}
