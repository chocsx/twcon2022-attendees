/*
  Warnings:

  - Made the column `avatar` on table `Streamer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Streamer" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "avatar" SET NOT NULL;
DROP SEQUENCE "Streamer_id_seq";
