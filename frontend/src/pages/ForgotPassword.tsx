import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Verificar si el usuario existe correctamente
      const { data: userList, error: fetchError } = await supabase
        .from("usuarios")
        .select("correo");

      if (fetchError) {
        setError("Error al verificar el correo.");
        setLoading(false);
        return;
      }

      const correoExiste = userList?.some(
        (user) => user.correo.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (!correoExiste) {
        setError("Este correo no está registrado.");
        setLoading(false);
        return;
      }

      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

      const { error: insertError } = await supabase
        .from("password_reset_codes")
        .insert([{ email, code: resetCode }]);

      if (insertError) {
        console.error(insertError);
        setError("No se pudo enviar el código. Intenta de nuevo.");
        return;
      }

      localStorage.setItem("recovery_email", email);
      if (import.meta.env.VITE_ENV === "development") {
        localStorage.setItem("ultimo_codigo", resetCode);
      }

      navigate("/verify-code");

    } catch (err: any) {
      console.error(err.message);
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>¿Olvidaste tu contraseña?</h2>
      <form onSubmit={handleSendCode}>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }} disabled={loading}>
          {loading ? "Enviando..." : "Enviar Código"}
        </button>
      </form>

      {error && (
        <p style={{ marginTop: "20px", color: "red" }}>{error}</p>
      )}
    </div>
  );
};

export default ForgotPassword;
