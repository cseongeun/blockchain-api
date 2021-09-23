import { Column, Entity,  Index,  JoinColumn,  OneToOne} from "typeorm";
import { TimeEntity  } from "../TimeEntity";
import { EmptyEntity } from "../EmptyEntity";
import { Protocol } from "../protocol/Protocol";
import { StatusEntity } from "../StatusEntity";
import { UuidEntity } from "../UuidEntity";

@Entity()
export class Scheduler extends UuidEntity(TimeEntity(StatusEntity(EmptyEntity))) {

  @OneToOne(() => Protocol, { nullable: true })
  @JoinColumn()
  protocol: Protocol;

  @Column()
  type: string;

  @Column()
  identity_path: string;

  @Column()
  cron: string;

  @Column({ nullable: true })
  block_number: number;

  @Column({ nullable: true })
  pid: number;

  @Column({ default: 0 })
  error: string;

  @Column({ nullable: true })
  error_msg: string;

  @Column({ default: 0 })
  process: boolean;
}