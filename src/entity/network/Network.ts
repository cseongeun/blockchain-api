import { Column, Entity, Index} from "typeorm";
import { EmptyEntity } from "../EmptyEntity";
import { TimeEntity  } from "../TimeEntity";
import { StatusEntity } from "../StatusEntity";
import { IdEntity } from "../IdEntity";

@Entity()
@Index('idx_network_1', ['chain_id'])
export class Network  extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))){
  
  @Column()
  name: string;

  @Column()
  sub_name: string;

  @Column()
  currency_symbol: string;

  @Column({ type: 'bigint' })
  chain_id: number;

  @Column()
  multi_call_address: string;

  @Column('text')
  http: string;

  @Column()
  block_time_sec: number;

  @Column()
  explorer_url: string;
  
}
