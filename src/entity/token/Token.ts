import { Column, Entity,  Index,  JoinColumn,  ManyToMany,  ManyToOne,  OneToOne} from "typeorm";
import { TimeEntity  } from "../TimeEntity";
import { EmptyEntity } from "../EmptyEntity";
import { IdEntity } from "../IdEntity";
import { Network } from '../network/Network';
import { StatusEntity } from "../StatusEntity";

@Entity()
@Index('idx_token_1', ['network', 'address'], { unique: true })
export class Token extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {

  @ManyToOne(() => Network, { nullable: false })
  @JoinColumn({ name: 'network_id' })
  network: Network;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  address: string;

  @Column()
  decimals: number;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  total_supply: string;

  @ManyToOne(() => Token, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pair0_token_id' })
  pair0: Token;

  @ManyToOne(() => Token, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pair1_token_id' })
  pair1: Token;

  @Column({ nullable: true })
  price_address: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  price_value: number;

  @Column({ nullable: true })
  icon_link: string;

}