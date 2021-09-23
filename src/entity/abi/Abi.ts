import { BeforeInsert, Column, Entity,  Index,  JoinColumn,  ManyToOne } from "typeorm";
import { EmptyEntity } from "../EmptyEntity";
import { IdEntity } from "../IdEntity";
import { Network } from "../network/Network";

@Entity()
@Index('idx_abi_1', ['network', 'address'], { unique: true })
export class Abi extends IdEntity(EmptyEntity) {

  @ManyToOne(() => Network, { nullable: false })
  @JoinColumn({ name: 'network_id' })
  network: Network;

  @Column()
  address: string;

  @Column('longtext')
  data: string;

  /* Hooks */
  @BeforeInsert()
  checkSumAddress(): Promise<void> {
    return
  }  
}