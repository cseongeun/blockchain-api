import {  Entity,  JoinColumn,  ManyToOne } from "typeorm";
import { EmptyEntity } from "../EmptyEntity";
import { IdEntity } from "../IdEntity";
import { Token } from "../token/Token";
import { Farm } from "./Farm";

@Entity()
export class FarmStakeToken  extends IdEntity(EmptyEntity) {

  @ManyToOne(() => Farm, { onDelete: 'CASCADE' })
  farm: Farm;

  @ManyToOne(() => Token, { onDelete: 'CASCADE' })
  @JoinColumn()
  token: Token;
}