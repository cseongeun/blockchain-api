import { Column, Entity, Index, JoinColumn, OneToMany} from "typeorm";
import { EmptyEntity } from "../EmptyEntity";
import { TimeEntity  } from "../TimeEntity";
import { StatusEntity } from "../StatusEntity";
import { IdEntity } from "../IdEntity";
import { Abi } from "../abi/Abi";
import { Token } from "../token/Token";
import { Protocol } from "../protocol/Protocol";

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
  http: string[];

  @Column()
  block_time_sec: number;

  @Column()
  explorer_url: string;
  
  @OneToMany(() => Protocol, protocol => protocol.network)
  @JoinColumn({ name: 'protocols' })
  protocols: Protocol[]
  
  @OneToMany(() => Abi, abi => abi.network)
  @JoinColumn({ name: 'abis' })
  abis: Abi[]

  @OneToMany(() => Token, token => token.network)
  @JoinColumn({ name: 'tokens' })
  tokens: Token[]

  getHTTPConfig() {
    return JSON.parse(JSON.stringify(this.http));
  }
}
