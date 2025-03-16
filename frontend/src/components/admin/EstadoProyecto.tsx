interface EstadoProyectoProps {
    estado: string;
    setEstado: (estado: string) => void;
  }
  
  const EstadoProyecto: React.FC<EstadoProyectoProps> = ({ estado, setEstado }) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Estado del proyecto:</label>
        <select 
          name="estado" 
          value={estado} 
          onChange={(e) => setEstado(e.target.value)} 
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Seleccionar...</option>
          <option value="concepto">Concepto</option>
          <option value="en-construccion">En Construcción</option>
          <option value="finalizado">Finalizado</option>
        </select>
      </div>
    );
  };
  
  export default EstadoProyecto;
  