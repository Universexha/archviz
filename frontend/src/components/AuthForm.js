import React, { useState } from 'react';
import './AuthForm.css'; // Estilos CSS

const AuthForm = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email enviado:', email);
        // Aquí puedes conectar con tu backend
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1>Inicia sesión o crea una cuenta</h1>
                <p>Se requiere iniciar sesión para acceder a nuestros servicios</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Ingrese su correo"
                        required
                    />
                    <button type="submit">Continuar con e-mail</button>
                </form>

                <div className="divider">o usar una de estas opciones</div>

                <div className="social-buttons">
                    <button className="google">Google</button>
                    <button className="apple">Apple</button>
                    <button className="facebook">Facebook</button>
                </div>

                <p className="terms">
                    Al iniciar sesión o al crear una cuenta, aceptas nuestros <a href="#">Términos y condiciones</a> y la <a href="#">Política de privacidad</a>.
                </p>

                <footer>
                    <p>© 2025 ARCHVIZ</p>
                </footer>
            </div>
        </div>
    );
};

export default AuthForm;
