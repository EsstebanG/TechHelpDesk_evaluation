import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1765296684531 implements MigrationInterface {
    name = 'CreateUsersTable1765296684531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'technician', 'client')`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_user" SERIAL NOT NULL, "full_name" character varying(120) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'client', "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_client" SERIAL NOT NULL, "full_name" character varying(120) NOT NULL, "company" character varying(150) NOT NULL, "contact_email" character varying(150) NOT NULL, "id_user" integer, CONSTRAINT "UQ_4253ee2b695fdcf143cfc5a7ccd" UNIQUE ("contact_email"), CONSTRAINT "REL_409e65049193540fb6be2a4a47" UNIQUE ("id_user"), CONSTRAINT "PK_59bc814de9b1855a712531853aa" PRIMARY KEY ("id_client"))`);
        await queryRunner.query(`CREATE TABLE "technicians" ("id_technician" SERIAL NOT NULL, "full_name" character varying(120) NOT NULL, "specialty" character varying(150) NOT NULL, "availability" character varying(150) NOT NULL, "id_user" integer, CONSTRAINT "REL_f5faec0023427d1d75851699f7" UNIQUE ("id_user"), CONSTRAINT "PK_aa85e02d87adff459ed88e0d735" PRIMARY KEY ("id_technician"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id_category" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_8ac255b9743120147e61fb5465b" PRIMARY KEY ("id_category"))`);
        await queryRunner.query(`CREATE TYPE "public"."tickets_status_enum" AS ENUM('open', 'in_progress', 'resolved', 'closed')`);
        await queryRunner.query(`CREATE TYPE "public"."tickets_priority_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`CREATE TABLE "tickets" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_ticket" SERIAL NOT NULL, "title" character varying(150) NOT NULL, "description" text NOT NULL, "status" "public"."tickets_status_enum" NOT NULL DEFAULT 'open', "priority" "public"."tickets_priority_enum" NOT NULL DEFAULT 'medium', "clientIdClient" integer NOT NULL, "technicianIdTechnician" integer, "categoryIdCategory" integer NOT NULL, CONSTRAINT "PK_307ac8d01a605397bccc04dea7d" PRIMARY KEY ("id_ticket"))`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_409e65049193540fb6be2a4a47f" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technicians" ADD CONSTRAINT "FK_f5faec0023427d1d75851699f76" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_ae02e91f1431f4c6e8d181fd3a1" FOREIGN KEY ("clientIdClient") REFERENCES "clients"("id_client") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_69390c1be82571780683d4ffcaf" FOREIGN KEY ("technicianIdTechnician") REFERENCES "technicians"("id_technician") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_7abfcfe72c66431ef813dbb257e" FOREIGN KEY ("categoryIdCategory") REFERENCES "categories"("id_category") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_7abfcfe72c66431ef813dbb257e"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_69390c1be82571780683d4ffcaf"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_ae02e91f1431f4c6e8d181fd3a1"`);
        await queryRunner.query(`ALTER TABLE "technicians" DROP CONSTRAINT "FK_f5faec0023427d1d75851699f76"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_409e65049193540fb6be2a4a47f"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_status_enum"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "technicians"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
