import { useState } from "react";

interface Hostspot {
  x: number;
  y: number;
  target: number | null;
}

interface RecorridoVirtualProps {
  recorridoVirtual: File[];
  previewRecorrido: string[];
  hostspots: { [key: number]: Hostspot[] };
  setRecorridoVirtual: (recorridoVirtual: File[]) => void;
  setPreviewRecorrido: (previewRecorrido: string[]) => void;
  setHostspots: (hostspots: { [key: number]: Hostspot[] }) => void;
}

const RecorridoVirtual: React.FC<RecorridoVirtualProps> = ({
  recorridoVirtual,
  previewRecorrido,
  hostspots,
  setRecorridoVirtual,
  setPreviewRecorrido,
  setHostspots,
}) => {
  // Manejo de selección de archivos para el recorrido virtual
  const handleRecorridoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      setRecorridoVirtual([...recorridoVirtual, ...newFiles]);
      setPreviewRecorrido([...previewRecorrido, ...newPreviews]);
    }
  };

  // Eliminación de imágenes del recorrido virtual
  const removeRecorridoImage = (index: number) => {
    const updatedRecorrido = recorridoVirtual.filter((_, i) => i !== index);
    const updatedPreviews = previewRecorrido.filter((_, i) => i !== index);
    const updatedHostspots = { ...hostspots };
    delete updatedHostspots[index];

    setRecorridoVirtual(updatedRecorrido);
    setPreviewRecorrido(updatedPreviews);
    setHostspots(updatedHostspots);
  };

  // Agregar hostspot al hacer clic en la imagen
  const handleAddHostspot = (imageIndex: number, event: React.MouseEvent) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const updatedHostspots = { ...hostspots };

    if (!updatedHostspots[imageIndex]) {
      updatedHostspots[imageIndex] = [];
    }

    updatedHostspots[imageIndex].push({ x: offsetX, y: offsetY, target: null });
    setHostspots(updatedHostspots);
  };

  // Eliminar hostspot
  const handleRemoveHostspot = (imageIndex: number, hostspotIndex: number) => {
    const updatedHostspots = { ...hostspots };
    updatedHostspots[imageIndex] = updatedHostspots[imageIndex].filter((_, i) => i !== hostspotIndex);
    setHostspots(updatedHostspots);
  };

  // Mover hostspot arrastrándolo
  const handleDragStart = (e: React.DragEvent, imgIndex: number, spotIndex: number) => {
    e.dataTransfer.setData("hostspotIndex", spotIndex.toString());
    e.dataTransfer.setData("imageIndex", imgIndex.toString());
  };

  const handleDrop = (e: React.DragEvent, imgIndex: number, spotIndex: number) => {
    e.preventDefault();
    const newX = e.nativeEvent.offsetX;
    const newY = e.nativeEvent.offsetY;

    const movedHostspots = { ...hostspots };
    movedHostspots[imgIndex][spotIndex] = { ...movedHostspots[imgIndex][spotIndex], x: newX, y: newY };

    setHostspots(movedHostspots);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Input para subir imágenes */}
      <label className="font-semibold">Recorrido Virtual (Opcional):</label>
      <input
        type="file"
        accept=".jpg"
        multiple
        onChange={handleRecorridoChange}
        className="border p-2 rounded"
      />

      {/* Previsualización de Imágenes del Recorrido 3D */}
      <div className="flex flex-wrap gap-4 mt-2">
        {previewRecorrido.map((src, imgIndex) => (
          <div key={imgIndex} className="relative border rounded p-2">
            <img
              src={src}
              alt={`Recorrido ${imgIndex}`}
              className="w-40 h-40 object-cover cursor-pointer"
              onClick={(e) => handleAddHostspot(imgIndex, e)}
            />
            <button
              type="button"
              onClick={() => removeRecorridoImage(imgIndex)}
              className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded"
            >
              X
            </button>

            {/* Muestra los hostspots en la imagen */}
            {hostspots[imgIndex] &&
              hostspots[imgIndex].map((spot, spotIndex) => (
                <div
                  key={spotIndex}
                  className="absolute w-4 h-4 bg-red-500 rounded-full flex justify-center items-center cursor-pointer"
                  style={{ left: spot.x, top: spot.y }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, imgIndex, spotIndex)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, imgIndex, spotIndex)}
                >
                  <button
                    className="text-white text-xs bg-black rounded px-1"
                    onClick={() => handleRemoveHostspot(imgIndex, spotIndex)}
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Barra de navegación para múltiples imágenes */}
      <div className="overflow-x-auto flex gap-4 p-2 border rounded" style={{ maxWidth: "100%", whiteSpace: "nowrap" }}>
        {previewRecorrido.map((src, imgIndex) => (
          <div key={imgIndex} className="relative border rounded p-2 inline-block">
            <img
              src={src}
              alt={`Recorrido ${imgIndex}`}
              className="w-40 h-40 object-cover cursor-pointer"
              onClick={(e) => handleAddHostspot(imgIndex, e)}
            />
            <button
              type="button"
              onClick={() => removeRecorridoImage(imgIndex)}
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

export default RecorridoVirtual;
