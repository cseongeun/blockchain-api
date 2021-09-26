import { logger } from "ethers";
import { Service } from "typedi";
import { Code, EntityManager, Transaction, TransactionManager } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Token } from "../../entity/token/Token";
import { isUndefined } from "../../helper/typeHelper";
import { TokenSearchDTO } from "../../repository/token/dto/TokenSearch";
import { TokenQueryRepository } from "../../repository/token/TokenQueryRepository";

@Service()
export class TokenService {
  constructor(
    @InjectRepository() private tokenQueryRepository: TokenQueryRepository,
  ) {}

  async findAll(condition?: TokenSearchDTO): Promise<Token[]> {
    const [result] = await this.tokenQueryRepository.findAllAndCount(condition)
    return result;
  }

  async findOne(condition: TokenSearchDTO): Promise<Token> {
    return this.tokenQueryRepository.findOne(condition)
  }

}
