import {EntityRepository, Repository} from "typeorm";
import { Farm } from "./Farm";
/**
 * CREATE / UPDATE / DELETE
 */
@EntityRepository(Farm)
export class FarmRepository extends Repository<Farm> {}
