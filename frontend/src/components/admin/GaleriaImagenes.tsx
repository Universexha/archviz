import { useState } from "react";

const GaleriaImagenes: React.FC = () => {
  const [galeria, setGaleria] = useState<File[]>([]);
  const [previewGaleria, setPreviewGaleria] = useState<string[]>([]);

  // Manejo de selección de archivos para la galería
  const handleGaleriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));

      setGaleria([...galeria, ...newFiles]);
      setPreviewGaleria([...previewGaleria, ...newPreviews]);
    }
  };

  // Eliminar imagen de la galería
  const removeGaleriaImage = (index: number) => {
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
        accept=".jpg"
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
