import { Column, Entity,  Index,  JoinColumn,  OneToOne} from "typeorm";
import { TimeEntity  } from "../TimeEntity";
import { EmptyEntity } from "../EmptyEntity";
import { IdEntity } from "../IdEntity";
import { Network } from '../network/Network';
import { StatusEntity } from "../StatusEntity";
import { Token } from '../token/Token';

@Entity()
@Index('idx_protocol_1', ['network', 'name'])
export class Protocol extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {

  @OneToOne(() => Network)
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
}