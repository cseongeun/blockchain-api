import {  Entity,  JoinColumn,  ManyToOne,  OneToOne} from "typeorm";
import { EmptyEntity } from "../EmptyEntity";
import { IdEntity } from "../IdEntity";
import { Token } from "../token/Token";
import { Farm } from "./Farm";

@Entity()
export class FarmStakeToken  extends IdEntity(EmptyEntity) {

  @ManyToOne(() => Farm, farm => farm.id, { onDelete: 'CASCADE' })
  farm: Farm;

  @OneToOne(() => Token)
  @JoinColumn()
  token: Token;
}