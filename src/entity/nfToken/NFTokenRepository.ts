import {EntityRepository, Repository} from "typeorm";
import { NFToken } from "./NFToken";
/**
 * CREATE / UPDATE / DELETE
 */
@EntityRepository(NFToken)
export class NFTokenRepository extends Repository<NFToken> {}
