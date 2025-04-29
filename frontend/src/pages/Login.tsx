import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: contraseña,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/"); // o redirigir a otra página principal si deseas
    }
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/",
      },
    });
    if (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
    }
  };

  const loginWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:5173/",
      },
    });
    if (error) {
      console.error("Error al iniciar sesión con GitHub:", error.message);
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>o</p>

      <button
        type="button"
        onClick={loginWithGoogle}
        style={{
          backgroundColor: "#4285F4",
          color: "white",
          padding: "0.5rem",
          borderRadius: "5px",
          border: "none",
          width: "100%",
        }}
      >
        Iniciar sesión con Google
      </button>

      <button
        type="button"
        onClick={loginWithGitHub}
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "0.5rem",
          borderRadius: "5px",
          border: "none",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        Iniciar sesión con GitHub
      </button>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <a href="/forgot-password" style={{ fontSize: "0.9rem" }}>
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.9rem" }}>
          ¿No tienes una cuenta?{" "}
          <a href="/register" style={{ color: "#4285F4", fontWeight: "bold" }}>
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
