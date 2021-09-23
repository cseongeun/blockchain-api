import { Column, Entity,  Index,  JoinColumn,  OneToOne} from "typeorm";
import { TimeEntity  } from "../TimeEntity";
import { EmptyEntity } from "../EmptyEntity";
import { IdEntity } from "../IdEntity";
import { Protocol } from "../protocol/Protocol";
import { StatusEntity } from "../StatusEntity";
import { Token } from "../token/Token";

@Entity()
@Index('idx_lending_1', ['protocol', 'address'])
@Index('idx_lending_2', ['protocol', 'pid'])
export class Lending extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {

  @OneToOne(() => Protocol)
  @JoinColumn()
  protocol: Protocol;

  @OneToOne(() => Token)
  @JoinColumn()
  token: Token;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  pid: number;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  liquidity_amount: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  liquidity_value: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  supply_amount: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  supply_value: string;
  
  @Column({ nullable: true })
  supply_apr: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  borrow_amount: string;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  borrow_value: string;

  @Column({ nullable: true })
  borrow_apr: string;

  @Column({ nullable: true })
  data: string;

  @Column({ nullable: true })
  collateral_factor: true

  @Column({ nullable: true })
  reserve_factor: true

  @Column({ nullable: true })
  link: true
}