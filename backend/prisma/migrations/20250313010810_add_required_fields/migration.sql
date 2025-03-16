/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Proyecto` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Proyecto" ALTER COLUMN "imagenPrincipal" DROP NOT NULL,
ALTER COLUMN "galeria" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "materiales" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "colaboradores" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "recorridoVirtual" SET DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Proyecto_nombre_key" ON "Proyecto"("nombre");
