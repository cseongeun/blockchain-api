import { Column, Entity } from "typeorm";
import { EmptyEntity } from "../EmptyEntity";
import { IdEntity } from "../IdEntity";

@Entity()
export class SchedulerConfig extends IdEntity(EmptyEntity) {
  
  @Column()
  key: string;

  @Column()
  value: string;
}