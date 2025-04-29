import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/index.css";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  const handleUserIconClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setMenuOpen(!menuOpen);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>ARCHVIZ</h2>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/cursos">Cursos</Link></li>
      </ul>

      <div className="navbar-user">
        <div className="user-icon" onClick={handleUserIconClick}>
          <img
            src={user?.user_metadata?.avatar_url || "/src/assets/icons/user-icon.png"}
            alt="Usuario"
            referrerPolicy="no-referrer"
          />
        </div>

        {user && menuOpen && (
          <div className="dropdown-menu">
            <Link to="/perfil" onClick={() => setMenuOpen(false)}>Perfil</Link>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
