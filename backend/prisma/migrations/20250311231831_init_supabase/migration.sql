-- CreateTable
CREATE TABLE "Proyecto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcionCorta" TEXT NOT NULL,
    "descripcionCompleta" TEXT NOT NULL,
    "imagenPrincipal" TEXT NOT NULL,
    "galeria" TEXT[],
    "categoria" TEXT NOT NULL,
    "otraCategoria" TEXT,
    "areaProyecto" INTEGER NOT NULL,
    "materiales" TEXT[],
    "colaboradores" TEXT[],
    "estado" TEXT NOT NULL,
    "recorridoVirtual" TEXT[],
    "hostspots" JSONB NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id")
);
