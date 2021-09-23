import {Abi} from "./Abi";
import {EntityRepository, Repository} from "typeorm";
/**
 * CREATE / UPDATE / DELETE
 */
@EntityRepository(Abi)
export class AbiRepository extends Repository<Abi> {}
