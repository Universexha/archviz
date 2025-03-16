import { useState } from "react";

interface ListaDinamicaProps {
  titulo: string;
  items: string[];
  setItems: (items: string[]) => void;
  placeholder?: string;
}

const ListaDinamica: React.FC<ListaDinamicaProps> = ({ titulo, items, setItems, placeholder }) => {
  const [nuevoItem, setNuevoItem] = useState("");

  // Agregar nuevo ítem a la lista
  const handleAddItem = () => {
    if (nuevoItem.trim() !== "") {
      setItems([...items, nuevoItem.trim()]);
      setNuevoItem(""); // Limpiar input después de agregar
    }
  };

  // Eliminar ítem de la lista
  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{titulo}:</label>

      {/* Lista de ítems */}
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input 
              type="text" 
              value={item} 
              readOnly 
              className="border p-2 rounded flex-1"
            />
            <button 
              type="button" 
              onClick={() => handleRemoveItem(index)} 
              className="bg-red-500 text-white px-2 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Input para agregar nuevo ítem */}
      <div className="flex gap-2">
        <input
          type="text"
          value={nuevoItem}
          onChange={(e) => setNuevoItem(e.target.value)}
          placeholder={placeholder || "Añadir nuevo ítem"}
          className="border p-2 rounded flex-1"
        />
        <button 
          type="button" 
          onClick={handleAddItem} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ListaDinamica;
