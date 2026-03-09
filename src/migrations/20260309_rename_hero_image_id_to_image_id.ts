import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- pages_blocks_marketing_hero_section
    ALTER TABLE "pages_blocks_marketing_hero_section"
      DROP CONSTRAINT IF EXISTS "pages_blocks_marketing_hero_section_hero_image_id_media_id_fk";
    DROP INDEX IF EXISTS "pages_blocks_marketing_hero_section_hero_image_idx";
    ALTER TABLE "pages_blocks_marketing_hero_section"
      RENAME COLUMN "hero_image_id" TO "image_id";
    CREATE INDEX "pages_blocks_marketing_hero_section_image_idx"
      ON "pages_blocks_marketing_hero_section" USING btree ("image_id");
    ALTER TABLE "pages_blocks_marketing_hero_section"
      ADD CONSTRAINT "pages_blocks_marketing_hero_section_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    -- _pages_v_blocks_marketing_hero_section
    ALTER TABLE "_pages_v_blocks_marketing_hero_section"
      DROP CONSTRAINT IF EXISTS "_pages_v_blocks_marketing_hero_section_hero_image_id_media_id_fk";
    DROP INDEX IF EXISTS "_pages_v_blocks_marketing_hero_section_hero_image_idx";
    ALTER TABLE "_pages_v_blocks_marketing_hero_section"
      RENAME COLUMN "hero_image_id" TO "image_id";
    CREATE INDEX "_pages_v_blocks_marketing_hero_section_image_idx"
      ON "_pages_v_blocks_marketing_hero_section" USING btree ("image_id");
    ALTER TABLE "_pages_v_blocks_marketing_hero_section"
      ADD CONSTRAINT "_pages_v_blocks_marketing_hero_section_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    -- services_blocks_marketing_hero_section
    ALTER TABLE "services_blocks_marketing_hero_section"
      DROP CONSTRAINT IF EXISTS "services_blocks_marketing_hero_section_hero_image_id_media_id_fk";
    DROP INDEX IF EXISTS "services_blocks_marketing_hero_section_hero_image_idx";
    ALTER TABLE "services_blocks_marketing_hero_section"
      RENAME COLUMN "hero_image_id" TO "image_id";
    CREATE INDEX "services_blocks_marketing_hero_section_image_idx"
      ON "services_blocks_marketing_hero_section" USING btree ("image_id");
    ALTER TABLE "services_blocks_marketing_hero_section"
      ADD CONSTRAINT "services_blocks_marketing_hero_section_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    -- _services_v_blocks_marketing_hero_section
    ALTER TABLE "_services_v_blocks_marketing_hero_section"
      DROP CONSTRAINT IF EXISTS "_services_v_blocks_marketing_hero_section_hero_image_id_media_id_fk";
    DROP INDEX IF EXISTS "_services_v_blocks_marketing_hero_section_hero_image_idx";
    ALTER TABLE "_services_v_blocks_marketing_hero_section"
      RENAME COLUMN "hero_image_id" TO "image_id";
    CREATE INDEX "_services_v_blocks_marketing_hero_section_image_idx"
      ON "_services_v_blocks_marketing_hero_section" USING btree ("image_id");
    ALTER TABLE "_services_v_blocks_marketing_hero_section"
      ADD CONSTRAINT "_services_v_blocks_marketing_hero_section_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- pages_blocks_marketing_hero_section
    ALTER TABLE "pages_blocks_marketing_hero_section"
      DROP CONSTRAINT IF EXISTS "pages_blocks_marketing_hero_section_image_id_media_id_fk";
    DROP INDEX IF EXISTS "pages_blocks_marketing_hero_section_image_idx";
    ALTER TABLE "pages_blocks_marketing_hero_section"
      RENAME COLUMN "image_id" TO "hero_image_id";
    CREATE INDEX "pages_blocks_marketing_hero_section_hero_image_idx"
      ON "pages_blocks_marketing_hero_section" USING btree ("hero_image_id");
    ALTER TABLE "pages_blocks_marketing_hero_section"
      ADD CONSTRAINT "pages_blocks_marketing_hero_section_hero_image_id_media_id_fk"
      FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    -- _pages_v_blocks_marketing_hero_section
    ALTER TABLE "_pages_v_blocks_marketing_hero_section"
      DROP CONSTRAINT IF EXISTS "_pages_v_blocks_marketing_hero_section_image_id_media_id_fk";
    DROP INDEX IF EXISTS "_pages_v_blocks_marketing_hero_section_image_idx";
    ALTER TABLE "_pages_v_blocks_marketing_hero_section"
      RENAME COLUMN "image_id" TO "hero_image_id";
    CREATE INDEX "_pages_v_blocks_marketing_hero_section_hero_image_idx"
      ON "_pages_v_blocks_marketing_hero_section" USING btree ("hero_image_id");
    ALTER TABLE "_pages_v_blocks_marketing_hero_section"
      ADD CONSTRAINT "_pages_v_blocks_marketing_hero_section_hero_image_id_media_id_fk"
      FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    -- services_blocks_marketing_hero_section
    ALTER TABLE "services_blocks_marketing_hero_section"
      DROP CONSTRAINT IF EXISTS "services_blocks_marketing_hero_section_image_id_media_id_fk";
    DROP INDEX IF EXISTS "services_blocks_marketing_hero_section_image_idx";
    ALTER TABLE "services_blocks_marketing_hero_section"
      RENAME COLUMN "image_id" TO "hero_image_id";
    CREATE INDEX "services_blocks_marketing_hero_section_hero_image_idx"
      ON "services_blocks_marketing_hero_section" USING btree ("hero_image_id");
    ALTER TABLE "services_blocks_marketing_hero_section"
      ADD CONSTRAINT "services_blocks_marketing_hero_section_hero_image_id_media_id_fk"
      FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    -- _services_v_blocks_marketing_hero_section
    ALTER TABLE "_services_v_blocks_marketing_hero_section"
      DROP CONSTRAINT IF EXISTS "_services_v_blocks_marketing_hero_section_image_id_media_id_fk";
    DROP INDEX IF EXISTS "_services_v_blocks_marketing_hero_section_image_idx";
    ALTER TABLE "_services_v_blocks_marketing_hero_section"
      RENAME COLUMN "image_id" TO "hero_image_id";
    CREATE INDEX "_services_v_blocks_marketing_hero_section_hero_image_idx"
      ON "_services_v_blocks_marketing_hero_section" USING btree ("hero_image_id");
    ALTER TABLE "_services_v_blocks_marketing_hero_section"
      ADD CONSTRAINT "_services_v_blocks_marketing_hero_section_hero_image_id_media_id_fk"
      FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  `)
}
