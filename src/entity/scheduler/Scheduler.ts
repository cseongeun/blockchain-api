import { Column, Entity,  JoinColumn,  ManyToOne } from "typeorm";
import { TimeEntity  } from "../TimeEntity";
import { EmptyEntity } from "../EmptyEntity";
import { Protocol } from "../protocol/Protocol";
import { StatusEntity } from "../StatusEntity";
import { UuidEntity } from "../UuidEntity";

@Entity()
export class Scheduler extends UuidEntity(TimeEntity(StatusEntity(EmptyEntity))) {

  @ManyToOne(() => Protocol, { nullable: true })
  @JoinColumn({ name: 'protocol_id' })
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

  updateBlockNumber(blockNumber: number) {
    this.block_number = blockNumber;
  }

  updatePid(pid: number) {
    this.block_number = pid;
  }
}