interface CategoriaProyectoProps {
    categoria: string;
    otraCategoria: string;
    setCategoria: (categoria: string) => void;
    setOtraCategoria: (otraCategoria: string) => void;
  }
  
  const CategoriaProyecto: React.FC<CategoriaProyectoProps> = ({ categoria, otraCategoria, setCategoria, setOtraCategoria }) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Categoría:</label>
        <select 
          name="categoria" 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)} 
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccionar...</option>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial</option>
          <option value="urbanismo">Urbanismo</option>
          <option value="otro">Otro (Especificar)</option>
        </select>
  
        {categoria === "otro" && (
          <input 
            type="text" 
            name="otraCategoria" 
            value={otraCategoria} 
            onChange={(e) => setOtraCategoria(e.target.value)} 
            className="border p-2 rounded" 
            placeholder="Especificar categoría"
          />
        )}
      </div>
    );
  };
  
  export default CategoriaProyecto;
  