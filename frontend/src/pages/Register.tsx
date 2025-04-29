import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

declare global {
  interface Window {
    grecaptcha: {
      render: (containerId: string, parameters: any) => void;
      getResponse: () => string;
      reset: () => void;
    };
  }
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    contraseña: "",
    confirmarContraseña: "",
    recaptchaToken: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!formData.apellido.trim()) nuevosErrores.apellido = "El apellido es obligatorio.";
    if (!formData.correo.includes("@")) nuevosErrores.correo = "Correo inválido.";
    if (!/^\d{9}$/.test(formData.telefono)) nuevosErrores.telefono = "Teléfono inválido (9 dígitos).";
    if (formData.contraseña.length < 6) nuevosErrores.contraseña = "La contraseña debe tener al menos 6 caracteres.";
    if (formData.contraseña !== formData.confirmarContraseña) nuevosErrores.confirmarContraseña = "Las contraseñas no coinciden.";
    if (!formData.recaptchaToken) nuevosErrores.recaptcha = "Completa el captcha.";

    return nuevosErrores;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores = validarFormulario();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: formData.correo,
        password: formData.contraseña,
      });

      if (error) throw error;

      if (data.user) {
        const { error: insertError } = await supabase
          .from("usuarios")
          .insert([
            {
              id: data.user.id,
              nombre: formData.nombre,
              apellido: formData.apellido,
              correo: formData.correo,
              telefono: formData.telefono,
            },
          ]);

        if (insertError) throw insertError;

        setSuccessMessage("¡Registro exitoso! Verifica tu correo para activar tu cuenta.");
        setFormData({
          nombre: "",
          apellido: "",
          correo: "",
          telefono: "",
          contraseña: "",
          confirmarContraseña: "",
          recaptchaToken: "",
        });
      }
    } catch (error: any) {
      console.error("Error registrando:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRecaptchaChange = (token: string | null) => {
    setFormData(prev => ({ ...prev, recaptchaToken: token || "" }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && typeof window.grecaptcha !== "undefined") {
        window.grecaptcha.render("recaptcha-container", {
          sitekey: "6LeR7SUrAAAAANRjCMuWP-xHuckuKUe6TKHeae_G",
          callback: (token: string) => {
            onRecaptchaChange(token);
          },
        });
      }
    }, 500);
  
    return () => clearTimeout(timer);
  }, []);  

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/", // Al terminar vuelve aquí
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
        redirectTo: "http://localhost:5173/", // Al terminar vuelve aquí
      },
    });

    if (error) {
      console.error("Error al iniciar sesión con GitHub:", error.message);
    }
  };

  return (
    <div className="register-container" style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Registro de Cuenta</h1>

      <form onSubmit={handleSubmit} className="formulario">
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
        {errors.nombre && <p className="error">{errors.nombre}</p>}

        <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
        {errors.apellido && <p className="error">{errors.apellido}</p>}

        <input type="email" name="correo" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} />
        {errors.correo && <p className="error">{errors.correo}</p>}

        <input type="text" name="telefono" placeholder="Número de teléfono" value={formData.telefono} onChange={handleChange} />
        {errors.telefono && <p className="error">{errors.telefono}</p>}

        <input type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} />
        {errors.contraseña && <p className="error">{errors.contraseña}</p>}

        <input type="password" name="confirmarContraseña" placeholder="Confirmar contraseña" value={formData.confirmarContraseña} onChange={handleChange} />
        {errors.confirmarContraseña && <p className="error">{errors.confirmarContraseña}</p>}

        {/* reCAPTCHA */}
        <div id="recaptcha-container" style={{ margin: "1rem 0" }}></div>
        {errors.recaptcha && <p className="error">{errors.recaptcha}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "1rem",
            padding: "0.7rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {loading ? "Registrando..." : "Registrarme"}
        </button>

        <p style={{ textAlign: "center", margin: "1rem 0" }}>o</p>

        <button
          type="button"
          disabled={loading}
          onClick={loginWithGoogle}
          style={{
            backgroundColor: "#4285F4",
            color: "white",
            padding: "0.7rem",
            borderRadius: "5px",
            border: "none",
            width: "100%",
          }}
        >
          Registrarme con Google
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={loginWithGitHub}
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "0.7rem",
            borderRadius: "5px",
            border: "none",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          Registrarme con GitHub
        </button>

        {successMessage && (
          <p className="success" style={{ color: "green", textAlign: "center", marginTop: "1rem" }}>
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
