import {MigrationInterface, QueryRunner} from "typeorm";

export class mNetworkHttp1632388171077 implements MigrationInterface {
    name = 'mNetworkHttp1632388171077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `network` DROP COLUMN `http`");
        await queryRunner.query("ALTER TABLE `network` ADD `http` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `network` DROP COLUMN `http`");
        await queryRunner.query("ALTER TABLE `network` ADD `http` varchar(255) NOT NULL");
    }

}
