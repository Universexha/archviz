import { useState } from "react";

// Definir interfaz para las props
interface GaleriaImagenesProps {
  galeria: File[];
  previewGaleria: string[];
  setGaleria: (galeria: File[]) => void;
  setPreviewGaleria: (previewGaleria: string[]) => void;
}

const GaleriaImagenes: React.FC<GaleriaImagenesProps> = ({ galeria, previewGaleria, setGaleria, setPreviewGaleria }) => {
  
  // Manejo de selección de archivos para la galería
  const handleGaleriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: File[] = Array.from(e.target.files);

      // Filtrar archivos duplicados
      const filteredFiles = newFiles.filter(
        (file) => !galeria.some((existingFile) => existingFile.name === file.name)
      );

      // Crear URLs de previsualización seguras
      const newPreviews = filteredFiles.map((file) => URL.createObjectURL(file));

      setGaleria([...galeria, ...filteredFiles]);
      setPreviewGaleria([...previewGaleria, ...newPreviews]);
    }
  };

  // Eliminar imagen de la galería
  const removeGaleriaImage = (index: number) => {
    // Revocar URL para liberar memoria
    URL.revokeObjectURL(previewGaleria[index]);

    const updatedGaleria = galeria.filter((_, i) => i !== index);
    const updatedPreviews = previewGaleria.filter((_, i) => i !== index);

    setGaleria(updatedGaleria);
    setPreviewGaleria(updatedPreviews);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Input para subir imágenes */}
      <label className="font-semibold">Galería de Imágenes (Opcional):</label>
      <input
        type="file"
        accept=".jpg, .png, .jpeg, .gif, .webp"
        multiple
        onChange={handleGaleriaChange}
        className="border p-2 rounded"
      />

      {/* Previsualización de imágenes */}
      <div className="flex flex-wrap gap-2 mt-2">
        {previewGaleria.map((src, index) => (
          <div key={index} className="relative">
            <img src={src} alt="Galería" className="w-20 h-20 object-cover rounded" />
            <button
              type="button"
              onClick={() => removeGaleriaImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaleriaImagenes;
