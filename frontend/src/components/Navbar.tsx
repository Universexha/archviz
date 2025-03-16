import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">ARCHVIZ</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/proyectos" className="hover:underline">Proyectos</Link>
        <Link to="/admin" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
          Panel de Control
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
