import {EntityRepository, Repository} from "typeorm";
import { Lending } from "./Lending";
/**
 * CREATE / UPDATE / DELETE
 */
@EntityRepository(Lending)
export class LendingRepository extends Repository<Lending> {}
