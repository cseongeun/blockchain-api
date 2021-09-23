import { Column, Entity,  Index,  JoinColumn,  OneToOne} from "typeorm";
import { EmptyEntity } from "../EmptyEntity";
import { IdEntity } from "../IdEntity";
import { Network } from "../network/Network";

@Entity()
@Index('idx_abi_1', ['address'], { unique: false })
export class Abi extends IdEntity(EmptyEntity) {

  @OneToOne(() => Network)
  @JoinColumn()
  network: Network;

  @Column()
  address: string;

  @Column()
  data: string;
}