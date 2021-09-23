import {MigrationInterface, QueryRunner} from "typeorm";

export class init1632386394353 implements MigrationInterface {
    name = 'init1632386394353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `network` (`status` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp NULL, `id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `sub_name` varchar(255) NOT NULL, `currency_symbol` varchar(255) NOT NULL, `chain_id` bigint NOT NULL, `multi_call_address` varchar(255) NOT NULL, `http` varchar(255) NOT NULL, `block_time_sec` int NOT NULL, `explorer_url` varchar(255) NOT NULL, INDEX `idx_network_1` (`chain_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `abi` (`id` bigint NOT NULL AUTO_INCREMENT, `address` varchar(255) NOT NULL, `data` varchar(255) NOT NULL, `networkId` bigint NULL, INDEX `idx_abi_1` (`address`), UNIQUE INDEX `REL_73c5f4d381f8f3576516d86ab0` (`networkId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `token` (`status` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp NULL, `id` bigint NOT NULL AUTO_INCREMENT, `type` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `symbol` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, `decimals` int NOT NULL, `total_supply` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', `price_address` varchar(255) NULL, `price_value` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', `icon_link` varchar(255) NULL, `networkId` bigint NULL, `pair0Id` bigint NULL, `pair1Id` bigint NULL, INDEX `idx_token_1` (`networkId`, `address`), UNIQUE INDEX `REL_9fc766f483e0d16abeb31f11f0` (`networkId`), UNIQUE INDEX `REL_59dea67058a6dbf7787bf72bec` (`pair0Id`), UNIQUE INDEX `REL_7ab7ee056070a827ba16c70524` (`pair1Id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `protocol` (`status` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp NULL, `id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `check_farm` tinyint NOT NULL, `check_nft` tinyint NOT NULL, `check_lending` tinyint NOT NULL, `link` varchar(255) NULL, `logo_link` varchar(255) NULL, `networkId` bigint NULL, `tokenId` bigint NULL, INDEX `idx_protocol_1` (`networkId`, `name`), UNIQUE INDEX `REL_edcd818c1b3a63a31c3f72a351` (`networkId`), UNIQUE INDEX `REL_7c80dacfc51fc3d3321a53c58f` (`tokenId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `farm_reward_token` (`id` bigint NOT NULL AUTO_INCREMENT, `farmId` bigint NULL, `tokenId` bigint NULL, UNIQUE INDEX `REL_accb1767d39cf0fdb3c9a7551c` (`tokenId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `farm_stake_token` (`id` bigint NOT NULL AUTO_INCREMENT, `farmId` bigint NULL, `tokenId` bigint NULL, UNIQUE INDEX `REL_3c0cda572bf6d3a412f8f4a547` (`tokenId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `farm` (`status` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp NULL, `id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `address` varchar(255) NULL, `pid` int NULL, `assets` varchar(255) NOT NULL, `liquidity_amount` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', `liquidity_value` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', `apy` varchar(255) NULL, `apr` varchar(255) NULL, `data` varchar(255) NULL, `link` varchar(255) NULL, `protocolId` bigint NULL, INDEX `idx_farm_2` (`protocolId`, `pid`), INDEX `idx_farm_1` (`protocolId`, `address`), UNIQUE INDEX `REL_c72c82aaa265e37086cc19bdd8` (`protocolId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `lending` (`status` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp NULL, `id` bigint NOT NULL AUTO_INCREMENT, `address` varchar(255) NULL, `pid` int NULL, `liquidity_amount` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', `liquidity_value` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', `supply_amount` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', `supply_value` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', `supply_apr` varchar(255) NULL, `borrow_amount` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', `borrow_value` decimal(65,22) NOT NULL DEFAULT '0.0000000000000000000000', `borrow_apr` varchar(255) NULL, `data` varchar(255) NULL, `collateral_factor` tinyint NULL, `reserve_factor` tinyint NULL, `link` tinyint NULL, `protocolId` bigint NULL, `tokenId` bigint NULL, INDEX `idx_lending_2` (`protocolId`, `pid`), INDEX `idx_lending_1` (`protocolId`, `address`), UNIQUE INDEX `REL_3296ab1e7aa17d0564aa80e215` (`protocolId`), UNIQUE INDEX `REL_3780f0e5aad533b5b769a6db14` (`tokenId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `nf_token` (`status` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp NULL, `id` bigint NOT NULL AUTO_INCREMENT, `address` varchar(255) NOT NULL, `index` int NOT NULL, `token_uri` varchar(255) NULL, `image_or_animation_uri` varchar(255) NULL, `protocolId` bigint NULL, INDEX `idx_nfToken_1` (`protocolId`, `address`, `index`), UNIQUE INDEX `REL_0f811c07d5c8f9ce97963c97b7` (`protocolId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `scheduler` (`status` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp NULL, `id` varchar(36) NOT NULL, `type` varchar(255) NOT NULL, `identity_path` varchar(255) NOT NULL, `cron` varchar(255) NOT NULL, `block_number` int NULL, `pid` int NULL, `error` varchar(255) NOT NULL DEFAULT '0', `error_msg` varchar(255) NULL, `process` tinyint NOT NULL DEFAULT '0', `protocolId` bigint NULL, UNIQUE INDEX `REL_b2d6c78da7a0887b57bab225b9` (`protocolId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `scheduler_config` (`id` bigint NOT NULL AUTO_INCREMENT, `key` varchar(255) NOT NULL, `value` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `age` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `abi` ADD CONSTRAINT `FK_73c5f4d381f8f3576516d86ab0f` FOREIGN KEY (`networkId`) REFERENCES `network`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `token` ADD CONSTRAINT `FK_9fc766f483e0d16abeb31f11f0d` FOREIGN KEY (`networkId`) REFERENCES `network`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `token` ADD CONSTRAINT `FK_59dea67058a6dbf7787bf72bec0` FOREIGN KEY (`pair0Id`) REFERENCES `token`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `token` ADD CONSTRAINT `FK_7ab7ee056070a827ba16c705244` FOREIGN KEY (`pair1Id`) REFERENCES `token`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `protocol` ADD CONSTRAINT `FK_edcd818c1b3a63a31c3f72a3516` FOREIGN KEY (`networkId`) REFERENCES `network`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `protocol` ADD CONSTRAINT `FK_7c80dacfc51fc3d3321a53c58f6` FOREIGN KEY (`tokenId`) REFERENCES `token`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `farm_reward_token` ADD CONSTRAINT `FK_db8a1b50cf136e300d35a21b794` FOREIGN KEY (`farmId`) REFERENCES `farm`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `farm_reward_token` ADD CONSTRAINT `FK_accb1767d39cf0fdb3c9a7551c5` FOREIGN KEY (`tokenId`) REFERENCES `token`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `farm_stake_token` ADD CONSTRAINT `FK_88b082e25438070e7dff2f9d798` FOREIGN KEY (`farmId`) REFERENCES `farm`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `farm_stake_token` ADD CONSTRAINT `FK_3c0cda572bf6d3a412f8f4a5475` FOREIGN KEY (`tokenId`) REFERENCES `token`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `farm` ADD CONSTRAINT `FK_c72c82aaa265e37086cc19bdd89` FOREIGN KEY (`protocolId`) REFERENCES `protocol`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lending` ADD CONSTRAINT `FK_3296ab1e7aa17d0564aa80e2154` FOREIGN KEY (`protocolId`) REFERENCES `protocol`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lending` ADD CONSTRAINT `FK_3780f0e5aad533b5b769a6db140` FOREIGN KEY (`tokenId`) REFERENCES `token`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `nf_token` ADD CONSTRAINT `FK_0f811c07d5c8f9ce97963c97b79` FOREIGN KEY (`protocolId`) REFERENCES `protocol`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `scheduler` ADD CONSTRAINT `FK_b2d6c78da7a0887b57bab225b97` FOREIGN KEY (`protocolId`) REFERENCES `protocol`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `scheduler` DROP FOREIGN KEY `FK_b2d6c78da7a0887b57bab225b97`");
        await queryRunner.query("ALTER TABLE `nf_token` DROP FOREIGN KEY `FK_0f811c07d5c8f9ce97963c97b79`");
        await queryRunner.query("ALTER TABLE `lending` DROP FOREIGN KEY `FK_3780f0e5aad533b5b769a6db140`");
        await queryRunner.query("ALTER TABLE `lending` DROP FOREIGN KEY `FK_3296ab1e7aa17d0564aa80e2154`");
        await queryRunner.query("ALTER TABLE `farm` DROP FOREIGN KEY `FK_c72c82aaa265e37086cc19bdd89`");
        await queryRunner.query("ALTER TABLE `farm_stake_token` DROP FOREIGN KEY `FK_3c0cda572bf6d3a412f8f4a5475`");
        await queryRunner.query("ALTER TABLE `farm_stake_token` DROP FOREIGN KEY `FK_88b082e25438070e7dff2f9d798`");
        await queryRunner.query("ALTER TABLE `farm_reward_token` DROP FOREIGN KEY `FK_accb1767d39cf0fdb3c9a7551c5`");
        await queryRunner.query("ALTER TABLE `farm_reward_token` DROP FOREIGN KEY `FK_db8a1b50cf136e300d35a21b794`");
        await queryRunner.query("ALTER TABLE `protocol` DROP FOREIGN KEY `FK_7c80dacfc51fc3d3321a53c58f6`");
        await queryRunner.query("ALTER TABLE `protocol` DROP FOREIGN KEY `FK_edcd818c1b3a63a31c3f72a3516`");
        await queryRunner.query("ALTER TABLE `token` DROP FOREIGN KEY `FK_7ab7ee056070a827ba16c705244`");
        await queryRunner.query("ALTER TABLE `token` DROP FOREIGN KEY `FK_59dea67058a6dbf7787bf72bec0`");
        await queryRunner.query("ALTER TABLE `token` DROP FOREIGN KEY `FK_9fc766f483e0d16abeb31f11f0d`");
        await queryRunner.query("ALTER TABLE `abi` DROP FOREIGN KEY `FK_73c5f4d381f8f3576516d86ab0f`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `scheduler_config`");
        await queryRunner.query("DROP INDEX `REL_b2d6c78da7a0887b57bab225b9` ON `scheduler`");
        await queryRunner.query("DROP TABLE `scheduler`");
        await queryRunner.query("DROP INDEX `REL_0f811c07d5c8f9ce97963c97b7` ON `nf_token`");
        await queryRunner.query("DROP INDEX `idx_nfToken_1` ON `nf_token`");
        await queryRunner.query("DROP TABLE `nf_token`");
        await queryRunner.query("DROP INDEX `REL_3780f0e5aad533b5b769a6db14` ON `lending`");
        await queryRunner.query("DROP INDEX `REL_3296ab1e7aa17d0564aa80e215` ON `lending`");
        await queryRunner.query("DROP INDEX `idx_lending_1` ON `lending`");
        await queryRunner.query("DROP INDEX `idx_lending_2` ON `lending`");
        await queryRunner.query("DROP TABLE `lending`");
        await queryRunner.query("DROP INDEX `REL_c72c82aaa265e37086cc19bdd8` ON `farm`");
        await queryRunner.query("DROP INDEX `idx_farm_1` ON `farm`");
        await queryRunner.query("DROP INDEX `idx_farm_2` ON `farm`");
        await queryRunner.query("DROP TABLE `farm`");
        await queryRunner.query("DROP INDEX `REL_3c0cda572bf6d3a412f8f4a547` ON `farm_stake_token`");
        await queryRunner.query("DROP TABLE `farm_stake_token`");
        await queryRunner.query("DROP INDEX `REL_accb1767d39cf0fdb3c9a7551c` ON `farm_reward_token`");
        await queryRunner.query("DROP TABLE `farm_reward_token`");
        await queryRunner.query("DROP INDEX `REL_7c80dacfc51fc3d3321a53c58f` ON `protocol`");
        await queryRunner.query("DROP INDEX `REL_edcd818c1b3a63a31c3f72a351` ON `protocol`");
        await queryRunner.query("DROP INDEX `idx_protocol_1` ON `protocol`");
        await queryRunner.query("DROP TABLE `protocol`");
        await queryRunner.query("DROP INDEX `REL_7ab7ee056070a827ba16c70524` ON `token`");
        await queryRunner.query("DROP INDEX `REL_59dea67058a6dbf7787bf72bec` ON `token`");
        await queryRunner.query("DROP INDEX `REL_9fc766f483e0d16abeb31f11f0` ON `token`");
        await queryRunner.query("DROP INDEX `idx_token_1` ON `token`");
        await queryRunner.query("DROP TABLE `token`");
        await queryRunner.query("DROP INDEX `REL_73c5f4d381f8f3576516d86ab0` ON `abi`");
        await queryRunner.query("DROP INDEX `idx_abi_1` ON `abi`");
        await queryRunner.query("DROP TABLE `abi`");
        await queryRunner.query("DROP INDEX `idx_network_1` ON `network`");
        await queryRunner.query("DROP TABLE `network`");
    }

}
