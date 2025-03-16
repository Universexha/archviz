import React from "react";

interface FormularioGeneralProps {
  tipo: string;
  formData: {
    nombre: string;
    descripcionCorta: string;
    descripcionCompleta: string;
    imagenPrincipal: File | null;
    previewImagenPrincipal: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const FormularioGeneral: React.FC<FormularioGeneralProps> = ({ tipo, formData, setFormData }) => {
  // Manejo de cambios en inputs de texto y textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejo de imagen principal
  const handleImagenPrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, imagenPrincipal: file, previewImagenPrincipal: previewUrl });
    }
  };

  // Eliminar imagen principal
  const removeImagenPrincipal = () => {
    setFormData({ ...formData, imagenPrincipal: null, previewImagenPrincipal: "" });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Nombre */}
      <label className="font-semibold">Nombre del {tipo}:</label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      {/* Descripción corta */}
      <label className="font-semibold">Descripción corta (máx. 500 palabras):</label>
      <textarea
        name="descripcionCorta"
        value={formData.descripcionCorta}
        onChange={handleChange}
        className="border p-2 rounded"
        required
        maxLength={500}
      ></textarea>

      {/* Descripción completa */}
      <label className="font-semibold">Descripción completa:</label>
      <textarea
        name="descripcionCompleta"
        value={formData.descripcionCompleta}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      ></textarea>

      {/* Imagen principal */}
      <label className="font-semibold">Imagen Principal:</label>
      <input
        type="file"
        accept=".jpg"
        onChange={handleImagenPrincipalChange}
        className="border p-2 rounded"
        required
      />

      {/* Previsualización de imagen principal */}
      {formData.previewImagenPrincipal && (
        <div className="relative mt-2">
          <img
            src={formData.previewImagenPrincipal}
            alt="Imagen Principal"
            className="w-40 h-40 object-cover rounded"
          />
          <button
            type="button"
            onClick={removeImagenPrincipal}
            className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default FormularioGeneral;
