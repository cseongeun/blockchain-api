import { Column, Entity,  Index,  JoinColumn,  ManyToOne,  OneToOne} from "typeorm";
import { TimeEntity  } from "../TimeEntity";
import { EmptyEntity } from "../EmptyEntity";
import { IdEntity } from "../IdEntity";
import { Protocol } from "../protocol/Protocol";
import { StatusEntity } from "../StatusEntity";

@Entity()
@Index('idx_nfToken_1', ['protocol', 'address', 'index'])
export class NFToken extends IdEntity(TimeEntity(StatusEntity(EmptyEntity))) {

  @ManyToOne(() => Protocol, { nullable: false })
  @JoinColumn({ name: 'protocol_id' })
  protocol: Protocol;

  @Column()
  address: string;

  @Column()
  index: number;

  @Column({ nullable: true })
  token_uri: string;

  @Column({ nullable: true })
  image_or_animation_uri: string;
}