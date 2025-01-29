import React, { useState, useEffect } from "react";
import "./LoginRegister.css";

function LoginRegister() {
  const [step, setStep] = useState("login"); // 'login' o 'verify'
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(60);

  // Función para manejar el cambio del email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Enviar código al correo
  const handleSendCode = () => {
    // Simulación del envío de código al correo
    console.log("Código enviado al correo:", email);
    setStep("verify");
    setTimer(60); // Reiniciar el contador
  };

  // Manejo del contador
  useEffect(() => {
    if (step === "verify" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  // Manejo del código de verificación
  const handleCodeChange = (index, value) => {
    let newCode = verificationCode.split("");
    newCode[index] = value;
    setVerificationCode(newCode.join(""));
  };

  const handleVerifyCode = () => {
    // Simulación de verificación del código
    console.log("Código ingresado:", verificationCode);
    if (verificationCode === "123456") {
      alert("Código verificado exitosamente");
      // Aquí puedes redirigir al usuario a otra página
    } else {
      alert("Código incorrecto");
    }
  };

  const handleRequestNewCode = () => {
    console.log("Nuevo código solicitado");
    setTimer(60); // Reiniciar el contador
  };

  return (
    <div className="login-register">
      {step === "login" ? (
        <div className="login-container">
          <h2>Inicia sesión</h2>
          <p>Se requiere iniciar sesión para acceder a nuestros servicios</p>
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={handleEmailChange}
          />
          <button onClick={handleSendCode}>Continuar con e-mail</button>
        </div>
      ) : (
        <div className="verify-container">
          <h2>Verifica tu dirección de e-mail</h2>
          <p>
            Hemos enviado un código de verificación a <strong>{email}</strong>.
            Escribe ese código para continuar.
          </p>
          <div className="code-inputs">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="code-input"
                value={verificationCode[index] || ""}
                onChange={(e) => handleCodeChange(index, e.target.value)}
              />
            ))}
          </div>
          <button onClick={handleVerifyCode}>Verificar e-mail</button>
          {timer > 0 ? (
            <p>
              ¿No has recibido el email? Comprueba tu carpeta de correo no
              deseado o pide otro código dentro de {timer} segundos.
            </p>
          ) : (
            <button onClick={handleRequestNewCode}>Pedir otro código</button>
          )}
        </div>
      )}
    </div>
  );
}

export default LoginRegister;
