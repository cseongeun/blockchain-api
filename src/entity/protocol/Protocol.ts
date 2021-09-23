import { Column, Entity,  Index,  JoinColumn,  ManyToOne,  OneToMany,  OneToOne} from "typeorm";
import { TimeEntity  } from "../TimeEntity";
import { EmptyEntity } from "../EmptyEntity";
import { IdEntity } from "../IdEntity";
import { Network } from '../network/Network';
import { StatusEntity } from "../StatusEntity";
import { Token } from '../token/Token';
import { NFToken } from "../nfToken/NFToken";
import { Farm } from "../farm/Farm";
import { Lending } from "../lending/Lending";
import { Scheduler } from "../scheduler/Scheduler";

@Entity()
@Index('idx_protocol_1', ['network', 'token'], { unique: true })
export class Protocol extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {

  @ManyToOne(() => Network)
  @JoinColumn()
  network: Network;

  @Column()
  name: string;

  @OneToOne(() => Token, { nullable: true })
  @JoinColumn()
  token: Token;

  @Column({ default: false })
  check_farm: boolean;

  @Column({ default: false })
  check_nft: boolean;

  @Column({ default: false })
  check_lending: boolean;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  logo_link: string;

  @OneToMany(() => Farm, farm => farm.protocol)
  farms: Farm[]

  @OneToMany(() => Lending, lending => lending.protocol)
  lendings: Lending[]

  @OneToMany(() => NFToken, nfToken => nfToken.protocol)
  nfTokens: NFToken[]
  
  @OneToMany(() => Scheduler, scheduler => scheduler.protocol)
  schedulers: Scheduler[]

}