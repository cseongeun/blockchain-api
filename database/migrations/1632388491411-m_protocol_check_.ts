import {MigrationInterface, QueryRunner} from "typeorm";

export class mProtocolCheck_1632388491411 implements MigrationInterface {
    name = 'mProtocolCheck_1632388491411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `protocol` CHANGE `check_farm` `check_farm` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `protocol` CHANGE `check_nft` `check_nft` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `protocol` CHANGE `check_lending` `check_lending` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `protocol` CHANGE `check_lending` `check_lending` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `protocol` CHANGE `check_nft` `check_nft` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `protocol` CHANGE `check_farm` `check_farm` tinyint NOT NULL");
    }

}
