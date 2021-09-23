import {Network} from "./Network";
import {EntityRepository, Repository} from "typeorm";
/**
 * CREATE / UPDATE / DELETE
 */
@EntityRepository(Network)
export class NetworkRepository extends Repository<Network> {}
