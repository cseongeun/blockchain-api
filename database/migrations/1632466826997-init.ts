import {MigrationInterface, QueryRunner} from "typeorm";

export class init1632466826997 implements MigrationInterface {
    name = 'init1632466826997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`deflipboard\`.\`token\` (\`status\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`symbol\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`decimals\` int NOT NULL, \`total_supply\` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', \`price_address\` varchar(255) NULL, \`price_value\` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', \`icon_link\` varchar(255) NULL, \`network_id\` bigint NOT NULL, \`pair0_token_id\` bigint NULL, \`pair1_token_id\` bigint NULL, UNIQUE INDEX \`idx_token_1\` (\`network_id\`, \`address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deflipboard\`.\`nf_token\` (\`status\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`address\` varchar(255) NOT NULL, \`index\` int NOT NULL, \`token_uri\` varchar(255) NULL, \`image_or_animation_uri\` varchar(255) NULL, \`protocol_id\` bigint NOT NULL, INDEX \`idx_nfToken_1\` (\`protocol_id\`, \`address\`, \`index\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deflipboard\`.\`farm_reward_token\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`farm_id\` bigint NOT NULL, \`token_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deflipboard\`.\`farm_stake_token\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`farm_id\` bigint NOT NULL, \`token_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deflipboard\`.\`farm\` (\`status\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NULL, \`pid\` int NULL, \`assets\` varchar(255) NOT NULL, \`liquidity_amount\` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', \`liquidity_value\` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', \`apy\` varchar(255) NULL, \`apr\` varchar(255) NULL, \`data\` varchar(255) NULL, \`link\` varchar(255) NULL, \`protocol_id\` bigint NOT NULL, UNIQUE INDEX \`idx_farm_3\` (\`protocol_id\`, \`address\`, \`pid\`), INDEX \`idx_farm_2\` (\`protocol_id\`, \`pid\`), INDEX \`idx_farm_1\` (\`protocol_id\`, \`address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deflipboard\`.\`lending\` (\`status\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`address\` varchar(255) NULL, \`pid\` int NULL, \`liquidity_amount\` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', \`liquidity_value\` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', \`supply_amount\` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', \`supply_value\` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', \`supply_apr\` varchar(255) NULL, \`borrow_amount\` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', \`borrow_value\` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', \`borrow_apr\` varchar(255) NULL, \`data\` varchar(255) NULL, \`collateral_factor\` tinyint NULL, \`reserve_factor\` tinyint NULL, \`link\` tinyint NULL, \`protocol_id\` bigint NOT NULL, \`token_id\` bigint NOT NULL, UNIQUE INDEX \`idx_lending_3\` (\`protocol_id\`, \`address\`, \`pid\`), INDEX \`idx_lending_2\` (\`protocol_id\`, \`pid\`), INDEX \`idx_lending_1\` (\`protocol_id\`, \`address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deflipboard\`.\`scheduler\` (\`status\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp NULL, \`id\` char(36) NOT NULL, \`type\` varchar(255) NOT NULL, \`identity_path\` varchar(255) NOT NULL, \`cron\` varchar(255) NOT NULL, \`block_number\` int NULL, \`pid\` int NULL, \`error\` varchar(255) NOT NULL DEFAULT '0', \`error_msg\` varchar(255) NULL, \`process\` tinyint NOT NULL DEFAULT '0', \`protocol_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deflipboard\`.\`protocol\` (\`status\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`use_amm\` tinyint NOT NULL DEFAULT 0, \`use_farm\` tinyint NOT NULL DEFAULT 0, \`use_nft\` tinyint NOT NULL DEFAULT 0, \`use_lending\` tinyint NOT NULL DEFAULT 0, \`link\` varchar(255) NULL, \`logo_link\` varchar(255) NULL, \`network_id\` bigint NOT NULL, \`token_id\` bigint NULL, UNIQUE INDEX \`idx_protocol_1\` (\`network_id\`, \`token_id\`), UNIQUE INDEX \`REL_a46cc48987a816645ec5e2b42c\` (\`token_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deflipboard\`.\`network\` (\`status\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`sub_name\` varchar(255) NOT NULL, \`currency_symbol\` varchar(255) NOT NULL, \`chain_id\` bigint NOT NULL, \`multi_call_address\` varchar(255) NOT NULL, \`http\` text NOT NULL, \`block_time_sec\` int NOT NULL, \`explorer_url\` varchar(255) NOT NULL, INDEX \`idx_network_1\` (\`chain_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deflipboard\`.\`abi\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`address\` varchar(255) NOT NULL, \`data\` longtext NOT NULL, \`network_id\` bigint NOT NULL, UNIQUE INDEX \`idx_abi_1\` (\`network_id\`, \`address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deflipboard\`.\`scheduler_config\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`token\` ADD CONSTRAINT \`FK_04f1841369002c4c5ce78637641\` FOREIGN KEY (\`network_id\`) REFERENCES \`deflipboard\`.\`network\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`token\` ADD CONSTRAINT \`FK_7b830dba9e56d262a62f9441609\` FOREIGN KEY (\`pair0_token_id\`) REFERENCES \`deflipboard\`.\`token\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`token\` ADD CONSTRAINT \`FK_cce265c1b0366e044defce6069d\` FOREIGN KEY (\`pair1_token_id\`) REFERENCES \`deflipboard\`.\`token\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`nf_token\` ADD CONSTRAINT \`FK_09acd4c26f0a639044273b3ab0e\` FOREIGN KEY (\`protocol_id\`) REFERENCES \`deflipboard\`.\`protocol\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`farm_reward_token\` ADD CONSTRAINT \`FK_58dbf0d26f9cc5d71482a0572ca\` FOREIGN KEY (\`farm_id\`) REFERENCES \`deflipboard\`.\`farm\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`farm_reward_token\` ADD CONSTRAINT \`FK_de8a53e995c175e7126a387615e\` FOREIGN KEY (\`token_id\`) REFERENCES \`deflipboard\`.\`token\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`farm_stake_token\` ADD CONSTRAINT \`FK_60112917a31e47a03c668227c27\` FOREIGN KEY (\`farm_id\`) REFERENCES \`deflipboard\`.\`farm\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`farm_stake_token\` ADD CONSTRAINT \`FK_272569108096c913ecc4d717c22\` FOREIGN KEY (\`token_id\`) REFERENCES \`deflipboard\`.\`token\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`farm\` ADD CONSTRAINT \`FK_dbc9aaad54bdb26cc6e5817f702\` FOREIGN KEY (\`protocol_id\`) REFERENCES \`deflipboard\`.\`protocol\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`lending\` ADD CONSTRAINT \`FK_dde91bad9e36f133831c943dc13\` FOREIGN KEY (\`protocol_id\`) REFERENCES \`deflipboard\`.\`protocol\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`lending\` ADD CONSTRAINT \`FK_48716a29208ddb7dda114f0794a\` FOREIGN KEY (\`token_id\`) REFERENCES \`deflipboard\`.\`token\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`scheduler\` ADD CONSTRAINT \`FK_fa09da2925eab786c0b841ff3cb\` FOREIGN KEY (\`protocol_id\`) REFERENCES \`deflipboard\`.\`protocol\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`protocol\` ADD CONSTRAINT \`FK_a2b741db235236f6ce969c0a4ff\` FOREIGN KEY (\`network_id\`) REFERENCES \`deflipboard\`.\`network\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`protocol\` ADD CONSTRAINT \`FK_a46cc48987a816645ec5e2b42cb\` FOREIGN KEY (\`token_id\`) REFERENCES \`deflipboard\`.\`token\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`abi\` ADD CONSTRAINT \`FK_266455c11da5a764c557c66f46f\` FOREIGN KEY (\`network_id\`) REFERENCES \`deflipboard\`.\`network\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`abi\` DROP FOREIGN KEY \`FK_266455c11da5a764c557c66f46f\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`protocol\` DROP FOREIGN KEY \`FK_a46cc48987a816645ec5e2b42cb\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`protocol\` DROP FOREIGN KEY \`FK_a2b741db235236f6ce969c0a4ff\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`scheduler\` DROP FOREIGN KEY \`FK_fa09da2925eab786c0b841ff3cb\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`lending\` DROP FOREIGN KEY \`FK_48716a29208ddb7dda114f0794a\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`lending\` DROP FOREIGN KEY \`FK_dde91bad9e36f133831c943dc13\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`farm\` DROP FOREIGN KEY \`FK_dbc9aaad54bdb26cc6e5817f702\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`farm_stake_token\` DROP FOREIGN KEY \`FK_272569108096c913ecc4d717c22\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`farm_stake_token\` DROP FOREIGN KEY \`FK_60112917a31e47a03c668227c27\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`farm_reward_token\` DROP FOREIGN KEY \`FK_de8a53e995c175e7126a387615e\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`farm_reward_token\` DROP FOREIGN KEY \`FK_58dbf0d26f9cc5d71482a0572ca\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`nf_token\` DROP FOREIGN KEY \`FK_09acd4c26f0a639044273b3ab0e\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`token\` DROP FOREIGN KEY \`FK_cce265c1b0366e044defce6069d\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`token\` DROP FOREIGN KEY \`FK_7b830dba9e56d262a62f9441609\``);
        await queryRunner.query(`ALTER TABLE \`deflipboard\`.\`token\` DROP FOREIGN KEY \`FK_04f1841369002c4c5ce78637641\``);
        await queryRunner.query(`DROP TABLE \`deflipboard\`.\`scheduler_config\``);
        await queryRunner.query(`DROP INDEX \`idx_abi_1\` ON \`deflipboard\`.\`abi\``);
        await queryRunner.query(`DROP TABLE \`deflipboard\`.\`abi\``);
        await queryRunner.query(`DROP INDEX \`idx_network_1\` ON \`deflipboard\`.\`network\``);
        await queryRunner.query(`DROP TABLE \`deflipboard\`.\`network\``);
        await queryRunner.query(`DROP INDEX \`REL_a46cc48987a816645ec5e2b42c\` ON \`deflipboard\`.\`protocol\``);
        await queryRunner.query(`DROP INDEX \`idx_protocol_1\` ON \`deflipboard\`.\`protocol\``);
        await queryRunner.query(`DROP TABLE \`deflipboard\`.\`protocol\``);
        await queryRunner.query(`DROP TABLE \`deflipboard\`.\`scheduler\``);
        await queryRunner.query(`DROP INDEX \`idx_lending_1\` ON \`deflipboard\`.\`lending\``);
        await queryRunner.query(`DROP INDEX \`idx_lending_2\` ON \`deflipboard\`.\`lending\``);
        await queryRunner.query(`DROP INDEX \`idx_lending_3\` ON \`deflipboard\`.\`lending\``);
        await queryRunner.query(`DROP TABLE \`deflipboard\`.\`lending\``);
        await queryRunner.query(`DROP INDEX \`idx_farm_1\` ON \`deflipboard\`.\`farm\``);
        await queryRunner.query(`DROP INDEX \`idx_farm_2\` ON \`deflipboard\`.\`farm\``);
        await queryRunner.query(`DROP INDEX \`idx_farm_3\` ON \`deflipboard\`.\`farm\``);
        await queryRunner.query(`DROP TABLE \`deflipboard\`.\`farm\``);
        await queryRunner.query(`DROP TABLE \`deflipboard\`.\`farm_stake_token\``);
        await queryRunner.query(`DROP TABLE \`deflipboard\`.\`farm_reward_token\``);
        await queryRunner.query(`DROP INDEX \`idx_nfToken_1\` ON \`deflipboard\`.\`nf_token\``);
        await queryRunner.query(`DROP TABLE \`deflipboard\`.\`nf_token\``);
        await queryRunner.query(`DROP INDEX \`idx_token_1\` ON \`deflipboard\`.\`token\``);
        await queryRunner.query(`DROP TABLE \`deflipboard\`.\`token\``);
    }

}
