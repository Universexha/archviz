import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold">V</div>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-gray-400">Inicio</Link></li>
        <li><Link to="/proyectos" className="hover:text-gray-400">Proyectos</Link></li>
        <li><Link to="/recorrido" className="hover:text-gray-400">Recorrido 3D</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

  