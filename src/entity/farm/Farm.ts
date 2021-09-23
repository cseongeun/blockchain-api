import { Column, Entity,  Index,  JoinColumn,  ManyToOne,  OneToMany } from "typeorm";
import { TimeEntity  } from "../TimeEntity";
import { EmptyEntity } from "../EmptyEntity";
import { IdEntity } from "../IdEntity";
import { Protocol } from "../protocol/Protocol";
import { StatusEntity } from "../StatusEntity";
import { FarmRewardToken } from "./FarmRewardToken";
import { FarmStakeToken } from "./FarmStakeToken";

@Entity()
@Index('idx_farm_1', ['protocol', 'address'], { unique: false })
@Index('idx_farm_2', ['protocol', 'pid'], { unique: false })
@Index('idx_farm_3', ['protocol', 'address', 'pid'], { unique: true })
export class Farm extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {

  @ManyToOne(() => Protocol, { nullable: false })
  @JoinColumn({ name: 'protocol_id' })
  protocol: Protocol;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  pid: number;

  @Column()
  assets: string;

  @OneToMany(() => FarmStakeToken, farmStakeToken => farmStakeToken.farm)
  stakeTokens: FarmStakeToken[]

  @OneToMany(() => FarmRewardToken, farmRewardToken => farmRewardToken.farm)
  rewardTokens: FarmRewardToken[]

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  liquidity_amount: number;

  @Column('decimal', { precision: 65, scale: 22, default: 0 })
  liquidity_value: number;

  @Column({ nullable: true })
  apy: string;

  @Column({ nullable: true})
  apr: string;

  @Column({ nullable: true })
  data: string

  @Column({ nullable: true })
  link: string;
}