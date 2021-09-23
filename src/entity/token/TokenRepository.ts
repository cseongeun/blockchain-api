import {EntityRepository, Repository} from "typeorm";
import { Token } from "./Token";
/**
 * CREATE / UPDATE / DELETE
 */
@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {}
