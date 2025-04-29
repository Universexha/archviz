import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const VerifyCode: React.FC = () => {
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const email = localStorage.getItem("recovery_email");
    if (!email) {
      setError("No se encontró un correo para validar el código.");
      return;
    }

    const { data, error } = await supabase
      .from("password_reset_codes")
      .select("*")
      .eq("email", email)
      .eq("code", codeInput)
      .single();

    if (error || !data) {
      setError("Código incorrecto o expirado.");
      return;
    }

    localStorage.setItem("verified_email", email);
    navigate("/update-password");
  };

  const codigoReciente = localStorage.getItem("ultimo_codigo");

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Verifica tu código</h2>

      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Ingresa el código"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Verificar Código
        </button>
      </form>

      {import.meta.env.VITE_ENV === "development" && codigoReciente && (
        <p style={{ marginTop: "20px", color: "green", fontSize: "14px" }}>
          ⚠️ Código más reciente: <strong>{codigoReciente}</strong>
        </p>
      )}

      {error && (
        <p style={{ marginTop: "20px", color: "red" }}>{error}</p>
      )}
    </div>
  );
};

export default VerifyCode;
