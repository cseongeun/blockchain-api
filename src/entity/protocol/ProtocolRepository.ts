import {EntityRepository, Repository} from "typeorm";
import { Protocol } from "./Protocol";
/**
 * CREATE / UPDATE / DELETE
 */
@EntityRepository(Protocol)
export class ProtocolRepository extends Repository<Protocol> {}
