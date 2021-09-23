import { Column } from "typeorm";


// eslint-disable-next-line @typescript-eslint/ban-types
export type Constructor<T = {}> = new (...args: any[]) => T

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function StatusEntity<TStatus extends Constructor>(Status: TStatus) {
    abstract class AbstractEntity extends Status {
      @Column({ nullable: false, default: true })
      status: boolean
    }
    return AbstractEntity
}
